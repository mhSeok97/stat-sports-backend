import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Inquiry } from "../../entity/inquiry.entity";

@Entity("comments")
export class Comment {
  constructor(inquiry: Inquiry, userEmail: string, userName: string, content: string) {
    this.inquiry = inquiry;
    this.userEmail = userEmail;
    this.userName = userName;
    this.content = content;
  }

  @PrimaryGeneratedColumn({ name: "comment_id" })
  commentId: number;

  @Column({ name: "parent_comment_id", nullable: true })
  parentCommentId: number | null;

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

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.comments)
  @JoinColumn({ name: "inquiry_id" })
  inquiry: Inquiry;
}
