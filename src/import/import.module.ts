import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';

@Module({
  providers: [ImportService, PrismaService],
  controllers: [ImportController],
})
export class ImportModule {}
