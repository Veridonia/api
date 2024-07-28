import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  HttpStatus,
  Logger,
  Param,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';

@Controller('sessions')
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto) {
    const { ip } = createSessionDto;

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
      throw new BadRequestException('No session ID provided');
    }

    await this.sessionsService.endGuestSession(sessionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Guest session ended',
    };
  }

  @Get('check-username/:username')
  async checkUsername(@Param('username') username: string) {
    this.logger.log(`Check username - Username: ${username}`);

    const isUnique = await this.sessionsService.isUsernameUnique(username);
    return {
      statusCode: HttpStatus.OK,
      data: { isUnique },
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

  @Post('change-username/:sessionId')
  async changeUsername(
    @Param('sessionId') sessionId: string,
    @Body() changeUsernameDto: ChangeUsernameDto,
  ) {
    const { newUsername } = changeUsernameDto;

    this.logger.log(`New Username: ${newUsername}`);

    const isUnique = await this.sessionsService.isUsernameUnique(newUsername);

    if (!isUnique) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Username already taken',
      };
    }

    await this.sessionsService.updateUsername(sessionId, newUsername);
    return {
      statusCode: HttpStatus.OK,
      message: 'Username updated successfully',
    };
  }
}