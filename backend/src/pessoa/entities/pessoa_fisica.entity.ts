import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity()
export class PessoaFisica {
  @PrimaryGeneratedColumn('uuid')
  id_pessoa_fisica: string;
  @Column()
  email: string;
  @Column()
  data_nascimento: Date;
  @Column({ length: 1 })
  sexo: string;
  @Column({ nullable: true })
  profissao: string;
  @Column({ nullable: true })
  empresa: string;
  @Column({ nullable: true })
  foto_perfil: string;

  @OneToOne(() => Pessoa, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;

  constructor(partial: Partial<PessoaFisica>) {
    Object.assign(this, partial);
  }
}
