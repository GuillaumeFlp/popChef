import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Res() res: Response, @Body() productDto: ProductDto) {
    const result: ProductDto = await this.productsService.create(productDto);
    res.status(HttpStatus.CREATED).send(result);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result: ProductEntity[] = await this.productsService.findAll();
    res.status(HttpStatus.OK).send(result);
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    const result: ProductEntity = await this.productsService.findOne(id);
    res.status(HttpStatus.OK).send(result);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() userDto: ProductDto,
  ) {
    await this.productsService.update(id, userDto);
    res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number) {
    await this.productsService.delete(id);
    res.status(HttpStatus.OK).send();
  }
}
