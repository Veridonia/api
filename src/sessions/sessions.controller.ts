import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
  Logger,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Response, Request } from 'express';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async handleSession(
    @Body() body: { action: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { action } = body;

    if (action === 'start') {
      const session = await this.sessionsService.startGuestSession();
      res.cookie('sessionId', session.sessionId, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
      });
      return res
        .status(HttpStatus.CREATED)
        .json({ sessionId: session.sessionId });
    } else if (action === 'end') {
      const { sessionId } = req.cookies;
      await this.sessionsService.endGuestSession(sessionId);
      res.clearCookie('sessionId');
      return res.status(HttpStatus.OK).json({ message: 'Guest session ended' });
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid action' });
    }
  }

  @Get('check')
  async checkSession(@Req() req: Request, @Res() res: Response) {
    const { sessionId } = req.cookies;
    if (sessionId) {
      const session = await this.sessionsService.findSession(sessionId);
      if (session) {
        return res.status(HttpStatus.OK).json({ isGuest: true });
      }
    }
    return res.status(HttpStatus.OK).json({ isGuest: false });
  }
}
