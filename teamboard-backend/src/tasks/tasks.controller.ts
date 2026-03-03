import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dot: UpdateTaskStatusDto,
        @Request() req,
    ) {
        return this.tasksService.updateStatus(id, dot, req.user);
    }
}
