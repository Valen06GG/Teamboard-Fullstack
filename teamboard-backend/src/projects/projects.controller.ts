import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @Post()
  @Roles('admin')
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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/tasks')
  getProjectTasks(
  @Param('id') id: string,
  @Request() req
) {
  return this.projectsService.getProjectTasks(id, req.user);
}
}
