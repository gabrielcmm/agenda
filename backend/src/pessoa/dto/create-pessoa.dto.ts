import { CreateContatoDto } from './create-contato-dto';
import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './create-pessoa-juridica.dto';

export class CreatePessoaDto {
  nome: string;
  contato: CreateContatoDto[];
  pessoa_fisica?: CreatePessoaFisicaDto;
  pessoa_juridica?: CreatePessoaJuridicaDto;
}
