import { Controller, Request, Post, UseGuards, Get, Body, Logger, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate user with email and password, returns JWT access token'
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Login successful',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                        tenantId: { type: 'string' }
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials'
    })
    async login(@Body() loginDto: LoginDto) {
        this.logger.log(`Login attempt for email: ${loginDto.email}`);
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            this.logger.warn(`Login failed for email: ${loginDto.email}`);
            throw new UnauthorizedException('Invalid credentials');
        }
        this.logger.log(`Login successful for email: ${loginDto.email}`);
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({
        summary: 'User registration',
        description: 'Register a new user account with email, password, and optional tenant/role'
    })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User registered successfully',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                        tenantId: { type: 'string' }
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid input data or user already exists'
    })
    async register(@Body() registerDto: RegisterDto) {
        this.logger.log(`Register attempt for email: ${registerDto.email}`);
        try {
            const result = await this.authService.register(registerDto);
            this.logger.log(`Registration successful for email: ${registerDto.email}`);
            return result;
        } catch (error) {
            this.logger.error(`Registration failed for email: ${registerDto.email}`, error.stack);
            throw error;
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('profile')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get user profile',
        description: 'Retrieve authenticated user profile information (Admin only)'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User profile retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
                tenantId: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Not authenticated'
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Insufficient permissions (Admin role required)'
    })
    getProfile(@Request() req) {
        return req.user;
    }
}

