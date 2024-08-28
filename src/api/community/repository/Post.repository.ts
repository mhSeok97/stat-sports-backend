import { AppDataSource } from 'utils/mysql'
import { PostEntity } from '../post/entity/Post.entity'

export const PostRepository = AppDataSource.getRepository(PostEntity).extend({
  findPost() {
    return this.find({
      select: [
        'post_id',
        'user_id',
        'category_id',
        'subcategory_id',
        'title',
        'content',
        'created_at',
        'updated_at',
        'view_count',
        'upvotes',
        'downvotes',
        'disabled',
      ],
    })
  },
})
