import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from './message.service';

@Module({
  providers: [MessageService, PrismaService],
})
export class MessageModule {}
