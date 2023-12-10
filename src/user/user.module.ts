import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule, 
    JwtModule.register({}), 
    ConfigModule,
    MulterModule.register({
      dest: 'src/uploads/images'
    })
  ],
  providers: [UserService, ...UsersProviders],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
