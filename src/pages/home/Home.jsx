import React from 'react'
import Catogories from '../../components/catogories/Catogories'
import GetProducts from '../../components/getProducts/getProducts'
import Hero from '../../components/hero_section/Hero'
export default function Home() {
  return (
    <div className="space-y-8 bg-[#FFFFFF]">
      <Hero/>
      <Catogories />
      <GetProducts />
    </div>
  )
}
