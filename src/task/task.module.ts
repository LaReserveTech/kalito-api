import { Module } from '@nestjs/common';
import { AlertService } from 'src/alert/alert.service';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  providers: [TaskService, PrismaService, AlertService, MessageService],
  controllers: [TaskController],
})
export class TaskModule {}
