import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers'
import { CommunityService } from 'api/community/community.service'
import { CommentService } from 'api/community/post/comment/comment.service'
import { MenuService } from 'api/community/menu/menu.service'
import { SubmenuService } from 'api/community/menu/submenu/submenu.service'
import { PostService } from 'api/community/post/post.service'
import { OpenAPI } from 'routing-controllers-openapi'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'
import { apiSuccess } from 'api/common/dto/api-util.dto'
import { CreatePostDto } from 'api/community/post/dto/CreatePost.dto'
import { UpdatePostDto } from 'api/community/post/dto/UpdatePost.dto'

@JsonController('/community')
export class CommunityController {
  constructor(
    private communityService: CommunityService,
    private commentService: CommentService,
    private menuService: MenuService,
    private submenuService: SubmenuService,
    private postService: PostService,
  ) {}

  @Get('/posts')
  @OpenAPI(swaggerDocument.GET_POSTS)
  async getPosts() {
    logger.info('getting posts')
    const posts = await this.communityService.getPosts()
    logger.info(JSON.stringify(posts))
    return apiSuccess(posts)
  }

  @Get('/posts/:id')
  @OpenAPI(swaggerDocument.GET_POST_BY_ID)
  async getPostById(@Param('id') postId: number) {
    logger.info(`getting post with id ${postId}`)
    const post = await this.postService.getPostById(postId)
    return apiSuccess(post)
  }

  @Get('/posts/menu/:menuId')
  @OpenAPI(swaggerDocument.GET_POSTS_BY_MENU_ID)
  async getPostsByMenuId(@Param('menuId') menuId: number) {
    logger.info(`getting posts by menu id ${menuId}`)
    const posts = await this.postService.getPostsByMenuId(menuId)
    return apiSuccess(posts)
  }

  @Get('/posts/submenu/:submenuId')
  @OpenAPI(swaggerDocument.GET_POSTS_BY_SUBMENU_ID)
  async getPostsBySubmenuId(@Param('submenuId') submenuId: number) {
    logger.info(`getting posts by submenu id ${submenuId}`)
    const posts = await this.postService.getPostsBySubmenuId(submenuId)
    return apiSuccess(posts)
  }

  @Post('/posts')
  @OpenAPI(swaggerDocument.CREATE_POST)
  async createPost(@Body() createPostDto: CreatePostDto) {
    logger.info('creating a new post')
    const newPost = await this.postService.createPost(createPostDto)
    return apiSuccess(newPost)
  }

  @Put('/posts/:id')
  @OpenAPI(swaggerDocument.UPDATE_POST)
  async updatePost(@Param('id') postId: number, @Body() updatePostDto: UpdatePostDto) {
    logger.info(`updating post with id ${postId}`)
    const updatedPost = await this.postService.updatePost(postId, updatePostDto)
    return apiSuccess(updatedPost)
  }

  @Delete('/posts/:id')
  @OpenAPI(swaggerDocument.DELETE_POST)
  async deletePost(@Param('id') postId: number) {
    logger.info(`deleting post with id ${postId}`)
    await this.postService.deletePost(postId)
    return apiSuccess({ message: 'Post deleted successfully' })
  }

  @Get('/comments')
  @OpenAPI(swaggerDocument.GET_COMMENTS)
  async getComments() {
    logger.info('getting comments')
    const comments = await this.commentService.getComments()
    logger.info(JSON.stringify(comments))
    return apiSuccess(comments)
  }

  @Get('/comments/:id')
  @OpenAPI(swaggerDocument.GET_COMMENT_BY_ID)
  async getCommentById(@Param('id') commentId: number) {
    logger.info(`getting comment with id ${commentId}`)
    const comment = await this.commentService.getCommentById(commentId)
    return apiSuccess(comment)
  }

  @Get('/comments/post/:postId')
  @OpenAPI(swaggerDocument.GET_COMMENTS_BY_POST_ID)
  async getCommentsByPostId(@Param('postId') postId: number) {
    logger.info(`getting comments by post id ${postId}`)
    const comments = await this.commentService.getCommentByPostId(postId)
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
