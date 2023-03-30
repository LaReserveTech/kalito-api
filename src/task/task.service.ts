import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  @Cron('* * * * *')
  handleCron() {
    this.sendPhoneMessages();
  }

  async sendPhoneMessages() {
    try {
      const users = await this.userService.users({ distinct: 'phone' });

      users?.forEach((user) => this.messageService.sendMessage(user.phone));
    } catch {}
  }
}
