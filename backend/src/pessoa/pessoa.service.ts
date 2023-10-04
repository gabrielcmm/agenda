import { HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, IsNull, Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaFisica } from './entities/pessoa_fisica.entity';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { PessoaJuridica } from './entities/pessoa_juridica.entity';
import { PessoaContatos } from './entities/pessoa_contatos_entity';
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
    return pessoa;
  }

  async findOneFisica(id: string) {
    const pessoa = await this.entityManager.findOne(PessoaFisica, {
      where: [{ id_pessoa_fisica: id }],
      relations: ['pessoa.pessoa_contatos.contato'],
    });
    return pessoa;
  }

  async updatePF(id: string, updatePessoaFisica: CreatePessoaFisicaDto) {
    const pessoa = await this.entityManager.findOne(PessoaFisica, {
      where: [{ id_pessoa_fisica: id }],
      relations: ['pessoa.pessoa_contatos.contato'],
    });
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      const updatedPessoa = {
        ...pessoa.pessoa,
        ...updatePessoaFisica.pessoa,
        id_pessoa: pessoa.pessoa.id_pessoa,
      };

      const updatedPessoaFisica = {
        ...pessoa,
        ...updatePessoaFisica,
        id_pessoa_juridica: pessoa.id_pessoa_fisica,
      };
      pessoa.pessoa = updatedPessoa;
      pessoa.email = updatedPessoaFisica.email;
      pessoa.data_nascimento = updatedPessoaFisica.data_nascimento;
      pessoa.empresa = updatedPessoaFisica.empresa;
      pessoa.foto_perfil = updatedPessoaFisica.foto_perfil;
      pessoa.profissao = updatedPessoaFisica.profissao;
      pessoa.sexo = updatedPessoaFisica.sexo;

      await this.entityManager.save(pessoa);

      await this.entityManager.delete(PessoaContatos, { pessoa: IsNull() });
      return this.findOneFisica(id);
    }
  }

  async updatePJ(id: string, updatePessoaJuridicaDto: CreatePessoaJuridicaDto) {
    const pessoa = await this.entityManager.findOne(PessoaJuridica, {
      where: [{ id_pessoa_juridica: id }],
      relations: ['pessoa.pessoa_contatos.contato'],
    });
    if (!pessoa) {
      return HttpStatus.NOT_FOUND;
    } else {
      const updatedPessoa = {
        ...pessoa.pessoa,
        ...updatePessoaJuridicaDto.pessoa,
        id_pessoa: pessoa.pessoa.id_pessoa,
      };
      const updatedPessoaJuridica = {
        ...pessoa,
        ...updatePessoaJuridicaDto,
        id_pessoa_juridica: pessoa.id_pessoa_juridica,
      };

      pessoa.pessoa = updatedPessoa;
      pessoa.email = updatedPessoaJuridica.email;
      pessoa.cnpj = updatedPessoaJuridica.cnpj;
      pessoa.endereco = updatedPessoaJuridica.endereco;
      pessoa.foto_perfil = updatedPessoaJuridica.foto_perfil;
      pessoa.razao_social = updatedPessoaJuridica.razao_social;
      pessoa.responsavel = updatedPessoaJuridica.responsavel;

      await this.entityManager.save(pessoa);
    }
    await this.entityManager.delete(PessoaContatos, { pessoa: IsNull() });
    return this.findOneJuridica(id);
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
