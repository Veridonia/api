import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CategoriesService } from '../categories/categories.service';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakerService {
  constructor(
    private readonly postsService: PostsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async seedDatabase(postCount: number, categoryCount: number): Promise<void> {
    // Generate random categories
    const categories = [];
    for (let i = 0; i < categoryCount; i++) {
      const categoryName = faker.commerce.department();
      const createdCategory = await this.categoriesService.create({
        name: categoryName,
      });
      categories.push(createdCategory);
    }

    // Generate random posts with random categories
    for (let i = 0; i < postCount; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const post: CreatePostDto = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        author: faker.name.fullName(),
        category: randomCategory.id,
      };
      await this.postsService.create(post);
    }
  }
}
