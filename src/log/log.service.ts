import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
  
  logAction(action: string, userId: string) {
    this.logger.log(`Action: ${action}, User ID: ${userId}`);
  }
}
