import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${configService.get<string>(
          'KAFKA_DEPLOYMENT_STAGE',
          '',
        )}_${configService.get<string>('KAFKA_CLIENT_ID', '')}`,
        brokers: [configService.get<string>('KAFKA_BROKER', '')],
      },
      consumer: {
        groupId: `${configService.get<string>(
          'KAFKA_DEPLOYMENT_STAGE',
          '',
        )}_${configService.get<string>('KAFKA_GROUP_ID', '')}`,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
