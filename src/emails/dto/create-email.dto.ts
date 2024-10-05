import { IsNotEmpty } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    recipient: string;  // Email recipient
    @IsNotEmpty()
    subject: string;    // Subject of the email
    @IsNotEmpty()
    body: string;       // Body content (plaintext or HTML)
    @IsNotEmpty()
    emailType: string;  // Type of email (e.g., "welcome", "notification")
    @IsNotEmpty()
    projectName : string
  }
  