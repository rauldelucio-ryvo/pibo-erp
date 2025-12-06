import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    // Enable CORS with full configuration
    app.enableCors({
        origin: '*',
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        allowedHeaders: '*',
        credentials: false,
    });

    // Enable validation pipes globally
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Swagger/OpenAPI Configuration
    const config = new DocumentBuilder()
        .setTitle('Pibo ERP - Auth Service')
        .setDescription('Authentication and Authorization API for Pibo ERP System')
        .setVersion('1.0')
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management')
        .addTag('tenants', 'Multi-tenancy management')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addServer('http://localhost:3001', 'Local Development')
        .addServer('http://159.65.237.156', 'Production Server')
        .setContact('Pibo ERP Team', 'https://pibo.app', 'support@pibo.app')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Pibo ERP Auth API',
        customfavIcon: 'https://pibo.app/favicon.ico',
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
        },
    });

    // Add global request logging
    app.use((req, res, next) => {
        logger.log(`${req.method} ${req.url} - ${req.ip}`);
        next();
    });

    await app.listen(3001);
    logger.log(`🚀 Auth Service is running on port 3001`);
    logger.log(`📚 API Documentation available at http://localhost:3001/api/docs`);
    logger.log(`CORS enabled with origin: *`);
}
bootstrap();

