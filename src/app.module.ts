import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://deepikadudala:4DSggtYb6URdjESh@cluster0.jlfekxd.mongodb.net/nest-mongodb?retryWrites=true&w=majority",
    ),
    UsersModule,
  ],
})
export class AppModule {}
