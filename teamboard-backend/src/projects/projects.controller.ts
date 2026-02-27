import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @Post()
  create(
    @Body() body: { name: string, description: string },
    @CurrentUser() user,
  ) {
    return this.projectsService.create(body, user.companyId);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.projectsService.findAll(user.companyId);
  }
}
