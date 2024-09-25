import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../bd/prisma.service';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    // Método parar criar novo usuário
    async createUser(CreateUserDto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: CreateUserDto,
        })
    }
}
