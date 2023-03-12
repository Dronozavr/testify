import { Injectable } from '@nestjs/common';
import { UserRole } from '@testify/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        ) {}

    async getUser(id: string) {
        const user = await this.userRepository.findUser(id, '_id');
        if (!user) {
            throw new Error("Incorrect id!");
        }
        const userEntity = new UserEntity(user);

        return new UserResponseDto(userEntity);
    }
}

export class UserResponseDto {
    constructor(userEntity: UserEntity) {
        this.id = userEntity._id,
        this.name = userEntity.displayName,
        this.mail = userEntity.email,
        this.role = userEntity.role
    }

    public id: string;
    public name: string;
    public mail: string;
    public role: UserRole
}
