import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { useSEO } from '../hooks/useSEO'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useSettings } from '../context/SettingsContext'

export default function Products() {
    useSEO({ title: 'Katalog Produk', description: 'Temukan dental unit berkualitas, refurbished dan second original dengan harga terbaik.' })

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { settings } = useSettings()

    const heroBg = settings?.products_hero || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwSJLqsGipvHZI6YI2rfEMj1rjsUKm59C7hPdw3yfSr_auu46cOrnU9m3rczTbS965C4kOiote1lMpXG2jBWgN9buW64tr1QrAxE0NzBFxd4YyRaznGe_pR1cuSKGQQcHyenH-E2KZqOV9RVWjwn63i2dBZPNYmSMOy-5dhbzEyVBCa7q3M3lSFlTO7ZeD_ep5nUejtJijm7bdRonUajdUoUyMq001fJSin0Ge2BMOdBqWpTwk4tEiZC5HWntf44nW7ReqHX6Xen6Q'

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    // Filter states
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('Terbaru')
    const [filters, setFilters] = useState({
        conditionRefurbished: true,
        conditionSecond: true,
        conditionBaru: true,
        categoryFix: true,
        categoryPortable: true,
    })
    const [maxPrice, setMaxPrice] = useState(100) // Representing millions

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error && data) {
                setProducts(data)
                setFilteredProducts(data)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [])

    // Apply filters and sorting
    useEffect(() => {
        let result = [...products]

        // 1. Search Term
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerSearch) ||
                p.brand.toLowerCase().includes(lowerSearch) ||
                (p.description && p.description.toLowerCase().includes(lowerSearch))
            )
        }

        // 2. Filters
        result = result.filter(p => {
            const matchCond = (p.condition === 'Refurbished' && filters.conditionRefurbished) ||
                (p.condition === 'Second Original' && filters.conditionSecond) ||
                (p.condition === 'Baru' && filters.conditionBaru)

            const matchCat = (p.category === 'Dental Unit (Fix)' && filters.categoryFix) ||
                (p.category === 'Portable Unit' && filters.categoryPortable)

            const itemPrice = p.price || 0
            const matchPrice = itemPrice <= (maxPrice * 1000000)

            return matchCond && matchCat && matchPrice
        })

        // 3. Sorting
        if (sortBy === 'Harga Terendah') {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'Harga Tertinggi') {
            result.sort((a, b) => b.price - a.price)
        } else {
            // Terbaru (default order from DB)
            result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }

        setFilteredProducts(result)
        setCurrentPage(1) // Reset ke halaman 1 setiap kali filter berubah
    }, [products, searchTerm, filters, sortBy, maxPrice])

    const handleFilterChange = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const resetFilters = () => {
        setSearchTerm('')
        setSortBy('Terbaru')
        setFilters({
            conditionRefurbished: true,
            conditionSecond: true,
            conditionBaru: true,
            categoryFix: true,
            categoryPortable: true,
        })
        setMaxPrice(100)
    }

    // Formatting currency
    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka)
    }

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo({ top: 300, behavior: 'smooth' })
        }
    }

    const getBadgeStyle = (condition) => {
        if (condition === 'Baru') return 'bg-primary text-white border-primary/20'
        if (condition === 'Second Original') return 'bg-amber-100 text-amber-800 border-amber-200'
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }

    return (
        <>
            {/* Hero */}
            <section className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
                <div className="rounded-xl overflow-hidden relative">
                    <div className="flex min-h-[320px] md:min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-6 text-center"
                        style={{ backgroundImage: `linear-gradient(rgba(19, 109, 236, 0.85), rgba(16, 24, 34, 0.7)), url('${heroBg}')` }}>
                        <span className="text-white/80 uppercase tracking-widest text-xs font-bold">Kualitas Terbaik</span>
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">KATALOG DENTAL UNIT</h1>
                        <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto">
                            Temukan unit dental berkualitas, refurbished dan second original untuk meningkatkan standar praktik profesional Anda.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pb-16 flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-24">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Filter</h3>
                        <button onClick={resetFilters} className="text-sm text-primary font-medium hover:underline">Reset</button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
                            placeholder="Cari merk, model..."
                            type="text"
                        />
                    </div>
                    <hr className="border-slate-100 dark:border-slate-700" />
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-900 dark:text-white text-sm font-semibold">Batas Harga</p>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{maxPrice === 100 ? 'Semua Harga' : `≤ Rp ${maxPrice} Jt`}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            step="5"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1 mt-1">
                            <span>Rp 5 Jt</span>
                            <span>Rp 100+ Jt</span>
                        </div>
                    </div>
                    <hr className="border-slate-100" />
                    <details className="group" open>
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
                            <p className="text-slate-900 dark:text-white text-sm font-semibold">Kondisi Unit</p>
                            <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180 text-[20px]">expand_more</span>
                        </summary>
                        <div className="flex flex-col gap-2.5 pt-2 pb-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input checked={filters.conditionRefurbished} onChange={() => handleFilterChange('conditionRefurbished')} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">Refurbished</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input checked={filters.conditionSecond} onChange={() => handleFilterChange('conditionSecond')} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">Second Original</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input checked={filters.conditionBaru} onChange={() => handleFilterChange('conditionBaru')} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">Baru</span>
                            </label>
                        </div>
                    </details>
                    <hr className="border-slate-100" />
                    <details className="group" open>
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
                            <p className="text-slate-900 dark:text-white text-sm font-semibold">Tipe Unit</p>
                            <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180 text-[20px]">expand_more</span>
                        </summary>
                        <div className="flex flex-col gap-2.5 pt-2 pb-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input checked={filters.categoryFix} onChange={() => handleFilterChange('categoryFix')} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">Dental Unit (Fix)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input checked={filters.categoryPortable} onChange={() => handleFilterChange('categoryPortable')} className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">Portable Unit</span>
                            </label>
                        </div>
                    </details>
                    <hr className="border-slate-100" />
                    <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
                            <p className="text-slate-900 dark:text-white text-sm font-semibold">Merk / Brand</p>
                            <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180 text-[20px]">expand_more</span>
                        </summary>
                        <div className="flex flex-col gap-2.5 pt-2 pb-1">
                            {['Gnatus', 'Belmont', 'Osada', 'Yoshida', 'Morita'].map(b => (
                                <label key={b} className="flex items-center gap-3 cursor-pointer">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                    <span className="text-slate-600 dark:text-slate-300 text-sm">{b}</span>
                                </label>
                            ))}
                        </div>
                    </details>
                </aside>

                {/* Product Grid */}
                <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <p className="text-slate-500 dark:text-slate-400 text-sm"><span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> produk ditemukan</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Urutkan:</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary">
                                <option>Terbaru</option>
                                <option>Harga Terendah</option>
                                <option>Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex justify-center w-full col-span-1 md:col-span-2 lg:col-span-3">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.length === 0 ? (
                                <div className="col-span-full py-16 text-center">
                                    <span className="material-symbols-outlined text-[64px] text-slate-300 mb-4">search_off</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tidak ada produk ditemukan</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto mt-2">Coba gunakan kata kunci pencarian yang lain atau ubah filter di sebelah kiri.</p>
                                    <button onClick={resetFilters} className="mt-6 text-primary font-bold hover:underline">Reset Semua Filter</button>
                                </div>
                            ) : (
                                paginatedProducts.map(p => (
                                    <div key={p.id} className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                            <div className={`absolute top-3 left-3 z-10 ${getBadgeStyle(p.condition)} text-xs font-bold px-2.5 py-1 rounded-full border`}>{p.condition}</div>
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.image_url} alt={p.name} />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1 gap-1">
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{p.brand}</span>
                                            <h3 className="text-slate-900 dark:text-white text-lg font-bold truncate">{p.name}</h3>
                                            <p className="text-primary text-xl font-bold mt-1">{formatRp(p.price)}</p>
                                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-3 mt-auto">
                                                <a href={`https://wa.me/6281511249424?text=Halo%20Karya%20Mandiri%20Dental,%20saya%20tertarik%20dengan%20produk%20${p.name}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg text-sm font-bold transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">chat</span>Tanya
                                                </a>
                                                <Link to={`/products/${p.id}`} className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary py-2 rounded-lg text-sm font-medium transition-colors bg-transparent">Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center gap-1">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${currentPage === page ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                })}

                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-50"><span className="material-symbols-outlined">chevron_right</span></button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
