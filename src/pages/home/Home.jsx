import React from 'react'
import Catogories from '../../components/catogories/Catogories'
import GetProducts from '../../components/getProducts/getProducts'

export default function Home() {
  return (
    <div className="space-y-8">
      <Catogories />
      <GetProducts />
    </div>
  )
}
