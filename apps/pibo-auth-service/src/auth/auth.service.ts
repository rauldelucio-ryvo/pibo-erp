import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tenantsService: TenantsService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && await bcrypt.compare(pass, user.passwordHash)) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, tenantId: user.tenantId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: any) {
        // 1. Create Tenant
        const tenant = await this.tenantsService.create({ name: data.companyName, slug: data.companySlug });

        // 2. Create User
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(data.password, salt);

        const user = await this.usersService.create({
            email: data.email,
            passwordHash,
            tenantId: tenant.id,
            role: UserRole.ADMIN
        });

        return this.login(user);
    }
}
