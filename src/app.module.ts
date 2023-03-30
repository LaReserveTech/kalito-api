import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UserModule, ScheduleModule.forRoot(), TaskModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
