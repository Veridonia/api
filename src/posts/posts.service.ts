import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(categoryName?: string, limit?: number, page?: number): Promise<Post[]> {
    let filter = {};
    if (categoryName) {
      const category = await this.categoriesService.findByName(categoryName);
      if (!category) {
        return [];
      }
      filter = { category: category.id };
    }
    const options = {
      limit: limit ? limit : 10,
      skip: page && limit ? (page - 1) * limit : 0,
    };
    return this.postModel.find(filter).populate('category').limit(options.limit).skip(options.skip).exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).populate('category').exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).populate('category').exec();
  }

  async delete(id: string): Promise<any> {
    return (this.postModel as any).delete({ _id: id }).exec();
  }

  async restore(id: string): Promise<any> {
    return (this.postModel as any).restore({ _id: id }).exec();
  }

  async getTotalPages(categoryName?: string, limit = 10): Promise<number> {
    let filter = {};
    if (categoryName) {
      const category = await this.categoriesService.findByName(categoryName);
      if (!category) {
        return 0;
      }
      filter = { category: category.id };
    }
    const totalPosts = await this.postModel.countDocuments(filter).exec();
    return Math.ceil(totalPosts / limit);
  }
}
