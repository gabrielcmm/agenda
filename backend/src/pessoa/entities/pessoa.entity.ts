import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn('increment')
  id_pessoa: number;
  @Column()
  nome: string;
  @Column({ default: true })
  ativo: boolean;
  @Column({ type: 'timestamptz' })
  data_criacao: Timestamp;

  constructor(partial: Partial<Pessoa>) {
    Object.assign(this, partial);
  }
}
