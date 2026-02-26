import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {

  @Get('test')
  @UseGuards(JwtAuthGuard)
    test(@Req() req) {
      return req.user;
  }
}
