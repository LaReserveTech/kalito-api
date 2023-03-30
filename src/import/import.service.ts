import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as fs from 'fs';
import { chunk, uniq } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async importCSV() {
    const communes = fs.readFileSync(`${__dirname}/../../data/communes.csv`);

    const prelevements = fs.readFileSync(
      `${__dirname}/../../data/prelevements.csv`,
    );

    const communeRecords = parse(communes, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    });

    const prelevementRecords = parse(prelevements, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    });

    const cdreseaux: string[] = uniq(
      [...communeRecords, ...prelevementRecords].map((data) => data.cdreseau),
    );

    const reseaux = await this.prisma.$transaction(
      cdreseaux.map((cdreseau) =>
        this.prisma.reseau.create({ data: { cdreseau } }),
      ),
    );

    const communesData = chunk(communeRecords, 100).map(
      (chunkedCommunesRecord) => {
        return chunkedCommunesRecord.map(({ cdreseau, ...commune }) => ({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          reseauId: reseaux.find((r) => r.cdreseau === cdreseau)!.id,
          ...commune,
        }));
      },
    );

    const prelevementsData = chunk(prelevementRecords, 100).map(
      (chunkedPrelevementRecords) => {
        return chunkedPrelevementRecords.map(
          ({ cdreseau, heureprel, ...prelevement }) => {
            const date = dayjs
              .tz('2022-07-11', 'YYYY-MM-DD', 'Europe/Paris')
              .startOf('day')
              .add(parseInt(heureprel.split('h')[0] || '0', 10), 'hours')
              .add(parseInt(heureprel.split('h')[1] || '0', 10), 'minutes')
              .toDate();

            return {
              ...prelevement,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              reseauId: reseaux.find((r) => r.cdreseau === cdreseau)!.id,
              dateprel: date,
            };
          },
        );
      },
    );

    for (const communeData of communesData) {
      await this.prisma.commune.createMany({ data: communeData });
    }

    for (const prelevementData of prelevementsData) {
      await this.prisma.prelevement.createMany({ data: prelevementData });
    }
  }
}
