import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/products', label: 'Produk' },
    { to: '/service', label: 'Layanan' },
    { to: '/about', label: 'Tentang' },
    { to: '/contact', label: 'Kontak' },
]

export default function Header() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const { dark, toggle } = useTheme()
    const { session } = useAuth()

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-7xl">
                <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <img src="/logo.png" alt="Karya Mandiri Dental Logo" className="h-[36px] w-[36px] rounded-full dark:invert dark:brightness-0" />
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Karya Mandiri Dental</h2>
                </Link>

                <div className="hidden md:flex flex-1 justify-end gap-6 items-center">
                    <nav className="flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.to
                                    ? 'text-primary font-bold'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={toggle}
                        className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        <span className="material-symbols-outlined text-[20px]">{dark ? 'light_mode' : 'dark_mode'}</span>
                    </button>

                    <a
                        href="https://wa.me/6281511249424"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-sm shadow-primary/30"
                    >
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        <span className="truncate">WhatsApp</span>
                    </a>

                    {session && (
                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <Link to="/admin" className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Admin</Link>
                            <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg ml-2">Keluar</button>
                        </div>
                    )}
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggle}
                        className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        aria-label="Toggle dark mode"
                    >
                        <span className="material-symbols-outlined text-[20px]">{dark ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    <button className="text-slate-900 dark:text-white p-2" onClick={() => setOpen(!open)}>
                        <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-4 transition-colors">
                    <nav className="flex flex-col gap-1 py-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to
                                    ? 'text-primary bg-primary/5 font-bold'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <a
                        href="https://wa.me/6281511249424"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold w-full"
                    >
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        WhatsApp
                    </a>

                    {session && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                            <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 text-center">Masuk ke Admin Panel</Link>
                            <button onClick={() => { handleLogout(); setOpen(false); }} className="px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 text-center">Keluar (Logout)</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
