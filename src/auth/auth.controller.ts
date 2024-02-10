import { BadRequestException, Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    constructor(private authService:AuthService,private readonly usersService:UsersService){}

    @Post('signUp')
    async signUp(@Body() creteUserDro:CreateUserDto):Promise<User>{
       return await this.authService.signUp(creteUserDro)
    }

    @Post('login')
    async login(@Body() loginUserDto:LoginUserDto){
        return await this.authService.login(loginUserDto)
    }
}
