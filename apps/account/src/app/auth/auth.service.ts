import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@testify/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterDto } from './auth.controller';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
        ) {}

    async register({ email, password, displayName }: RegisterDto) {
        const oldUser = await this.userRepository.findUser(email);
        if(oldUser) {
            throw new Error("User aready exists");
        }
        const newUserEntity = await new UserEntity({
            displayName,
            email,
            passwordHash: '',
            role: UserRole.User
        }).setPassword(password);
        const newUser = await this.userRepository.createUser(newUserEntity);

        return { email: newUser.email };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findUser(email);
        if (!user) {
            throw new Error("Incorrect login or password!");
        }
        const userEntity = new UserEntity(user);
        const isCorrectPassword = await userEntity.validatePassword(password);
        if (!isCorrectPassword) {
            throw new Error("Incorrect login or password!");
        }

        return { id: user._id }
    }

    async login(id: string) {
        return {
            access_token: await this.jwtService.signAsync({ id })
        }
    }
}
