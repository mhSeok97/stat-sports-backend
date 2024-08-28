import { Service } from 'typedi'
import { PostService } from './post/Post.service'
import { PostOutDto } from './post/dto/PostOut.dto'

@Service()
export class CommunityService {
  private readonly postService = new PostService()

  async getPosts(): Promise<PostOutDto[]> {
    return await this.postService.getPosts()
  }
}
