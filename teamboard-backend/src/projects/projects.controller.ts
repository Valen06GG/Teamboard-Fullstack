import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @Post()
  create(
    @Body() body: { name: string, description: string },
    @Req() req,
  ) {
    return this.projectsService.create(body, req.user.companyId);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findAll(req.user.companyId);
  }
}
