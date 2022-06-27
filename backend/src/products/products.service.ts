import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private usersRepository: Repository<ProductEntity>,
  ) {}

  async create(userDto: ProductDto): Promise<ProductEntity> {
    const userEntity: ProductEntity = ProductEntity.create();
    const { name, description, price } = userDto;
    userEntity.name = name;
    userEntity.description = description;
    userEntity.price = price;
    await ProductEntity.save(userEntity);
    return userEntity;
  }

  findAll(): Promise<ProductEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, userDto: ProductDto): Promise<void> {
    await this.usersRepository.update(id, userDto);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
