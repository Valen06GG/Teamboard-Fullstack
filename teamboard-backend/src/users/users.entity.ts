import { Company } from "src/companies/companies.entity";
import { Task } from "src/tasks/tasks.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member',
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role: UserRole;

    @ManyToOne(() => Company, (company) => company.users)
    company: Company;

    @ManyToOne(() => Task, (task) => task.assignedTo)
    tasks: Task[];
}

