import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Query,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../auth/auth.guard';
import { Request } from 'express';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('clientName') clientName: string,
  ) {
    return await this.usersService.findAllPaginated({
      page: Number(page),
      perPage: Number(perPage),
      clientName,
    });
  }

  @UseGuards(AdminGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() body: { token: string }, @Req() req: Request) {
    return await this.usersService.saveToken(body.token, req.user.id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
