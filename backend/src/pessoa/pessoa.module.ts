import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { PessoaFisica } from './entities/pessoa_fisica.entity';
import { PessoaJuridica } from './entities/pessoa_juridica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa, PessoaFisica, PessoaJuridica])],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
