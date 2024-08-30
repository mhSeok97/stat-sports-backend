export class CommentOutDto {
  comment_id: number
  post_id: number
  user_id: number
  content: string
  created_at: Date
  updated_at: Date
  upvotes: number
  downvotes: number
  disabled: boolean
}
