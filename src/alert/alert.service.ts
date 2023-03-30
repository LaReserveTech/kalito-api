import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(
    private prisma: PrismaService,
    private messageService: MessageService,
  ) {}

  async findElligibleAlertUsers() {
    // const users = await this.prisma.user.findMany({
    //   where: { commune: report.commune },
    //   distinct: 'phone',
    // });
    // return users;
  }

  async sendAlert() {
    // const users = [];
    // users.forEach((user) => {
    //   this.messageService.sendMessage(user, report);
    // });
    // this.prisma.report.update({
    //   where: { id: report.id },
    //   data: { isSent: true },
    // });
    // console.log(this);
  }

  async sendNewAlerts() {
    // const reports = await this.prisma.report.findMany({
    //   where: { isSent: false },
    // });
    // reports.forEach(this.sendAlert);
  }
}
