import { Service } from 'typedi'
import { NotFoundError } from 'routing-controllers'
import { CommentEntity } from 'api/community/post/comment/entity/Comment.entity'
import { CommentOutDto } from 'api/community/post/comment/dto/CommentOut.dto'
import { CommentRepository } from './repository/Comment.repository'
import { CreateCommentDto } from 'api/community/post/comment/dto/CreateComment.dto'
import { UpdateCommentDto } from 'api/community/post/comment/dto/UpdateComment.dto'

@Service()
export class CommentService {
  async getComments(): Promise<CommentOutDto[]> {
    const comments = await CommentRepository.findComment()
    return comments.map(this.convertCommentToCommentOutDto)
  }

  async getCommentById(commentId: number): Promise<CommentOutDto> {
    const comment = await CommentRepository.findOne({ where: { comment_id: commentId } })
    if (!comment) {
      throw new NotFoundError('Comment not found')
    }
    return this.convertCommentToCommentOutDto(comment)
  }

  async getCommentByPostId(postId: number): Promise<CommentOutDto[]> {
    const comments = await CommentRepository.findCommentsByPostId(postId)
    if (!comments || comments.length === 0) {
      throw new NotFoundError('No comments found for this post')
    }
    return comments.map(this.convertCommentToCommentOutDto)
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<CommentOutDto> {
    const comment = CommentRepository.create(createCommentDto)
    const savedComment = await CommentRepository.save(comment)
    return this.convertCommentToCommentOutDto(savedComment)
  }

  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto): Promise<CommentOutDto> {
    const comment = await CommentRepository.findOne({ where: { comment_id: commentId } })
    if (!comment) {
      throw new NotFoundError('Comment not found')
    }
    await CommentRepository.update(commentId, updateCommentDto)
    const updatedComment = await CommentRepository.findOne({ where: { comment_id: commentId } })
    return this.convertCommentToCommentOutDto(updatedComment)
  }

  async deleteComment(commentId: number): Promise<void> {
    const comment = await CommentRepository.findOne({ where: { comment_id: commentId } })
    if (!comment) {
      throw new NotFoundError('Comment not found')
    }
    await CommentRepository.delete(commentId)
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
