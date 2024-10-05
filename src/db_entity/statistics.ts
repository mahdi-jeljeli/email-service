import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  emailType: string; // Type d'email (ex: "welcome", "invoice", etc.)

  @Column({ default: 0 })
  sentCount: number;

  @Column({ default: 0 })
  failureCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Project)
  project: Project;
}

