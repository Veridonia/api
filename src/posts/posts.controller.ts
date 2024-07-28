import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(
    @Query('categoryName') categoryName?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return this.postsService.findAll(categoryName, limit, page);
  }

  @Get('totalPages')
  async getTotalPages(
    @Query('category') category?: string,
    @Query('limit') limit = 10,
  ) {
    const totalPages = await this.postsService.getTotalPages(category, limit);
    return { totalPages };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    return this.postsService.restore(id);
  }
}
