import { Company } from "src/companies/companies.entity";
import { Project } from "src/projects/projects.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        default: false,
    })
    completed: boolean;

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project;

    @ManyToOne(() => Company)
    company: Company;
}