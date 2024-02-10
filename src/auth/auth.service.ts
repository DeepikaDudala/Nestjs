import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async checkUser(email: string): Promise<User> {
    return await this.UserModel.findOne({ email });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.checkUser(loginUserDto.email);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (loginUserDto.password !== user.password) {
      throw new BadRequestException(`Wrong password`);
    }
    const { password, ...details } = user;
    return this.jwtService.sign(details);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (await this.checkUser(createUserDto.email)) {
      throw new BadRequestException(`User Alredy Exists`);
    }
    return this.UserModel.create(createUserDto);
  }
}
