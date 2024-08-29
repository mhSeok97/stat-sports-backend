import { Service } from 'typedi'
import { PostService } from 'api/community/post/Post.service'
import { PostOutDto } from 'api/community/post/dto/PostOut.dto'

@Service()
export class CommunityService {
  private readonly postService = new PostService()

  async getPosts(): Promise<PostOutDto[]> {
    return await this.postService.getPosts()
  }
}
