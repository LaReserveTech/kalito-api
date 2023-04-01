import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertService } from './alert.service';
import { MessageService } from 'src/message/message.service';

@Module({
  providers: [AlertService, PrismaService, MessageService],
})
export class AlertModule {}
