'use client'
import { useEffect, useState } from 'react'
import { PessoaFisica, PessoaJuridica, Pessoas } from '../../types'

type apiReturn = {
  fisicas: PessoaFisica[];
  juridicas: PessoaJuridica[];
}
export default function Home() {
  const [pessoaFisica, setPessoaFisica] = useState<PessoaFisica[]>([]);
  const [pessoaJuridica, setPessoaJuridica] = useState<PessoaJuridica[]>([]);
  useEffect(() => {
      const fetchPessoas = async () => {
        const res = await fetch('http://localhost:3333/api/pessoa')
        const data: apiReturn = await res.json()
        console.log(data.juridicas);
        setPessoaFisica(data.fisicas);
        setPessoaJuridica(data.juridicas);
      }
      fetchPessoas();
  }, [])

  return (
    <div>
      <h1>Teste</h1>
      <ul>
        {pessoaFisica?.map((pessoa) => (
          <li key={pessoa.pessoa.id_pessoa}>
            {pessoa.pessoa.nome}
          </li>
        ))}
        {pessoaJuridica?.map((pessoa) => (
          <li key={pessoa.id_pessoa_juridica}>
            {pessoa.razao_social}
          </li>
        ))}
      </ul>
    </div>
  )
}
