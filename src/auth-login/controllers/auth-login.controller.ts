import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { AuthLoginService } from '../services/auth-login.service';
import { LoginDto } from '../dto/login.dto';

// Expõe as endpoints da autenticação
@Controller('auth-login')
export class AuthLoginController {
    constructor(private readonly authService: AuthLoginService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}
