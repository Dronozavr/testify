import { Body, Controller } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@testify/contracts';
import { RMQRoute } from 'nestjs-rmq';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @RMQRoute(AccountRegister.topic)
    async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
        return this.authService.register(dto);
    }

    @RMQRoute(AccountLogin.topic)
    async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
       const { id } = await this.authService.validateUser(email, password);
       return this.authService.login(id);
    }
}


