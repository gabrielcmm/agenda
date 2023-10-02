import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { EntityManager, Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaFisica } from './entities/pessoa_fisica.entity';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { PessoaJuridica } from './entities/pessoa_juridica.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoa = new Pessoa(createPessoaDto);
    await this.entityManager.save(pessoa);
    return { id_pessoa: pessoa.id_pessoa };
  }

  async createPessoaFisica(
    createPessoaFisicaDto: CreatePessoaFisicaDto,
    id_pessoa: number,
  ) {
    const pessoaFisica = new PessoaFisica(createPessoaFisicaDto);
    const pessoa = await this.pessoasRepository.findOneBy({
      id_pessoa: id_pessoa,
    });
    if (pessoa) {
      pessoaFisica.pessoa = pessoa;
      await this.entityManager.save(pessoaFisica);
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }

  async createPessoaJuridica(
    createPessoaJuridica: CreatePessoaJuridicaDto,
    id_pessoa: number,
  ) {
    const pessoaJuridica = new PessoaJuridica(createPessoaJuridica);
    const pessoa = await this.pessoasRepository.findOneBy({
      id_pessoa: id_pessoa,
    });
    if (pessoa) {
      pessoaJuridica.pessoa = pessoa;
      await this.entityManager.save(pessoaJuridica);
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }

  async findAll() {
    return this.pessoasRepository.find();
  }

  async findOne(id: number) {
    return this.pessoasRepository.findOneBy({ id_pessoa: id });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoasRepository.findOneBy({ id_pessoa: id });
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      pessoa.ativo = updatePessoaDto.ativo;
      await this.entityManager.save(pessoa);
      return {
        message: `${pessoa.nome} atualizada com sucesso!, ele está : ${pessoa.ativo}`,
      };
    }
  }

  async remove(id: number) {
    return this.pessoasRepository.delete({ id_pessoa: id });
  }
}
