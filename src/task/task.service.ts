import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AlertService } from 'src/alert/alert.service';

@Injectable()
export class TaskService {
  constructor(private alertService: AlertService) {}

  @Cron('* * * * *')
  handleCron() {
    this.sendPhoneMessages();
  }

  async sendPhoneMessages() {
    await this.alertService.sendNewAlerts();
  }
}
