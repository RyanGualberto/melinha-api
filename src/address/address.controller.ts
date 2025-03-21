import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Req() req: Express.Request,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(createAddressDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: Express.Request) {
    return this.addressService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: Express.Request, @Param('id') id: string) {
    return this.addressService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Req() req: Express.Request,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, req.user.id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Req() req: Express.Request, @Param('id') id: string) {
    return this.addressService.remove(id, req.user.id);
  }
}
