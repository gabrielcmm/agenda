import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity()
export class PessoaJuridica {
  @PrimaryGeneratedColumn('uuid')
  id_pessoa_juridica: string;
  @Column()
  email: string;
  @Column()
  razao_social: string;
  @Column({ type: 'int8' })
  cnpj: number;
  @Column()
  responsavel: string;
  @Column()
  endereco: string;
  @Column({ nullable: true })
  foto_perfil: string;

  @OneToOne(() => Pessoa, { cascade: true })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;

  constructor(partial: Partial<PessoaJuridica>) {
    Object.assign(this, partial);
  }
}
