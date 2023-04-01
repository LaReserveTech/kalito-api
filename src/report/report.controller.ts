import { Controller, Post } from '@nestjs/common';
import { State } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('report')
export class ReportController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('/reports')
  async generateReports() {
    const goodPrelevements = await this.prisma.prelevement.findMany({
      where: {
        AND: [
          {
            conclusionprel: {
              not: {
                contains: 'enceinte',
              },
              mode: 'insensitive',
            },
          },
          {
            conclusionprel: {
              not: {
                contains: 'nourrisson',
              },
              mode: 'insensitive',
            },
          },
          {
            conclusionprel: {
              not: {
                contains: 'non potable',
              },
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        reseau: {
          select: {
            commune: true,
          },
        },
      },
    });

    const badPrelevements = await this.prisma.prelevement.findMany({
      where: {
        OR: [
          {
            conclusionprel: {
              contains: 'enceinte',
              mode: 'insensitive',
            },
          },
          {
            conclusionprel: {
              contains: 'nourrisson',
              mode: 'insensitive',
            },
          },
          {
            conclusionprel: {
              contains: 'non potable',
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        reseau: {
          select: {
            commune: true,
          },
        },
      },
    });

    const goodReports = goodPrelevements.map((prelevement) => ({
      prelevementId: prelevement.id,
      communeId: prelevement?.reseau?.commune?.[0]?.id,
      state: State.good,
      isSent: false,
    }));

    await this.prisma.report.createMany({ data: goodReports });

    const badReports = badPrelevements.map((prelevement) => ({
      prelevementId: prelevement.id,
      communeId: prelevement?.reseau?.commune?.[0]?.id,
      state: State.bad,
      isSent: false,
    }));

    await this.prisma.report.createMany({ data: badReports });
  }
}
