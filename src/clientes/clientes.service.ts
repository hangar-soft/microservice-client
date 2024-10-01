import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ClientesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ClientsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createClienteDto: CreateClienteDto) {
    return this.client.create({
      data: createClienteDto
    })
  }

  async findAll(PaginationDto: PaginationDto) {
    const { page, limit } = PaginationDto;
    const countRows = await this.client.count();
    const countPages = Math.ceil( countRows / limit );

    return {
      data: await this.client.findMany({
        where: { status: true },
        skip: (page - 1) * limit,
        take: limit
      }),
      meta_data: {
        count_rows: countRows,
        current_page: page,
        total_pages: countPages,
      }
    }
  }

  async findOne(dni: string) {
    const result = await this.client.findFirst({
      where: { dni, status: true }
    });

    if ( !result) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Client with dni ${dni} not found`
      });
    }

    return result;
  }

  async update(dni: string, updateClienteDto: UpdateClienteDto) {
    const { dni: __, ...data } = updateClienteDto; 
    await this.findOne(dni);
    return this.client.update({
      where: { dni },
      data : data,
    })
  }

  async remove(dni: string) {
    await this.findOne(dni);
    return this.client.update({
      where: { dni },
      data: {
        status: false,
      }
    })
  }
}
