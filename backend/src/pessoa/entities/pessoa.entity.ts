import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { PessoaContatos } from './pessoa_contatos_entity';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn('increment')
  id_pessoa: number;
  @Column()
  nome: string;
  @Column({ default: true })
  ativo: boolean;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Timestamp;

  @OneToMany(() => PessoaContatos, (pc) => pc.pessoa, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  pessoa_contatos: PessoaContatos[];

  constructor(partial: Partial<Pessoa>) {
    Object.assign(this, partial);
  }
}
