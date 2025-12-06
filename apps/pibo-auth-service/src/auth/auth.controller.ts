import { Controller, Request, Post, UseGuards, Get, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body) {
        this.logger.log(`Login attempt for email: ${body.email}`);
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            this.logger.warn(`Login failed for email: ${body.email}`);
            throw new Error('Invalid credentials');
        }
        this.logger.log(`Login successful for email: ${body.email}`);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body) {
        this.logger.log(`Register attempt for email: ${body.email}`);
        try {
            const result = await this.authService.register(body);
            this.logger.log(`Registration successful for email: ${body.email}`);
            return result;
        } catch (error) {
            this.logger.error(`Registration failed for email: ${body.email}`, error.stack);
            throw error;
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
