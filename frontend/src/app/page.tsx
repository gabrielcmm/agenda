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
  const [togglePessoas, setTogglePessoas] = useState(true);

  useEffect(() => {
      const fetchPessoas = async () => {
        const res = await fetch('http://localhost:3333/api/pessoa')
        const data: apiReturn = await res.json()
        setPessoaJuridica(data.juridicas);
        setPessoaFisica(data.fisicas);
      }
      fetchPessoas();
    }, [])
    
    console.log(pessoaJuridica[0]?.pessoa.nome);
  const filterByName = (pessoas: (PessoaJuridica | PessoaFisica)[]) => {
    return pessoas.filter((pessoa) => {
      return pessoa.pessoa.nome.includes('');
    })
  }

  return (
    <div>
      <h1>Teste</h1>
      <div>
        <button onClick ={ () =>  setTogglePessoas(true) }>Físicas</button>
        <button onClick ={ () =>  setTogglePessoas(false) }>Jurídicas</button>
      </div>
      <ul>
        {togglePessoas ?
         filterByName(pessoaFisica)?.map((pessoa) => (
          <li key={pessoa.pessoa.id_pessoa}>
            {pessoa.pessoa.nome}
          </li>
        )):
        (pessoaJuridica)?.map((pessoa) => (
          <li key={pessoa.id_pessoa_juridica}>
            {pessoa.responsavel}
          </li>
        ))}
      </ul>
    </div>
  )
}
