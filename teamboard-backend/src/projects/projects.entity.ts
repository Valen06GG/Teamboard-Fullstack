import { Company } from "src/companies/companies.entity";
import { Task } from "src/tasks/tasks.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Company, (company) => company.projects)
    company: Company;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
}