import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: SoftDeleteModel<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.postModel.delete({ _id: id }).exec();
  }

  async restore(id: string): Promise<any> {
    return this.postModel.restore({ _id: id }).exec();
  }
}
