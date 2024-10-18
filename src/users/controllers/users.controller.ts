import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    //Endpoint parar criar um novo usuário
    @Post()
    async create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(CreateUserDto)
    }


}
