import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../hocks/authStore"

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <nav className="flex flex-wrap items-center gap-3 p-4">
     <Link to='/'>Home</Link>
     <Link to='/courses'>Courses</Link>
     <Link to='/register'>Register</Link>
     <Link to='/cart'>Cart</Link>

     {token ? (
       <button onClick={handleLogout} className="rounded bg-slate-800 px-3 py-1 text-sm text-white">
         Logout
       </button>
     ) : (
       <Link to='/login'>Login</Link>
     )}
  </nav>
}
