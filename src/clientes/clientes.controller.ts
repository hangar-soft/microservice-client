import { Controller } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  //@Post()
  @MessagePattern({ cmd: 'createClient' })
  create(@Payload() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'findAllClient' })
  findAll(@Payload() PaginationDto: PaginationDto) {
    return this.clientesService.findAll( PaginationDto );
  }

  //@Get(':dni')
  @MessagePattern({ cmd: 'findOneClient' })
  findOne(@Payload('dni') dni: string) {
    return this.clientesService.findOne(dni);
  }

  //@Patch(':dni')
  @MessagePattern({ cmd: 'updateClient' })
  update(@Payload() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(updateClienteDto.dni, updateClienteDto);
  }

  //@Delete(':dni')
  @MessagePattern({ cmd: 'deleteClient' })
  remove(@Payload('dni') dni: string) {
    return this.clientesService.remove(dni);
  }
}
