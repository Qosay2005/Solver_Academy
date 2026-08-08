import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import useThemeStore from '../hocks/useThemeStore'

export default function MainLayout() {
  const mode = useThemeStore((state) => state.mode)
  const isDark = mode === 'dark'

  return (
    <div className={isDark ? 'min-h-screen bg-slate-900 text-slate-100' : 'min-h-screen bg-[#dbe7ee] text-[#091E27]'}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
