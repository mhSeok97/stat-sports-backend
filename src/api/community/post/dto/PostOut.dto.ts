import { CommentOutDto } from 'api/community/post/comment/dto/CommentOut.dto'

export class PostOutDto {
  post_id: number
  user_id: number
  menu_id: number
  submenu_id: number
  title: string
  content: string
  created_at: Date
  updated_at: Date
  view_count: number
  upvotes: number
  downvotes: number
  disabled: boolean
  comments: CommentOutDto[]
}
