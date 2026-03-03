import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Project } from 'src/projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
