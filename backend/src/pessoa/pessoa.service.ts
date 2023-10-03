import { HttpStatus, Injectable } from '@nestjs/common';
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

  async createPF(createPessoaFisica: CreatePessoaFisicaDto) {
    const pessoaFisica = new PessoaFisica(createPessoaFisica);
    await this.entityManager.save(pessoaFisica);
    return pessoaFisica;
  }

  async createPJ(createPessoaJuridica: CreatePessoaJuridicaDto) {
    const pessoaJuridica = new PessoaJuridica(createPessoaJuridica);
    await this.entityManager.save(pessoaJuridica);
    return pessoaJuridica;
  }

  async findAllPessoas() {
    const fisicas = await this.findAllFisica();
    const juridicas = await this.findAllJuridica();

    return { fisicas, juridicas };
  }

  async findAllJuridica() {
    return this.entityManager.find(PessoaJuridica, {
      relations: ['pessoa.pessoa_contatos.contato'],
    });
  }

  async findAllFisica() {
    return this.entityManager.find(PessoaFisica, {
      relations: ['pessoa.pessoa_contatos.contato'],
    });
  }

  async findOneJuridica(id: string) {
    const pessoa = await this.entityManager.findOne(PessoaJuridica, {
      where: [{ id_pessoa_juridica: id }],
      relations: ['pessoa.pessoa_contatos.contato'],
    });
    console.log(pessoa);
    return pessoa;
  }

  async findOneFisica(id: string) {
    const pessoa = await this.entityManager.findOne(PessoaFisica, {
      where: [{ id_pessoa_fisica: id }],
      relations: ['pessoa.pessoa_contatos.contato'],
    });
    console.log(pessoa);
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.pessoasRepository.findOneBy({ id_pessoa: id });
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      await this.entityManager.save(updatePessoaDto);
      return {
        message: `${pessoa.nome} atualizada com sucesso!, ele está : ${pessoa.ativo}`,
      };
    }
  }

  async updatePF(id: string, updatePessoaFisicaDto: CreatePessoaFisicaDto) {
    const pessoa = await this.findOneFisica(id);
    console.log(pessoa);
    console.log(updatePessoaFisicaDto);
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      await this.entityManager.update(PessoaFisica, id, {
        ...pessoa,
        ...updatePessoaFisicaDto,
      });
      return {
        message: `${pessoa.pessoa.nome} atualizada com sucesso! \n ${updatePessoaFisicaDto}`,
      };
    }
  }

  async updatePJ(id: string, updatePessoaJuridicaDto: CreatePessoaJuridicaDto) {
    const pessoa = await this.entityManager.findOneBy(PessoaJuridica, {
      id_pessoa_juridica: id,
    });
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      console.log(pessoa);
      await this.entityManager.update(
        PessoaJuridica,
        id,
        updatePessoaJuridicaDto,
      );
    }
  }

  async removePF(id: string) {
    return this.entityManager.delete(PessoaFisica, { id_pessoa_fisica: id });
  }

  async removePJ(id: string) {
    return this.entityManager.delete(PessoaJuridica, {
      id_pessoa_juridica: id,
    });
  }

  async removePessoa(id: number) {
    return this.entityManager.delete(Pessoa, { id_pessoa: id });
  }
}
