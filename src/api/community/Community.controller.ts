import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers'
import { CommunityService } from 'api/community/Community.service'
import { CommentService } from 'api/community/post/comment/Comment.service'
import { MenuService } from 'api/community/menu/Menu.service'
import { SubmenuService } from 'api/community/menu/submenu/Submenu.service'
import { PostService } from 'api/community/post/Post.service'
import { OpenAPI } from 'routing-controllers-openapi'
import { swaggerDocument } from 'config/swagger.config'
import { logger } from 'utils/logger'
import { apiSuccess } from 'api/common/dto/api-util.dto'
import { CreatePostDto } from 'api/community/post/dto/CreatePost.dto'
import { UpdatePostDto } from 'api/community/post/dto/UpdatePost.dto'
import { CreateMenuDto } from 'api/community/menu/dto/CreateMenu.dto'
import { UpdateMenuDto } from 'api/community/menu/dto/UpdateMenu.dto'
import { CreateSubmenuDto } from 'api/community/menu/submenu/dto/CreateSubmenu.dto'
import { UpdateSubmenuDto } from 'api/community/menu/submenu/dto/UpdateSubmenu.dto'

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

  @Get('/menu/:menuId/posts')
  @OpenAPI(swaggerDocument.GET_POSTS_BY_MENU_ID)
  async getPostsByMenuId(@Param('menuId') menuId: number) {
    logger.info(`getting posts by menu id ${menuId}`)
    const posts = await this.postService.getPostsByMenuId(menuId)
    return apiSuccess(posts)
  }

  @Get('/submenu/:submenuId/posts')
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

  @Get('/post/:postId/comments')
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

  @Get('/menus/:id')
  @OpenAPI(swaggerDocument.GET_MENU_BY_ID)
  async getMenuById(@Param('id') menuId: number) {
    logger.info(`getting menu with id ${menuId}`)
    const menu = await this.menuService.getMenuById(menuId)
    return apiSuccess(menu)
  }

  @Get('/category/:categoryId/menus')
  @OpenAPI(swaggerDocument.GET_MENUS_BY_CATEGORY_ID)
  async getMenusByCategoryId(@Param('categoryId') categoryId: number) {
    logger.info(`getting menus by category id ${categoryId}`)
    const menus = await this.menuService.getMenusByCategoryId(categoryId)
    return apiSuccess(menus)
  }

  @Post('/menus')
  @OpenAPI(swaggerDocument.CREATE_MENU)
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    logger.info('creating a new menu')
    const newMenu = await this.menuService.createMenu(createMenuDto)
    return apiSuccess(newMenu)
  }

  @Put('/menus/:id')
  @OpenAPI(swaggerDocument.UPDATE_MENU)
  async updateMenu(@Param('id') menuId: number, @Body() updateMenuDto: UpdateMenuDto) {
    logger.info(`updating menu with id ${menuId}`)
    const updatedMenu = await this.menuService.updateMenu(menuId, updateMenuDto)
    return apiSuccess(updatedMenu)
  }

  @Delete('/menus/:id')
  @OpenAPI(swaggerDocument.DELETE_MENU)
  async deleteMenu(@Param('id') menuId: number) {
    logger.info(`deleting menu with id ${menuId}`)
    await this.menuService.deleteMenu(menuId)
    return apiSuccess({ message: 'Menu deleted successfully' })
  }

  @Get('/submenus')
  @OpenAPI(swaggerDocument.GET_SUBMENUS)
  async getSubmenus() {
    logger.info('getting submenus')
    const submenus = await this.submenuService.getSubmenus()
    logger.info(JSON.stringify(submenus))
    return apiSuccess(submenus)
  }

  @Get('/submenus/:id')
  @OpenAPI(swaggerDocument.GET_SUBMENU_BY_ID)
  async getSubmenuById(@Param('id') submenuId: number) {
    logger.info(`getting submenu with id ${submenuId}`)
    const submenu = await this.submenuService.getSubmenuById(submenuId)
    return apiSuccess(submenu)
  }

  @Get('/menu/:menuId/submenus')
  @OpenAPI(swaggerDocument.GET_SUBMENUS_BY_MENU_ID)
  async getSubmenusByMenuId(@Param('menuId') menuId: number) {
    logger.info(`getting submenus by menu id ${menuId}`)
    const submenus = await this.submenuService.getSubmenusByMenuId(menuId)
    return apiSuccess(submenus)
  }

  @Post('/submenus')
  @OpenAPI(swaggerDocument.CREATE_SUBMENU)
  async createSubmenu(@Body() createSubmenuDto: CreateSubmenuDto) {
    logger.info('creating a new submenu')
    const newSubmenu = await this.submenuService.createSubmenu(createSubmenuDto)
    return apiSuccess(newSubmenu)
  }

  @Put('/submenus/:id')
  @OpenAPI(swaggerDocument.UPDATE_SUBMENU)
  async updateSubmenu(@Param('id') submenuId: number, @Body() updateSubmenuDto: UpdateSubmenuDto) {
    logger.info(`updating submenu with id ${submenuId}`)
    const updatedSubmenu = await this.submenuService.updateSubmenu(submenuId, updateSubmenuDto)
    return apiSuccess(updatedSubmenu)
  }

  @Delete('/submenus/:id')
  @OpenAPI(swaggerDocument.DELETE_SUBMENU)
  async deleteSubmenu(@Param('id') submenuId: number) {
    logger.info(`deleting submenu with id ${submenuId}`)
    await this.submenuService.deleteSubmenu(submenuId)
    return apiSuccess({ message: 'Submenu deleted successfully' })
  }
}
