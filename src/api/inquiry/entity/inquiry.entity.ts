import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Comment } from "api/inquiry/comment/entity/comment.entity";
import { Answer } from "api/inquiry/answer/entity/answer.entity";
import { InquiryStatus } from "api/inquiry/dto/InquiryStatus.dto";

@Entity("inquiries")
export class Inquiry {
  @PrimaryGeneratedColumn({ name: "inquiry_id" })
  inquiryId: number;

  @Column({ name: "user_email" })
  userEmail: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "content", type: "text" })
  content: string;

  @Column({ name: "status" })
  status: InquiryStatus;

  @Column({ name: "is_public", default: true })
  isPublic: boolean;

  // YYYY.MM.DD HH:MM:SS:MS
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @OneToMany(() => Comment, (comment) => comment.inquiry)
  comments: Comment[];

  @OneToMany(() => Answer, (answer) => answer.inquiry)
  answers: Answer[];
}
