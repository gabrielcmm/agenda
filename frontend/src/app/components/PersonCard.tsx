import React from 'react'
import { PessoaFisica, PessoaJuridica } from '../../../types'

type Pessoa = (PessoaFisica | PessoaJuridica)

const PersonCard = () => {
  return (
    <div>PersonCard</div>
  )
}

export default PersonCard