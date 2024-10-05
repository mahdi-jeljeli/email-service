import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { StatisticsService } from 'src/statistics/statistics.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailLog } from 'src/db_entity/EmailLog ';
import { ProjectService } from 'src/project/project.service';
dotenv.config();
@Injectable()
export class EmailsService {
  private transporter;
  private readonly logger = new Logger(EmailsService.name);
  constructor(
    private configService: ConfigService,
    private readonly statisticsService: StatisticsService,
    @InjectRepository(EmailLog)
    private readonly emailLogRepository: Repository<EmailLog>, 
    private readonly projectService: ProjectService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }
  async sendEmail(createEmailDto: CreateEmailDto): Promise<{ code: number; message: string }> {
    const { recipient, subject, body, emailType } = createEmailDto;
    const project = await this.projectService.findByName(createEmailDto.projectName);
    
    try {
      if (!project) throw new Error('Project not found');
    } catch (error) {
      this.logger.error('Project fetching failed', error.stack);
      throw new Error('Error fetching project for email logging');
    }
  
    const emailLog = new EmailLog();
    emailLog.recipient = recipient;
    emailLog.subject = subject;
    emailLog.body = body;
    emailLog.project = project;
  
    // Create statistics for the email
    const statistics = await this.statisticsService.createStatistics(project, emailType);
  
    try {
      this.logger.log(`Attempting to send email to ${recipient}`);
  
      // Envoi de l'email
      await this.transporter.sendMail({
        to: recipient,
        from: project.senderEmail,
        subject,
        text: body,
      });
  
      // Mise à jour du log et des statistiques sur succès
      this.logger.log(`Email successfully sent to ${recipient}`);
      emailLog.status = 'Success';  // Log success status
      await this.statisticsService.incrementSentCount(statistics.id); // Increment sent count
  
      return { code: 1, message: 'Email sent successfully' };  // Retourne le succès
  
    } catch (error) {
      // Mise à jour du log et des statistiques sur échec
      this.logger.error(`Failed to send email to ${recipient}`, error.stack);
      emailLog.status = 'Failed';  // Log failure status
      emailLog.body += `\nError: ${error.message}`;  // Add error message to the log
      await this.statisticsService.incrementFailureCount(statistics.id); // Increment failure count
  
      return { code: -1, message: 'Failed to send email' };  // Retourne l'échec
    } finally {
      // Sauvegarde du log d'email dans la base de données
      await this.emailLogRepository.save(emailLog);
    }
  }
  
}
