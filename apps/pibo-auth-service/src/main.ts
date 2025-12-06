import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

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

    // Add global request logging
    app.use((req, res, next) => {
        logger.log(`${req.method} ${req.url} - ${req.ip}`);
        next();
    });

    await app.listen(3001);
    logger.log(`🚀 Auth Service is running on port 3001`);
    logger.log(`CORS enabled with origin: *`);
}
bootstrap();
