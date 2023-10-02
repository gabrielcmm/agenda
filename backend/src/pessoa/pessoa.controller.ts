import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Post(':id/pessoa_fisica')
  async createPessoaFisica(
    @Param('id') id: string,
    @Body() createPessoaFisicaDto: CreatePessoaFisicaDto,
  ) {
    return this.pessoaService.createPessoaFisica(createPessoaFisicaDto, +id);
  }

  @Post(':id/pessoa_juridica')
  async createPessoaJuridica(
    @Param('id') id: string,
    @Body() createPessoaJuridicaDto: CreatePessoaJuridicaDto,
  ) {
    return this.pessoaService.createPessoaJuridica(
      createPessoaJuridicaDto,
      +id,
    );
  }

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    return this.pessoaService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
