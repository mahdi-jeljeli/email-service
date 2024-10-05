import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    const validApiKey = this.configService.get('ApiKey');
    const headers = req.get('ApiKey');
    if (!headers) {
      throw new UnauthorizedException('ApiKey not provided');
    }
    const tab = headers.split(' ');
    if (!tab[1] || tab[1] !== validApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    next();
  }
}
