import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ schema: 'community', name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  post_id: number

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string

  @Column({ name: 'content', type: 'text' })
  content: string

  @Column({ name: 'user_id', nullable: false })
  user_id: number

  @Column({ name: 'category_id', nullable: false })
  category_id: number

  @Column({ name: 'menu_id', nullable: false })
  menu_id: number

  @Column({ name: 'submenu_id', nullable: false })
  submenu_id: number

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'view_count', default: 0 })
  view_count: number

  @Column({ name: 'upvotes', default: 0 })
  upvotes: number

  @Column({ name: 'downvotes', default: 0 })
  downvotes: number

  @Column({ name: 'disabled', default: false })
  disabled: boolean
}
