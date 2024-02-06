import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings {
  @Prop()
  receiveNotifications?: Boolean;
  @Prop()
  receiveEmails?: Boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
