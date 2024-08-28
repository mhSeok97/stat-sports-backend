export class PostOutDto {
  post_id: number
  user_id: string
  category_id: string
  subcategory_id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  view_count: number
  upvotes: number
  downvotes: number
  disabled: boolean
}
