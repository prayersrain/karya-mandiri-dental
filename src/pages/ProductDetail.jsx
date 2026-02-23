import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { supabase } from '../lib/supabase'

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedImg, setSelectedImg] = useState(0)
    const [activeTab, setActiveTab] = useState('features')

    // Lightbox states
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !data) {
                console.error("Error fetching product:", error)
                navigate('/products') // Redirect if not found
            } else {
                setProduct(data)

                // Fetch related products (same category, exclude current)
                const { data: relatedData } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', data.category)
                    .neq('id', data.id)
                    .limit(4)

                if (relatedData) setRelated(relatedData)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [id, navigate])

    useSEO({
        title: product ? `${product.name} - Detail Produk` : 'Detail Produk',
        description: product ? product.description : 'Detail lengkap dental unit berkualitas dengan spesifikasi dan garansi.'
    })

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-32 flex justify-center">
                <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-primary rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!product) return null

    // Parse gallery URLs splitting by comma or newline
    const parsedGallery = product.gallery_urls
        ? product.gallery_urls.split(/[\n,]+/).map(url => url.trim()).filter(Boolean)
        : []

    // Combine main image with additional gallery images
    const allImages = [product.image_url, ...parsedGallery]

    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka)
    }

    const getBadgeStyle = (condition) => {
        if (condition === 'Baru') return 'bg-primary text-white border-primary/20'
        if (condition === 'Second Original') return 'bg-amber-100 text-amber-800 border-amber-200'
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }

    const parseList = (text) => {
        if (!text) return []
        return text.split('\n').map(t => t.trim()).filter(Boolean)
    }

    const parsedFeatures = parseList(product.features)
    const parsedInclusions = parseList(product.inclusions)
    const parsedWarranty = parseList(product.warranty)

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-6">
            {/* Breadcrumbs */}
            <nav className="flex mb-6 text-sm font-medium text-slate-500">
                <ol className="flex items-center gap-2">
                    <li><Link className="hover:text-primary transition-colors" to="/">Beranda</Link></li>
                    <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                    <li><Link className="hover:text-primary transition-colors" to="/products">Katalog</Link></li>
                    <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                    <li className="text-slate-900 dark:text-white font-semibold">{product.name}</li>
                </ol>
            </nav>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                {/* Gallery Carousel */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative group">
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={allImages.length > 1}
                            className="w-full aspect-[4/3]"
                            onSlideChange={(swiper) => setLightboxIndex(swiper.realIndex)}
                        >
                            {allImages.map((img, idx) => (
                                <SwiperSlide key={idx} className="cursor-pointer" onClick={() => { setLightboxIndex(idx); setIsLightboxOpen(true); }}>
                                    <img src={img} alt={`${product.name} - slide ${idx + 1}`} className="w-full h-full object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="absolute top-4 left-4 z-10 pointer-events-none">
                            <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide backdrop-blur-sm shadow-sm">{product.brand}</span>
                        </div>
                    </div>
                </div>

                {/* Lightbox Modal */}
                {isLightboxOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all z-10"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        <div className="w-full max-w-5xl h-full flex items-center justify-center relative">
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1)) }}
                                        className="absolute left-2 sm:left-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all z-10 hidden sm:block"
                                    >
                                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1)) }}
                                        className="absolute right-2 sm:right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all z-10 hidden sm:block"
                                    >
                                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                                    </button>
                                </>
                            )}
                            <img
                                src={allImages[lightboxIndex]}
                                alt={`${product.name} - Fullscreen ${lightboxIndex + 1}`}
                                className="max-w-full max-h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm bg-gradient-to-t from-black/80 to-transparent p-4 pb-0 pointer-events-none">
                                {lightboxIndex + 1} / {allImages.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="mb-2 flex items-center gap-3">
                        <span className={`${getBadgeStyle(product.condition)} text-xs font-bold px-2.5 py-1 rounded-full border`}>{product.condition}</span>
                        <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200">{product.category}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">{product.name}</h1>
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6">
                        <p className="text-slate-500 text-sm mb-1 font-medium">Harga Unit</p>
                        <span className="text-3xl font-bold text-primary">{formatRp(product.price)}</span>
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">info</span> Harga belum termasuk ongkos kirim luar kota
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {[
                            { icon: 'verified_user', title: 'Garansi 6 Bulan', desc: 'Jaminan sparepart & jasa service teknisi.' },
                            { icon: 'construction', title: 'Gratis Instalasi', desc: 'Khusus wilayah Jabodetabek, pemasangan oleh ahli.' },
                            { icon: 'fact_check', title: 'Lolos QC Teknisi Senior', desc: 'Unit telah melalui proses inspeksi ketat 45 titik.' },
                        ].map((v, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <span className="material-symbols-outlined text-[20px]">{v.icon}</span>
                                </div>
                                <div><h4 className="text-sm font-bold text-slate-900 dark:text-white">{v.title}</h4><p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <a className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm" href={`https://wa.me/6281511249424?text=Halo%20Karya%20Mandiri%20Dental,%20saya%20tertarik%20dengan%20produk%20${product.name}`}>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Hubungi via WhatsApp
                        </a>
                        <button className="bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors">Minta Penawaran</button>
                    </div>
                </div>
            </div>

            {/* Tabs section */}
            <div className="mb-16">
                <div className="border-b border-slate-200 mb-6 flex overflow-x-auto select-none no-scrollbar">
                    <nav className="flex gap-2 sm:gap-8">
                        <button
                            onClick={() => setActiveTab('features')}
                            className={`${activeTab === 'features' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'} py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors`}
                        >
                            Fitur & Spesifikasi
                        </button>
                        <button
                            onClick={() => setActiveTab('inclusions')}
                            className={`${activeTab === 'inclusions' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'} py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors`}
                        >
                            Kelengkapan Unit
                        </button>
                        <button
                            onClick={() => setActiveTab('warranty')}
                            className={`${activeTab === 'warranty' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'} py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors`}
                        >
                            Garansi & Pengiriman
                        </button>
                    </nav>
                </div>
                <div className="min-h-[200px]">
                    {activeTab === 'features' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">featured_play_list</span> Fitur Unggulan
                                    </h3>
                                    {parsedFeatures.length > 0 ? (
                                        <ul className="space-y-3">
                                            {parsedFeatures.map((f, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                                                    <span className="text-sm text-slate-600 dark:text-slate-300">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">Belum ada fitur spesifik yang ditambahkan.</p>
                                    )}
                                </div>
                                {product.description && (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-amber-600 dark:text-amber-500">info</span>
                                            <div>
                                                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">Deskripsi Tambahan</h4>
                                                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1 whitespace-pre-line leading-relaxed">{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'inclusions' && (
                        <div className="animate-fade-in max-w-3xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">inventory_2</span> Daftar Barang & Kelengkapan
                            </h3>
                            {parsedInclusions.length > 0 ? (
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                        {parsedInclusions.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="size-2 rounded-full bg-primary shrink-0"></div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">Daftar kelengkapan belum tersedia.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'warranty' && (
                        <div className="animate-fade-in max-w-2xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">security</span> Kebijakan Garansi & Pengiriman
                            </h3>
                            {parsedWarranty.length > 0 ? (
                                <div className="space-y-4">
                                    {parsedWarranty.map((rule, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/20">
                                            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-500 shrink-0">gpp_good</span>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rule}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">Informasi garansi belum tersedia.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <section className="border-t border-slate-200 pt-10 mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Produk Serupa</h2>
                        <Link to="/products" className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                            Lihat Semua <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map((p) => (
                            <div key={p.id} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                                    <div className="absolute top-2 right-2 z-10">
                                        <span className={`${getBadgeStyle(p.condition)} text-xs font-bold px-2 py-1 rounded backdrop-blur-sm shadow-sm`}>{p.condition}</span>
                                    </div>
                                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                                    <p className="text-sm text-slate-500 mb-3">{p.category}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-primary font-bold">{formatRp(p.price)}</span>
                                        <Link to={`/products/${p.id}`} className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
