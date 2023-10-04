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
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post('/pessoa_fisica')
  async createPF(@Body() createPessoaFisica: CreatePessoaFisicaDto) {
    return this.pessoaService.createPF(createPessoaFisica);
  }

  @Post('/pessoa_juridica')
  async createPJ(@Body() createPessoaJuridica: CreatePessoaJuridicaDto) {
    return this.pessoaService.createPJ(createPessoaJuridica);
  }

  @Get()
  async findAllPessoas() {
    return this.pessoaService.findAllPessoas();
  }

  @Get('/pessoa_juridica')
  async findAllJuridica() {
    return this.pessoaService.findAllJuridica();
  }

  @Get('/pessoa_fisica')
  async findAllFisica() {
    return this.pessoaService.findAllFisica();
  }

  @Get('/pessoa_juridica/:id')
  async findOneJuridica(@Param('id') id: string) {
    return this.pessoaService.findOneJuridica(id);
  }

  @Get('/pessoa_fisica/:id')
  async findOneFisica(@Param('id') id: string) {
    return this.pessoaService.findOneFisica(id);
  }

  @Patch('/pessoa_juridica/:id')
  async updatePJ(
    @Param('id') id: string,
    @Body() updatePessoaJuridicaDto: CreatePessoaJuridicaDto,
  ) {
    return this.pessoaService.updatePJ(id, updatePessoaJuridicaDto);
  }

  @Patch('/pessoa_fisica/:id')
  async updatePF(
    @Param('id') id: string,
    @Body() updatePessoaFisicaDto: CreatePessoaFisicaDto,
  ) {
    return this.pessoaService.updatePF(id, updatePessoaFisicaDto);
  }

  @Delete('/pessoa_fisica/:id')
  async removePF(@Param('id') id: string) {
    return this.pessoaService.removePF(id);
  }
  @Delete('/pessoa_juridica/:id')
  async removePJ(@Param('id') id: string) {
    return this.pessoaService.removePJ(id);
  }

  @Delete(':id')
  async removePessoa(@Param('id') id: string) {
    return this.pessoaService.removePessoa(+id);
  }
}
