import { Module } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  providers: [TaskService, UserService, PrismaService, MessageService],
  controllers: [TaskController],
})
export class TaskModule {}
