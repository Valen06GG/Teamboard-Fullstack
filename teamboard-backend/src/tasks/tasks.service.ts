import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async create(dto: CreateTaskDto, user: any) {
      const project = await this.taskRepository.findOne({
        where: {
            id: dto.projectId,
            company: { id: user.companyId },
        },
      });

      const task = this.taskRepository.create({
        title: dto.title,
        project: { id: dto.projectId },
        company: { id: user.companyId },
    });
        return this.taskRepository.save(task);
    }

    async findAll(user: any) {
        return this.taskRepository.find({
            where: {
                company: { id: user.companyId },
            },
            relations: ['project'],
    });
    }
}
