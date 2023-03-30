import { Controller, Post } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importServices: ImportService) {}

  @Post()
  async import() {
    await this.importServices.importCSV();
  }
}
