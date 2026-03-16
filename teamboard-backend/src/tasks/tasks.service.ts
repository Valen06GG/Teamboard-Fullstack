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
      const project = await this.projectRepository.findOne({
        where: {
            id: dto.projectId,
            company: { id: user.companyId },
        },
      });

      if (!project) {
        throw new ForbiddenException('Proyecto no encontrado en su empresa');
      }

      let assignedUserId: string | undefined;

      if (user.role === 'admin') {
        assignedUserId = dto.assignedToId;
      } else {
        assignedUserId = user.sub;
      }

      const task = this.taskRepository.create({
        title: dto.title,
        assignedTo: assignedUserId ? { id: dto.assignedToId } : undefined,
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
          throw new ForbiddenException('Tarea no encontrada en su empresa');
        }

        if (task.assignedTo.id !== user.sub) {
          throw new ForbiddenException('No tienes permiso para modificar esta tarea.');
        }

        task.completed = dot.completed;

        return this.taskRepository.save(task);
    }
}
