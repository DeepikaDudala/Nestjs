import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }
}
