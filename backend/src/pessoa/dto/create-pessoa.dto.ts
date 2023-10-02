import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';
import { CreatePessoaJuridicaDto } from './create-pessoa-juridica.dto';

export class CreatePessoaDto {
  nome: string;
  pessoa_fisica?: CreatePessoaFisicaDto;
  pessoa_juridica?: CreatePessoaJuridicaDto;
}
