import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://admin:password@localhost:5672'],
            queue: 'fiscal_queue',
            queueOptions: {
                durable: false
            },
        },
    });
    await app.listen();
    console.log('Fiscal Microservice is listening');
}
bootstrap();
