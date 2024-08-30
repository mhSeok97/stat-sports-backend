import { Get, JsonController } from 'routing-controllers'
import { CommunityService } from 'api/community/community.service'
import { CommentService } from 'api/community/post/comment/comment.service'
import { MenuService } from 'api/community/menu/menu.service'
import { SubmenuService } from 'api/community/menu/submenu/submenu.service'
import { OpenAPI } from 'routing-controllers-openapi'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'
import { apiSuccess } from 'api/common/dto/api-util.dto'

@JsonController('/community')
export class CommunityController {
  constructor(
    private communityService: CommunityService,
    private commentService: CommentService,
    private menuService: MenuService,
    private submenuService: SubmenuService,
  ) {}

  @Get('/posts')
  @OpenAPI(swaggerDocument.GET_POSTS)
  async getPosts() {
    logger.info('getting posts')
    const posts = await this.communityService.getPosts()
    logger.info(JSON.stringify(posts))
    return apiSuccess(posts)
  }

  @Get('/comments')
  @OpenAPI(swaggerDocument.GET_COMMENTS)
  async getComments() {
    logger.info('getting comments')
    const comments = await this.commentService.getComments()
    logger.info(JSON.stringify(comments))
    return apiSuccess(comments)
  }

  @Get('/menus')
  @OpenAPI(swaggerDocument.GET_MENUS)
  async getMenus() {
    logger.info('getting menus')
    const menus = await this.menuService.getMenus()
    logger.info(JSON.stringify(menus))
    return apiSuccess(menus)
  }

  @Get('/submenus')
  @OpenAPI(swaggerDocument.GET_SUBMENUS)
  async getSubmenus() {
    logger.info('getting submenus')
    const submenus = await this.submenuService.getSubmenus()
    logger.info(JSON.stringify(submenus))
    return apiSuccess(submenus)
  }
}
