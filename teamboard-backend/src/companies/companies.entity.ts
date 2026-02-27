import { Project } from "src/projects/projects.entity";
import { Users } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Users, (user) => user.company)
    users: Users[];

    @OneToMany(() => Project, (project) => project.company)
    projects: Project[];
}