import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsModule } from './emails/emails.module';
import * as dotenv from 'dotenv';
import { LoggerModule } from 'nestjs-pino';
import { StatisticsModule } from './statistics/statistics.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LogModule } from './log/log.module';
import { ProjectModule } from './project/project.module';
import { ApiKeyMiddleware } from './api-key/api-key.middleware';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement globales
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_NOMUTILISATEUR,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // À désactiver en production
      autoLoadEntities: true,
      // logging: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_COOKIE_SECRET_KEY,
      signOptions: { expiresIn: '60m' }, 
    }),
    EmailsModule,
    StatisticsModule,
    LogModule,
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
