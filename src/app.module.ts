import { Module } from '@nestjs/common';
import { UsersController } from './users/controllers/users.controller';
import { PrismaService } from './bd/prisma.service';
import { UserService } from './users/services/user.service';
import { AuthLoginController } from './auth-login/controllers/auth-login.controller';
import { AuthLoginService } from './auth-login/services/auth-login.service';
import { AuthModule } from './auth-login/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
