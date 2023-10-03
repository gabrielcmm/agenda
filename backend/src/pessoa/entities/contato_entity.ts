import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PessoaContatos } from './pessoa_contatos_entity';

@Entity()
export class Contato {
  @PrimaryGeneratedColumn('increment')
  id_contato: number;
  @Column()
  descricao: string;

  @OneToMany(() => Contato, (c) => c.pessoa_contatos)
  pessoa_contatos: PessoaContatos[];

  constructor(partial: Partial<Contato>) {
    Object.assign(this, partial);
  }
}
