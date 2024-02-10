import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(10)
    password:string
}