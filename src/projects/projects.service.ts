import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/companies.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) {}

  async create(data: any, companyId: string) {
    const project = this.projectsRepository.create({
        ...data,
        company: { id: companyId } as Company,
    });

    return this.projectsRepository.save(project);
  }
  
  async findAll(companyId: string) {
    return this.projectsRepository.find({
        where: {
            company: { id: companyId },
        },
    });
  }
}
