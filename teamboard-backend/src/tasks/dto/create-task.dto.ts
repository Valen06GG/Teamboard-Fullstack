import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsUUID()
    projectId: string;
}