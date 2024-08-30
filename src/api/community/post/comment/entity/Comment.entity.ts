import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ schema: 'community', name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  comment_id: number

  @Column({ name: 'post_id', nullable: false })
  post_id: number

  @Column({ name: 'user_id', nullable: false })
  user_id: number

  @Column({ type: 'text', name: 'content' })
  content: string

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'upvotes', default: 0 })
  upvotes: number

  @Column({ name: 'downvotes', default: 0 })
  downvotes: number

  @Column({ name: 'disabled', default: false })
  disabled: boolean
}
