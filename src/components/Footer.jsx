import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()
    const [clickCount, setClickCount] = useState(0)

    useEffect(() => {
        let timer;
        if (clickCount > 0 && clickCount < 5) {
            timer = setTimeout(() => {
                setClickCount(0)
            }, 1000)
        } else if (clickCount >= 5) {
            setClickCount(0)
            navigate('/login')
        }
        return () => clearTimeout(timer)
    }, [clickCount, navigate])
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-16 pb-8 md:px-10 transition-colors duration-300">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                            <img src="/logo.png" alt="Karya Mandiri Dental Logo" className="h-[28px] w-[28px] rounded-full dark:invert dark:brightness-0" />
                            <h2 className="text-base font-bold">Karya Mandiri Dental</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            Partner terpercaya untuk segala kebutuhan peralatan dokter gigi anda. Melayani seluruh wilayah Jabodetabek dan sekitarnya.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Layanan</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" to="/service">Service Dental Unit</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/service">Refurbish &amp; Cat Ulang</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/products">Jual Beli Unit Bekas</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/service">Instalasi Alat Baru</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Perusahaan</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" to="/about">Tentang Kami</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/contact">Kontak</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Kontak</h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
                                <span>Jl. Raya Pondok Benda No. 26 RT 05 RW 02, Kec. Jatiasih, Kota Bekasi, Jawa Barat</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">call</span>
                                <span>+62 815-1124-9424</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">mail</span>
                                <span>karyamandiridental@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p
                        className="text-sm text-slate-400 select-none cursor-default"
                        onClick={() => setClickCount(prev => prev + 1)}
                    >
                        © 2024 Karya Mandiri Dental. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-primary transition-colors" href="https://www.instagram.com/karya.mandiridental/" target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Instagram</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
