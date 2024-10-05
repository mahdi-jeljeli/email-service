import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {
  constructor(private emailService: EmailsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Envoyer un email via le service' })
  @ApiBody({ type: CreateEmailDto, description: 'Détails de l\'email à envoyer' })
  @ApiResponse({ status: 201, description: 'Email envoyé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
  async sendEmail(@Body() createEmailDto: CreateEmailDto): Promise<{ code: number; message: string }>  {
    return this.emailService.sendEmail(createEmailDto);
  }
}
