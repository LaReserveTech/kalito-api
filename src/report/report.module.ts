import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportController } from './report.controller';

@Module({
  providers: [PrismaService],
  controllers: [ReportController],
})
export class ReportModule {}
