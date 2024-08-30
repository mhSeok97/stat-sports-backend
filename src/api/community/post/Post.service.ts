import { Service } from 'typedi'
import { PostEntity } from 'api/community/post/entity/Post.entity'
import { PostOutDto } from 'api/community/post/dto/PostOut.dto'
import { PostRepository } from 'api/community/post/repository/Post.repository'
import { NotFoundError } from 'routing-controllers'
import { CreatePostDto } from 'api/community/post/dto/CreatePost.dto'
import { UpdatePostDto } from 'api/community/post/dto/UpdatePost.dto'
import { Between, FindManyOptions, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm'

interface PostFilterOptions {
  title?: string
  userId?: number
  dateFrom?: Date
  dateTo?: Date
  minUpvotes?: number
  maxUpvotes?: number
}

@Service()
export class PostService {
  async getPosts(filterOptions: PostFilterOptions = {}, page = 1, pageSize = 10): Promise<PostOutDto[]> {
    const where: FindManyOptions<PostEntity>['where'] = {}

    if (filterOptions.title) {
      where.title = Like(`%${filterOptions.title}%`)
    }
    if (filterOptions.userId) {
      where.user_id = filterOptions.userId
    }
    if (filterOptions.dateFrom && filterOptions.dateTo) {
      where.created_at = Between(filterOptions.dateFrom, filterOptions.dateTo)
    } else if (filterOptions.dateFrom) {
      where.created_at = MoreThanOrEqual(filterOptions.dateFrom)
    } else if (filterOptions.dateTo) {
      where.created_at = LessThanOrEqual(filterOptions.dateTo)
    }
    if (filterOptions.minUpvotes && filterOptions.maxUpvotes) {
      where.upvotes = Between(filterOptions.minUpvotes, filterOptions.maxUpvotes)
    } else if (filterOptions.minUpvotes) {
      where.upvotes = MoreThanOrEqual(filterOptions.minUpvotes)
    } else if (filterOptions.maxUpvotes) {
      where.upvotes = LessThanOrEqual(filterOptions.maxUpvotes)
    }

    const skip = (page - 1) * pageSize
    const posts = await PostRepository.find({
      where,
      skip,
      take: pageSize,
    })

    if (!posts || posts.length === 0) {
      throw new NotFoundError('No posts found')
    }

    return posts.map(this.convertPostToPostOutDto)
  }

  async getPostById(postId: number): Promise<PostOutDto> {
    const post = await PostRepository.findOne({ where: { post_id: postId } })
    if (!post) {
      throw new NotFoundError('Post not found')
    }
    return this.convertPostToPostOutDto(post)
  }

  async getPostsByMenuId(menuId: number, filterOptions: PostFilterOptions = {}, page = 1, pageSize = 10): Promise<PostOutDto[]> {
    const where: FindManyOptions<PostEntity>['where'] = { menu_id: menuId }

    if (filterOptions.title) {
      where.title = Like(`%${filterOptions.title}%`)
    }
    if (filterOptions.userId) {
      where.user_id = filterOptions.userId
    }
    if (filterOptions.dateFrom && filterOptions.dateTo) {
      where.created_at = Between(filterOptions.dateFrom, filterOptions.dateTo)
    } else if (filterOptions.dateFrom) {
      where.created_at = MoreThanOrEqual(filterOptions.dateFrom)
    } else if (filterOptions.dateTo) {
      where.created_at = LessThanOrEqual(filterOptions.dateTo)
    }
    if (filterOptions.minUpvotes && filterOptions.maxUpvotes) {
      where.upvotes = Between(filterOptions.minUpvotes, filterOptions.maxUpvotes)
    } else if (filterOptions.minUpvotes) {
      where.upvotes = MoreThanOrEqual(filterOptions.minUpvotes)
    } else if (filterOptions.maxUpvotes) {
      where.upvotes = LessThanOrEqual(filterOptions.maxUpvotes)
    }

    const skip = (page - 1) * pageSize
    const posts = await PostRepository.find({
      where,
      skip,
      take: pageSize,
    })

    if (!posts || posts.length === 0) {
      throw new NotFoundError('No posts found for this menu')
    }

    return posts.map(this.convertPostToPostOutDto)
  }

  async getPostsBySubmenuId(submenuId: number, filterOptions: PostFilterOptions = {}, page = 1, pageSize = 10): Promise<PostOutDto[]> {
    const where: FindManyOptions<PostEntity>['where'] = { submenu_id: submenuId }

    if (filterOptions.title) {
      where.title = Like(`%${filterOptions.title}%`)
    }
    if (filterOptions.userId) {
      where.user_id = filterOptions.userId
    }
    if (filterOptions.dateFrom && filterOptions.dateTo) {
      where.created_at = Between(filterOptions.dateFrom, filterOptions.dateTo)
    } else if (filterOptions.dateFrom) {
      where.created_at = MoreThanOrEqual(filterOptions.dateFrom)
    } else if (filterOptions.dateTo) {
      where.created_at = LessThanOrEqual(filterOptions.dateTo)
    }
    if (filterOptions.minUpvotes && filterOptions.maxUpvotes) {
      where.upvotes = Between(filterOptions.minUpvotes, filterOptions.maxUpvotes)
    } else if (filterOptions.minUpvotes) {
      where.upvotes = MoreThanOrEqual(filterOptions.minUpvotes)
    } else if (filterOptions.maxUpvotes) {
      where.upvotes = LessThanOrEqual(filterOptions.maxUpvotes)
    }

    const skip = (page - 1) * pageSize
    const posts = await PostRepository.find({
      where,
      skip,
      take: pageSize,
    })

    if (!posts || posts.length === 0) {
      throw new NotFoundError('No posts found for this submenu')
    }

    return posts.map(this.convertPostToPostOutDto)
  }

  async createPost(createPostDto: CreatePostDto): Promise<PostOutDto> {
    const post = PostRepository.create(createPostDto)
    const savedPost = await PostRepository.save(post)
    return this.convertPostToPostOutDto(savedPost)
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto): Promise<PostOutDto> {
    const post = await PostRepository.findOne({ where: { post_id: postId } })
    if (!post) {
      throw new NotFoundError('Post not found')
    }
    await PostRepository.update(postId, updatePostDto)
    const updatedPost = await PostRepository.findOne({ where: { post_id: postId } })
    return this.convertPostToPostOutDto(updatedPost)
  }

  async deletePost(postId: number): Promise<void> {
    const post = await PostRepository.findOne({ where: { post_id: postId } })
    if (!post) {
      throw new NotFoundError('Post not found')
    }
    await PostRepository.delete(postId)
  }

  private convertPostToPostOutDto(post: PostEntity): PostOutDto {
    if (!post) {
      throw new NotFoundError()
    }
    const postDto = new PostOutDto()
    postDto.post_id = post.post_id
    postDto.user_id = post.user_id
    postDto.category_id = post.category_id
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
