import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(productDto: ProductDto): Promise<ProductEntity> {
    const userEntity: ProductEntity = ProductEntity.create();
    const { name, description, price } = productDto;
    userEntity.name = name;
    userEntity.description = description;
    userEntity.price = price;
    await ProductEntity.save(userEntity);
    return userEntity;
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, productDto: ProductDto): Promise<void> {
    await this.productRepository.update(id, productDto);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
