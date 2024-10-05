import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/CreateProjectDto';
import { UpdateProjectDto } from './dto/UpdateProjectDto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Retrieve project by name' })
  @ApiResponse({ status: 200, description: 'Returns the project.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async findByName(@Param('name') name: string) {
    return this.projectService.findByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async updateProject(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProject(updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({ status: 204, description: 'Project deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
