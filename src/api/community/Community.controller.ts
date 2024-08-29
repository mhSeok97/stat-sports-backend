import { Get, JsonController } from 'routing-controllers'
import { CommunityService } from 'api/community/community.service'
import { OpenAPI } from 'routing-controllers-openapi'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'
import { apiSuccess } from 'api/common/dto/api-util.dto'

@JsonController('/community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get('/posts')
  @OpenAPI(swaggerDocument.GET_POSTS)
  async getPosts() {
    logger.info('getting posts')
    const posts = await this.communityService.getPosts()
    logger.info(JSON.stringify(posts))
    return apiSuccess(posts)
  }
}
