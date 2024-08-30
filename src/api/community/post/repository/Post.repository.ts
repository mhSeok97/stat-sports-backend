import { AppDataSource } from 'utils/mysql'
import { PostEntity } from 'api/community/post/entity/Post.entity'

export const PostRepository = AppDataSource.getRepository(PostEntity).extend({
  findPost() {
    return this.find()
  },

  findPostsByMenuId(menuId: number) {
    return this.find({ where: { menu_id: menuId } })
  },

  findPostsBySubmenuId(submenuId: number) {
    return this.find({ where: { submenu_id: submenuId } })
  },
})
