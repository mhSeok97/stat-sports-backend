import { Service } from 'typedi'
import { PostEntity } from 'api/community/post/entity/Post.entity'
import { PostOutDto } from 'api/community/post/dto/PostOut.dto'
import { PostRepository } from 'api/community/post/repository/Post.repository'
import { NotFoundError } from 'routing-controllers'

@Service()
export class PostService {
  async getPosts(): Promise<PostOutDto[]> {
    const posts = await PostRepository.findPost()

    return posts.map(this.convertPostToPostOutDto)
  }

  private convertPostToPostOutDto(post: PostEntity): PostOutDto {
    if (!post) {
      throw new NotFoundError()
    }
    const postDto = new PostOutDto()
    postDto.post_id = post.post_id
    postDto.user_id = post.user_id
    postDto.menu_id = post.menu_id
    postDto.submenu_id = post.submenu_id
    postDto.title = post.title
    postDto.content = post.content
    postDto.created_at = post.created_at
    postDto.updated_at = post.updated_at
    postDto.view_count = post.view_count
    postDto.upvotes = post.upvotes
    postDto.downvotes = post.downvotes
    postDto.disabled = post.disabled
    return postDto
  }
}
