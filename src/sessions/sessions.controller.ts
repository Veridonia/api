import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Response, Request } from 'express';
import { Logger } from '@nestjs/common';

@Controller('sessions')
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async handleSession(
    @Body() body: { action: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { action } = body;
    let ip =
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (Array.isArray(ip)) {
      ip = ip[0];
    }

    this.logger.log(`Received action: ${action}`);
    this.logger.log(`IP Address: ${ip}`);
    this.logger.log(`Cookies: ${JSON.stringify(req.cookies)}`);

    if (action === 'start') {
      const session = await this.sessionsService.startGuestSession(ip);
      res.cookie('sessionId', session.sessionId, {
        secure: true,
        sameSite: 'strict',
      });
      return res
        .status(HttpStatus.CREATED)
        .json({ sessionId: session.sessionId });
    } else if (action === 'end') {
      const { sessionId } = req.cookies;
      this.logger.log(`Session ID: ${sessionId}`);
      if (!sessionId) {
        this.logger.error('No session cookie found');
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'No session cookie found' });
      }
      await this.sessionsService.endGuestSession(sessionId);
      res.clearCookie('sessionId');
      return res.status(HttpStatus.OK).json({ message: 'Guest session ended' });
    } else {
      this.logger.error('Invalid action');
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid action' });
    }
  }

  @Get('check')
  async checkSession(@Req() req: Request, @Res() res: Response) {
    const { sessionId } = req.cookies;
    this.logger.log(`Check session - Cookies: ${JSON.stringify(req.cookies)}`);

    if (sessionId) {
      const session = await this.sessionsService.findSession(sessionId);
      if (session) {
        return res.status(HttpStatus.OK).json({ isGuest: true });
      }
    }
    return res.status(HttpStatus.OK).json({ isGuest: false });
  }
}
