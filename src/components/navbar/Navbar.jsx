import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Close,
  Menu,
  DarkMode,
  LightMode,
  Search,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material'
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

  const isDark = mode === 'dark'
  const isArabic = i18n.language?.startsWith('ar')

  // ---- Reusable style tokens (kept in one place to avoid duplication) ----
  const navLinkClass = isDark
    ? 'text-sm font-medium text-slate-300 transition-colors hover:text-white'
    : 'text-sm font-medium text-[#4B5966] transition-colors hover:text-[#091E27]'

  const mobileLinkClass = isDark
    ? 'rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800'
    : 'rounded-xl px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]'

  const iconButtonClass = isDark
    ? 'flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800 hover:text-white'
    : 'flex h-9 w-9 items-center justify-center rounded-full text-[#1B3A4B] transition hover:bg-[#F4F7F9] hover:text-[#091E27]'

  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/courses', label: t('navbar.courses') },
    { to: '/shop', label: 'Shop' },
  ]

  return (
    <nav
      className={
        isDark
          ? 'border-b border-slate-800 bg-slate-950 px-4 py-4 sm:px-6 lg:px-10'
          : 'border-b border-slate-100 bg-white px-4 py-4 sm:px-6 lg:px-10'
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className={
            isDark
              ? 'shrink-0 text-lg font-bold tracking-tight text-white'
              : 'shrink-0 text-lg font-bold tracking-tight text-[#091E27]'
          }
        >
          Hexora Tech
        </Link>

        {/* Center nav links - desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          {token ? (
            <Link to="/profile" className={navLinkClass}>
              Profile
            </Link>
          ) : null}
          {token ? (
            <button type="button" onClick={handleLogout} className={navLinkClass}>
              {t('navbar.logout')}
            </button>
          ) : (
            <Link to="/login" className={navLinkClass}>
              {t('navbar.login')}
            </Link>
          )}
        </div>

        {/* Right side - desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Search (visual, matches reference design) */}
          <div
            className={
              isDark
                ? 'flex w-52 items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3.5 py-2 lg:w-64'
                : 'flex w-52 items-center gap-2 rounded-full border border-slate-200 bg-[#F5F5F5] px-3.5 py-2 lg:w-64'
            }
          >
            <input
              type="text"
              placeholder={t('navbar.search', 'What are you looking for?')}
              className={
                isDark
                  ? 'w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none'
                  : 'w-full bg-transparent text-sm text-[#1B3A4B] placeholder:text-slate-400 focus:outline-none'
              }
              aria-label="Search"
            />
            <Search fontSize="small" className={isDark ? 'text-slate-500' : 'text-slate-400'} />
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className={iconButtonClass}
            aria-label="Toggle theme"
          >
            {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </button>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={
              isDark
                ? 'rounded-full border border-slate-700 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-300 transition hover:bg-slate-800'
                : 'rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#1B3A4B] transition hover:bg-[#F4F7F9]'
            }
            aria-label="Toggle language"
          >
            {isArabic ? 'EN' : 'AR'}
          </button>

          {/* Profile icon (authenticated) */}
          {token ? (
            <Link to="/profile" className={iconButtonClass} aria-label="Profile">
              <PersonOutlineOutlined fontSize="small" />
            </Link>
          ) : null}

          {/* Cart */}
          <Link to="/cart" className={iconButtonClass} aria-label="Cart">
            <ShoppingCartOutlined fontSize="small" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={
            isDark
              ? 'flex items-center justify-center rounded-full p-2 text-slate-200 transition hover:bg-slate-800 md:hidden'
              : 'flex items-center justify-center rounded-full p-2 text-[#091E27] transition hover:bg-[#F4F7F9] md:hidden'
          }
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen ? (
        <div
          className={
            isDark
              ? 'mx-auto mt-4 flex max-w-7xl flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-lg md:hidden'
              : 'mx-auto mt-4 flex max-w-7xl flex-col gap-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-lg md:hidden'
          }
        >
          {/* Search */}
          <div
            className={
              isDark
                ? 'mb-2 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3.5 py-2.5'
                : 'mb-2 flex items-center gap-2 rounded-full border border-slate-200 bg-[#F5F5F5] px-3.5 py-2.5'
            }
          >
            <input
              type="text"
              placeholder={t('navbar.search', 'What are you looking for?')}
              className={
                isDark
                  ? 'w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none'
                  : 'w-full bg-transparent text-sm text-[#1B3A4B] placeholder:text-slate-400 focus:outline-none'
              }
              aria-label="Search"
            />
            <Search fontSize="small" className={isDark ? 'text-slate-500' : 'text-slate-400'} />
          </div>

          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={closeMenu} className={mobileLinkClass}>
              {link.label}
            </Link>
          ))}

          <Link to="/cart" onClick={closeMenu} className={mobileLinkClass}>
            {t('navbar.cart')}
          </Link>

          {token ? (
            <Link to="/profile" onClick={closeMenu} className={mobileLinkClass}>
              Profile
            </Link>
          ) : null}

          <div className={isDark ? 'my-2 h-px bg-slate-800' : 'my-2 h-px bg-slate-100'} />

          {/* Theme + language row */}
          <div className="flex items-center gap-2 px-1">
            <button
              type="button"
              onClick={() => {
                toggleMode()
              }}
              className={
                isDark
                  ? 'flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800'
                  : 'flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]'
              }
            >
              {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              type="button"
              onClick={() => {
                toggleLanguage()
              }}
              className={
                isDark
                  ? 'flex-1 rounded-xl border border-slate-700 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800'
                  : 'flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-[#1B3A4B] transition hover:bg-[#F4F7F9]'
              }
            >
              {isArabic ? 'English' : 'العربية'}
            </button>
          </div>

          <div className={isDark ? 'my-2 h-px bg-slate-800' : 'my-2 h-px bg-slate-100'} />

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-[#091E27] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#0f2d3a]"
            >
              {t('navbar.logout')}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl bg-[#091E27] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#0f2d3a]"
            >
              {t('navbar.login')}
            </Link>
          )}
        </div>
      ) : null}
    </nav>
  )
}