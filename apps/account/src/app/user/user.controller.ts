import { Controller, Get, Param } from '@nestjs/common';
import { UserResponseDto, UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get(':id')
    async register(@Param() params): Promise<UserResponseDto> {
        return this.userService.getUser(params.id);
    }
}




