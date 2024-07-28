import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CategoriesService } from '../categories/categories.service';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { faker } from '@faker-js/faker';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class FakerService {
  constructor(
    private readonly postsService: PostsService,
    private readonly categoriesService: CategoriesService,
    private readonly sessionService: SessionsService,
  ) {}

  async seedDatabase(
    postCount: number,
    categoryCount: number,
    sessionsCount: number,
  ): Promise<void> {
    const sessions = [];
    for (let i = 0; i < sessionsCount; i++) {
      const session = await this.sessionService.startGuestSession('127.0.0.1');
      sessions.push(session);
    }

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
      const randomSession =
        sessions[Math.floor(Math.random() * sessions.length)];
      const post: CreatePostDto = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        sessionId: randomSession.sessionId,
        categoryId: randomCategory.id,
        expiresAt: faker.date.future().toISOString(),
      };
      await this.postsService.create(post);
    }
  }
}
