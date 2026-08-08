import React from 'react';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useThemeStore from '../../hocks/useThemeStore';

export default function Footer() {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';

  return (
    <footer className={isDark ? 'border-t border-slate-700 bg-slate-900 px-4 py-8 sm:px-6 lg:px-8' : 'border-t border-slate-200 bg-[#dbe7ee] px-4 py-8 sm:px-6 lg:px-8'}>
      <div className={isDark ? 'mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-slate-700 bg-slate-800 p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4' : 'mx-auto grid max-w-7xl gap-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4'}>
        <div className="space-y-3">
          <h3 className={isDark ? 'text-lg font-semibold text-slate-100' : 'text-lg font-semibold text-[#091E27]'}>Hexora Tech</h3>
          <p className={isDark ? 'text-sm leading-6 text-slate-300' : 'text-sm leading-6 text-slate-600'}>Modern learning, premium products, and a seamless shopping experience for every learner.</p>
        </div>

        <div className="space-y-3">
          <h4 className={isDark ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Quick Links</h4>
          <div className={isDark ? 'flex flex-col gap-2 text-sm text-slate-300' : 'flex flex-col gap-2 text-sm text-slate-600'}>
            <Link to="/" className={isDark ? 'hover:text-slate-100' : 'hover:text-[#091E27]'}>Home</Link>
            <Link to="/shop" className={isDark ? 'hover:text-slate-100' : 'hover:text-[#091E27]'}>Shop</Link>
            <Link to="/cart" className={isDark ? 'hover:text-slate-100' : 'hover:text-[#091E27]'}>Cart</Link>
            <Link to="/profile" className={isDark ? 'hover:text-slate-100' : 'hover:text-[#091E27]'}>Profile</Link>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={isDark ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Contact</h4>
          <div className={isDark ? 'space-y-2 text-sm text-slate-300' : 'space-y-2 text-sm text-slate-600'}>
            <p>hello@hexoratech.com</p>
            <p>+20 100 123 4567</p>
            <p>123 Learning Street, Cairo</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className={isDark ? 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-400' : 'text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'}>Follow Us</h4>
          <div className="flex gap-3">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className={isDark ? 'rounded-full bg-slate-700 p-2 text-slate-100' : 'rounded-full bg-[#eef7fb] p-2 text-[#091E27]'}>
              <Facebook fontSize="small" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className={isDark ? 'rounded-full bg-slate-700 p-2 text-slate-100' : 'rounded-full bg-[#eef7fb] p-2 text-[#091E27]'}>
              <Instagram fontSize="small" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className={isDark ? 'rounded-full bg-slate-700 p-2 text-slate-100' : 'rounded-full bg-[#eef7fb] p-2 text-[#091E27]'}>
              <Twitter fontSize="small" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className={isDark ? 'rounded-full bg-slate-700 p-2 text-slate-100' : 'rounded-full bg-[#eef7fb] p-2 text-[#091E27]'}>
              <LinkedIn fontSize="small" />
            </a>
          </div>
          <p className={isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>© 2026 Hexora Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
