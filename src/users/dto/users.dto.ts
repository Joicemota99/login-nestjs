import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    nome : string;

    @IsNumber()
    @IsNotEmpty()
    telefone: number;

    @IsStrongPassword()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    cargo:string;
}