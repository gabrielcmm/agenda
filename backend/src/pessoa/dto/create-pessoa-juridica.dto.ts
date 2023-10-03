import { Pessoa } from '../entities/pessoa.entity';

export class CreatePessoaJuridicaDto {
  pessoa: Pessoa;
  email: string;
  razao_social: string;
  cnpj: number;
  responsavel: string;
  endereco: string;
  foto_perfil?: string;
}
