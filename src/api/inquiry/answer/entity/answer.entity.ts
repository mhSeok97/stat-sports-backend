import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Inquiry } from "../../entity/inquiry.entity";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn({ name: "answer_id" })
  answerId: number;

  @Column({ name: "user_email" })
  userEmail: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "content", type: "text" })
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.answers)
  @JoinColumn({ name: "inquiry_id" })
  inquiry: Inquiry;
}