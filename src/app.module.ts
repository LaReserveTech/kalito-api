import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertModule } from './alert/alert.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportModule } from './import/import.module';
import { ImportService } from './import/import.service';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma/prisma.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    TaskModule,
    MessageModule,
    AlertModule,
    ImportModule,
    ReportModule,
  ],
  controllers: [AppController, ReportController],
  providers: [AppService, ImportService, PrismaService],
})
export class AppModule {}
