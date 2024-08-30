import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { CommentEntity } from 'api/community/post/comment/entity/Comment.entity'
import { CommentOutDto } from 'api/community/post/comment/dto/CommentOut.dto'
import { CommentRepository } from './repository/Comment.repository'

@Service()
export class CommentService {
  async getComments(): Promise<CommentOutDto[]> {
    const comments = await CommentRepository.findComment()

    return comments.map(this.convertCommentToCommentOutDto)
  }

  private convertCommentToCommentOutDto(comment: CommentEntity): CommentOutDto {
    if (!comment) {
      throw new NotFoundError()
    }
    const commentDto = new CommentOutDto()
    commentDto.comment_id = comment.comment_id
    commentDto.post_id = comment.post_id
    commentDto.user_id = comment.user_id
    commentDto.content = comment.content
    commentDto.created_at = comment.created_at
    commentDto.updated_at = comment.updated_at
    commentDto.upvotes = comment.upvotes
    commentDto.downvotes = comment.downvotes
    commentDto.disabled = comment.disabled
    return commentDto
  }
}
