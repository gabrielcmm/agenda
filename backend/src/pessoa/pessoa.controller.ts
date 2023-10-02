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

  @Post('/pessoa_fisica')
  async createPF(@Body() createPessoaFisica: CreatePessoaFisicaDto) {
    return this.pessoaService.createPF(createPessoaFisica);
  }

  @Post('/pessoa_juridica')
  async createPJ(@Body() createPessoaJuridica: CreatePessoaJuridicaDto) {
    return this.pessoaService.createPJ(createPessoaJuridica);
  }

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get('/pessoa_juridica')
  async findAllJuridica() {
    return this.pessoaService.findAllJuridica();
  }

  @Get('/pessoa_fisica')
  async findAllFisica() {
    return this.pessoaService.findAllFisica();
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
