'use client'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    fetch('http://localhost:3333/api/pessoas')
      .then(response => response.json())
      .then(data => console.log(data))

  }, [])

  return (
    <div>
      <h1>Teste</h1>
    </div>
  )
}
