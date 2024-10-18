import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Lógica da implementação de autenticação
@Injectable()
export class AuthLoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async validateUser(email: string, senha: string): Promise<any>{
        const user = await this.userService.findByEmail(email);

        if(user && await bcrypt.compare(senha, user.senha)){
            const { senha, ...result } = user;
            return result
        }
        return null;
    }

    async login(loginDto: LoginDto){
        const user = await this.validateUser(loginDto.email, loginDto.senha);

        if(!user){
            throw new UnauthorizedException('Credenciais Inválidas')
        }

        const payload = { username: user.email, sub: user.id};
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
