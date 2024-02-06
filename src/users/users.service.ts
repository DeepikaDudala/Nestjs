import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./Schemas/User.schema";
import mongoose, { Model, Mongoose, mongo } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSettings } from "./Schemas/UserSettings.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserSettings.name)
    private UserSettingsModel: Model<UserSettings>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.UserModel.find();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email });
  }

  async getUserById(id: string) {
    this.checkValidId(id);
    const user = await this.UserModel.findById(id).populate("settings");
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async createUser({
    settings,
    ...cretaUserDto
  }: CreateUserDto): Promise<User> {
    if (await this.getUserByEmail(cretaUserDto.email))
      throw new BadRequestException(`User Already exists`);
    if (settings) {
      const newSettings = await this.UserSettingsModel.create(settings);
      const newUser = await this.UserModel.create({
        ...cretaUserDto,
        settings: newSettings._id,
      });
      return newUser;
    }
    const newUser = await this.UserModel.create(cretaUserDto);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    this.checkValidId(id);
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );
    if (!updatedUser) throw new NotFoundException(`User not found`);
    return updatedUser;
  }

  async deleteUser(id: string) {
    this.checkValidId(id);
    return await this.UserModel.findByIdAndDelete(id);
  }

  checkValidId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Invalid Id`);
  }
}
