import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() body: { ip: string }) {
    const { ip } = body;

    this.logger.log(`Received create session action`);
    this.logger.log(`IP Address: ${ip}`);

    const session = await this.sessionsService.startGuestSession(ip);
    return {
      statusCode: HttpStatus.CREATED,
      data: { sessionId: session.sessionId, username: session.username },
    };
  }

  @Delete(':sessionId')
  async deleteSession(@Param('sessionId') sessionId: string) {
    this.logger.log(`Received delete session action`);
    this.logger.log(`Session ID: ${sessionId}`);

    if (!sessionId) {
      this.logger.error('No session ID provided');
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No session ID provided',
      };
    }

    await this.sessionsService.endGuestSession(sessionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Guest session ended',
    };
  }

  @Get(':sessionId')
  async getSession(@Param('sessionId') sessionId: string) {
    this.logger.log(`Check session - Session ID: ${sessionId}`);

    if (sessionId) {
      const session = await this.sessionsService.findSession(sessionId);
      if (session) {
        return {
          statusCode: HttpStatus.OK,
          data: {
            isGuest: true,
            sessionId: session.sessionId,
            username: session.username,
          },
        };
      }
    }
    return {
      statusCode: HttpStatus.OK,
      data: { isGuest: false },
    };
  }
}
