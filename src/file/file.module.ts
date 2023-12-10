import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileProviders } from './file.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [FileService, ...FileProviders],
  exports: [FileService]
})
export class FileModule {}
