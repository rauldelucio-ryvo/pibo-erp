import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'User email address',
        example: 'admin@pibo.app',
        type: String,
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'SecurePassword123!',
        type: String,
        minLength: 6,
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export class RegisterDto {
    @ApiProperty({
        description: 'User email address',
        example: 'newuser@pibo.app',
        type: String,
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'SecurePassword123!',
        type: String,
        minLength: 6,
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({
        description: 'Tenant ID for multi-tenancy',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    tenantId?: string;

    @ApiProperty({
        description: 'User role',
        example: 'user',
        enum: ['admin', 'user', 'manager'],
        default: 'user',
        required: false,
    })
    @IsString()
    @IsOptional()
    role?: string;
}
