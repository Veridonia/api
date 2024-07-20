import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakerService {
  constructor(private readonly postsService: PostsService) {}

  async seedPosts(count: number): Promise<void> {
    const posts: CreatePostDto[] = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        author: faker.person.fullName(),
      });
    }

    for (const post of posts) {
      await this.postsService.create(post);
    }
  }
}
