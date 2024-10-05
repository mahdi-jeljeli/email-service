import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

export const winstonConfig = WinstonModule.createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
  ],
});
