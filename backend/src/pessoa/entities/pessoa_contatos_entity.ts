import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { Contato } from './contato_entity';

@Entity('pessoa_contatos')
export class PessoaContatos {
  @PrimaryGeneratedColumn('increment')
  id_pessoa_contatos: number;

  @Column()
  descricao: string;

  @ManyToOne(() => Pessoa, (p) => p.pessoa_contatos, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  pessoa: Pessoa;

  @ManyToOne(() => Contato, (c) => c.pessoa_contatos, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  contato: Contato;
}
