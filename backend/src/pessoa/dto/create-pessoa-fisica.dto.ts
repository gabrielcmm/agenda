export class CreatePessoaFisicaDto {
  email: string;
  data_nascimento: Date;
  sexo: string;
  profissao?: string;
  empresa?: string;
  foto_perfil?: string;
}
