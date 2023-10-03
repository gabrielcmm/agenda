import { Pessoa } from '../entities/pessoa.entity';

export class CreatePessoaFisicaDto {
  pessoa: Pessoa;
  email: string;
  data_nascimento: Date;
  sexo: string;
  profissao?: string;
  empresa?: string;
  foto_perfil?: string;
}
