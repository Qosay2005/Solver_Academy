import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Close, Menu, DarkMode, LightMode } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import useAuthStore from '../../hocks/authStore'
import useThemeStore from '../../hocks/useThemeStore'

export default function Navbar() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsOpen(false)
  }

  const closeMenu = () => setIsOpen(false)

  const toggleLanguage = () => {
    const nextLanguage = i18n.language?.startsWith('ar') ? 'en' : 'ar'
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('appLang', nextLanguage)
  }

  return (
    <nav className="border-b border-slate-200 bg-[#dbe7ee] px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
        <Link to='/' className="text-base font-semibold text-[#091E27]" onClick={closeMenu}>
          Hexora Tech
        </Link>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-[#091E27] transition hover:bg-[#eef7fb] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Close /> : <Menu />}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <Link to='/' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.home')}
          </Link>
          <Link to='/courses' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.courses')}
          </Link>
          <Link to='/register' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.register')}
          </Link>
          <Link to='/shop' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            Shop
          </Link>
          <Link to='/cart' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.cart')}
          </Link>
          {token ? (
            <Link to='/profile' className="rounded-full px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
              Profile
            </Link>
          ) : null}

          <button
            type="button"
            onClick={toggleMode}
            className="rounded-full border border-[#cbd9e1] p-2 text-[#1B3A4B] transition hover:bg-[#eef7fb]"
            aria-label="Toggle theme"
          >
            {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-[#cbd9e1] px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]"
          >
            {i18n.language?.startsWith('ar') ? 'EN' : 'AR'}
          </button>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#091E27] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f2d3a]"
            >
              {t('navbar.logout')}
            </button>
          ) : (
            <Link to='/login' className="rounded-full bg-[#091E27] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f2d3a]">
              {t('navbar.login')}
            </Link>
          )}
        </div>
      </div>

      {isOpen ? (
        <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm md:hidden">
          <Link to='/' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.home')}
          </Link>
          <Link to='/courses' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.courses')}
          </Link>
          <Link to='/register' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.register')}
          </Link>
          <Link to='/shop' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            Shop
          </Link>
          <Link to='/cart' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
            {t('navbar.cart')}
          </Link>
          {token ? (
            <Link to='/profile' onClick={closeMenu} className="rounded-xl px-3 py-2 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]">
              Profile
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => {
              toggleMode()
              closeMenu()
            }}
            className="rounded-xl border border-[#cbd9e1] px-3 py-2 text-left text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]"
          >
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            type="button"
            onClick={() => {
              toggleLanguage()
              closeMenu()
            }}
            className="rounded-xl border border-[#cbd9e1] px-3 py-2 text-left text-sm font-medium text-[#1B3A4B] transition hover:bg-[#eef7fb]"
          >
            {i18n.language?.startsWith('ar') ? 'English' : 'العربية'}
          </button>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-[#091E27] px-3 py-2 text-left text-sm font-medium text-white transition hover:bg-[#0f2d3a]"
            >
              {t('navbar.logout')}
            </button>
          ) : (
            <Link to='/login' onClick={closeMenu} className="rounded-xl bg-[#091E27] px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-[#0f2d3a]">
              {t('navbar.login')}
            </Link>
          )}
        </div>
      ) : null}
    </nav>
  )
}
