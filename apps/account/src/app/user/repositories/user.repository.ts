import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from "../entities/user.entity";
import { User } from "../models/user.models";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async createUser(user: UserEntity) {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findUser(value: string, field = 'email') {
        return this.userModel.findOne({ [field]: value }).exec();
    }

    async deleteUser(email: string) {
        this.userModel.deleteOne({ email }).exec();
    }
}