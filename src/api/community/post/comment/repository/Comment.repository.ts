import { AppDataSource } from 'utils/mysql'
import { CommentEntity } from 'api/community/post/comment/entity/Comment.entity'

export const CommentRepository = AppDataSource.getRepository(CommentEntity).extend({
  findComment() {
    return this.find()
  },

  findCommentsByPostId(postId: number) {
    return this.find({ where: { post_id: postId } })
  },
})
