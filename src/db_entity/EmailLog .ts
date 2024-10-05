import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Entity()
export class EmailLog {
@PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipient: string;

  @Column()
  subject: string;

  @Column({ default: 'Pending' })
  status: string;

  @Column('text')
  body: string;

  @ManyToOne(() => Project)
  project: Project;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;
}
