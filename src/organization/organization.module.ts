import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationProviders } from './organization.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, ...OrganizationProviders],
  exports: [OrganizationService]
})
export class OrganizationModule {}
