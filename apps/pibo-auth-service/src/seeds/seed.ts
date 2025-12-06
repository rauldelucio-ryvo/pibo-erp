import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';

async function seed() {
    console.log('🌱 Starting database seeding...');

    try {
        await AppDataSource.initialize();
        console.log('✅ Database connection established');

        // Create default tenant
        const tenantRepository = AppDataSource.getRepository('Tenant');
        let defaultTenant = await tenantRepository.findOne({ where: { name: 'Default Tenant' } });

        if (!defaultTenant) {
            defaultTenant = await tenantRepository.save({
                name: 'Default Tenant',
            });
            console.log('✅ Default tenant created');
        } else {
            console.log('ℹ️  Default tenant already exists');
        }

        // Create admin user
        const userRepository = AppDataSource.getRepository('User');
        const adminEmail = 'admin@pibo.app';
        let adminUser = await userRepository.findOne({ where: { email: adminEmail } });

        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            adminUser = await userRepository.save({
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                tenantId: defaultTenant.id,
            });
            console.log('✅ Admin user created');
            console.log(`   Email: ${adminEmail}`);
            console.log(`   Password: admin123`);
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        // Create demo user
        const demoEmail = 'demo@pibo.app';
        let demoUser = await userRepository.findOne({ where: { email: demoEmail } });

        if (!demoUser) {
            const hashedPassword = await bcrypt.hash('demo123', 10);
            demoUser = await userRepository.save({
                email: demoEmail,
                password: hashedPassword,
                role: 'user',
                tenantId: defaultTenant.id,
            });
            console.log('✅ Demo user created');
            console.log(`   Email: ${demoEmail}`);
            console.log(`   Password: demo123`);
        } else {
            console.log('ℹ️  Demo user already exists');
        }

        console.log('');
        console.log('🎉 Database seeding completed successfully!');
        console.log('');
        console.log('📝 Default Credentials:');
        console.log('   Admin: admin@pibo.app / admin123');
        console.log('   Demo:  demo@pibo.app / demo123');
        console.log('');

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
