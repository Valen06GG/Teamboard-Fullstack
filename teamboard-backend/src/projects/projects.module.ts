import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
