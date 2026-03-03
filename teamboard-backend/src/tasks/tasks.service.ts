import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/projects.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    async create(dto: CreateTaskDto, user: any) {
        console.log('---- DEBUG CREATE TASK ----');
        console.log('PROJECT ID:', dto.projectId);
        console.log('USER COMPANY ID:', user.companyId);
        console.log('USER ROLE:', user.role);
        console.log('USER ID (sub):', user.sub);
      const project = await this.projectRepository.findOne({
        where: {
            id: dto.projectId,
            company: { id: user.companyId },
        },
      });
      console.log('PROJECT FOUND FULL:', project);

      if (!project) {
        throw new ForbiddenException('Project not found in your company');
      }

      let assignedUserId: string;

      if (user.role === 'admin') {
        assignedUserId = dto.assignedToId;
      } else {
        assignedUserId = user.sub;
      }

      const task = this.taskRepository.create({
        title: dto.title,
        assignedTo: { id: dto.assignedToId },
        project: { id: dto.projectId },
        company: { id: user.companyId },
    });
        return this.taskRepository.save(task);
    }

    async findAll(user: any) {
        if (user.role === 'admin') {
            return this.taskRepository.find({
                where: {
                    company: { id: user.companyId },
                },
                relations: ['project', 'assignedTo'],
        });
      }

      return this.taskRepository.find({
        where: {
            company: { id: user.companyId },
            assignedTo: { id: user.sub },
        },
        relations: ['project', 'assignedTo'],
      })
    }

    async updateStatus(id: string, dot: UpdateTaskStatusDto, user: any) {
        const task = await this.taskRepository.findOne({
          where: {
            id,
            company: { id: user.companyId },
          },
          relations: ['assignedTo'],
        });

        if (!task) {
          throw new ForbiddenException('Task not found in your company');
        }

        if (task.assignedTo.id !== user.sub) {
          throw new ForbiddenException('You are not allowed to modify this task');
        }

        task.completed = dot.completed;

        return this.taskRepository.save(task);
    }
}
