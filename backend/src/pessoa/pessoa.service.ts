import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { EntityManager, Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
