import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  name?: string;

  password?: string;
}
