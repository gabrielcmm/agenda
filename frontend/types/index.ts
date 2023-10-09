export type Contato = {
  id_pessooa_contato: number;
  descricao: string;
  contato: {
    id_contato: number;
    descricao: string;
  }
}

export type Pessoa = {
  id_pessoa: number;
  nome: string;
  ativo: boolean;
  data_criacao: Date;
  pessoa_contatos: Contato[];
}

export type PessoaFisica = {
  pessoa: Pessoa;
  id_pessoa_fisica: string;
  email: string;
  data_nascimento: Date;
  sexo: "M" | "F";
  profissao: string | null;
  empresa: string | null;
  foto_perfil: string | null;
}

export type PessoaJuridica = {
  pessoa: Pessoa;
  id_pessoa_juridica: string;
  email: string;
  razao_social: string;
  cnpj: string;
  responsavel: string;
  endereco: string;
  foto_perfil: string | null;
}

export type Pessoas = (PessoaFisica | PessoaJuridica)[];
