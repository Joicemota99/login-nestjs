import { Module } from '@nestjs/common';
import { UsersController } from './users/controllers/users.controller';
import { PrismaService } from './bd/prisma.service';
import { UserService } from './users/services/user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
