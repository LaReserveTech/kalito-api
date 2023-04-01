import { Injectable } from '@nestjs/common';
import { Message, Prisma, Report, User } from '@prisma/client';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageService: MessageService,
  ) {}

  async findElligibleAlertUsers(report: Report) {
    const rawUsers = await this.prisma.$queryRaw<(User & Message)[]>(
      Prisma.sql`
          SELECT
          *
        FROM (
          SELECT
            "User".*, "Message"."state",
            row_number() OVER (PARTITION BY phone) AS row_number
          FROM
            "User"
          LEFT JOIN "Message" ON "Message"."userId" = "User".id 
        WHERE
          "communeId" = ${report.communeId}) AS ROWS
        WHERE
          row_number = 1;
    `,
    );

    const users = rawUsers?.filter(
      (rawUser) =>
        (rawUser.state === null && report.state === 'bad') ||
        (rawUser.state === 'bad' && report.state === 'good') ||
        (rawUser.state === 'good' && report.state === 'bad'),
    );

    return users;
  }

  async sendAlert(report: Report) {
    const users = await this.findElligibleAlertUsers(report);

    users?.forEach((user) => {
      this.messageService.sendMessage(user, report.state);
    });

    await this.prisma.report.update({
      where: { id: report.id },
      data: { isSent: true },
    });
  }

  async sendNewAlerts() {
    const reports = await this.prisma.report.findMany({
      where: { isSent: false, communeId: 163420 },
      distinct: 'communeId',
    });

    reports.forEach((report) => {
      this.sendAlert(report);
    });
  }
}
