import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name)private UserModel:Model<User>){}
    async createUser(createUserDto:CreateUserDto){
        return await this.UserModel.create(createUserDto)
    }

}
