import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: 'league_of_legend', name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  post_id: number

  @Column({ name: 'user_id', nullable: false })
  user_id: string

  @Column({ name: 'category_id', nullable: false })
  category_id: string

  @Column({ name: 'subcategory_id', nullable: false })
  subcategory_id: string

  @Column({ name: 'title' })
  title: string

  @Column({ name: 'content' })
  content: string

  @Column({ name: 'created_at' })
  created_at: Date

  @Column({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'view_count' })
  view_count: number

  @Column({ name: 'upvotes' })
  upvotes: number

  @Column({ name: 'downvotes' })
  downvotes: number

  @Column({ name: 'disabled' })
  disabled: boolean
}
