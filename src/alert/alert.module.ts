import { Module } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertService } from './alert.service';

@Module({
  providers: [AlertService, PrismaService, MessageService],
})
export class AlertModule {}
