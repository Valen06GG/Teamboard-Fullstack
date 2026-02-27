import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateTaskDto, @Request() req) {
        return this.tasksService.create(dto, req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user);
    }
}
