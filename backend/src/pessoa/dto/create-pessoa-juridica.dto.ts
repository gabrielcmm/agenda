export class CreatePessoaJuridicaDto {
  email: string;
  razao_social: string;
  cnpj: number;
  responsavel: string;
  endereco: string;
  foto_perfil?: string;
}
