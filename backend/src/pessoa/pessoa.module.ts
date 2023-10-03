import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { PessoaFisica } from './entities/pessoa_fisica.entity';
import { PessoaJuridica } from './entities/pessoa_juridica.entity';
import { Contato } from './entities/contato_entity';
import { PessoaContatos } from './entities/pessoa_contatos_entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pessoa,
      PessoaFisica,
      PessoaJuridica,
      Contato,
      PessoaContatos,
    ]),
  ],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
