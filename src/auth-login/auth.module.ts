import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthLoginController } from './controllers/auth-login.controller';
import { AuthLoginService } from './services/auth-login.service';
import { jwtConstants } from './constants';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            global:true,
            secret:jwtConstants.secret,
            signOptions:{expiresIn: '1h'}
        })
    ],
    controllers: [AuthLoginController],
    providers: [AuthLoginService],
    exports: [AuthLoginService]
})
export class AuthModule {}
