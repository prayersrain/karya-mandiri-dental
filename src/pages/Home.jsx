import { Link } from 'react-router-dom'
import { AnimateOnScroll } from '../hooks/useScrollAnimation'
import { useSEO } from '../hooks/useSEO'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const services = [
    { icon: 'construction', title: 'Service & Perbaikan', desc: 'Teknisi berpengalaman menangani berbagai merek dental unit.' },
    { icon: 'restart_alt', title: 'Refurbish Unit', desc: 'Restorasi total dental unit bekas seperti baru kembali.' },
    { icon: 'shopping_cart', title: 'Jual Beli Unit', desc: 'Beli unit bekas berkualitas atau jual unit lama Anda.' },
    { icon: 'engineering', title: 'Instalasi', desc: 'Pemasangan profesional untuk klinik baru maupun pindahan.' },
]

const reasons = [
    { icon: 'verified', title: 'Berpengalaman 10+ Tahun', desc: 'Teknisi senior bersertifikat' },
    { icon: 'shield', title: 'Garansi Service', desc: 'Jaminan kualitas setiap pekerjaan' },
    { icon: 'handshake', title: 'Harga Transparan', desc: 'Tanpa biaya tersembunyi' },
    { icon: 'speed', title: 'Respon Cepat', desc: 'Siap melayani dalam 24 jam' },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)

            const { data: prodData } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3)
            if (prodData) setProducts(prodData)

            const { data: testiData } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(4)
            if (testiData) setTestimonials(testiData)

            setLoading(false)
        }
        fetchData()
    }, [])

    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka)
    }

    const getBadgeStyle = (condition) => {
        if (condition === 'Baru') return 'bg-primary'
        if (condition === 'Second Original') return 'bg-amber-500'
        return 'bg-emerald-500' // Refurbished
    }

    useSEO({
        title: 'Beranda',
        description: 'Karya Mandiri Dental - Spesialis service, refurbish, dan jual-beli dental unit berkualitas untuk klinik gigi profesional.'
    })

    return (
        <>
            {/* Hero */}
            <section className="relative px-4 py-8 md:px-10 md:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 text-center relative overflow-hidden"
                        style={{ backgroundImage: "linear-gradient(rgba(19, 109, 236, 0.85), rgba(16, 24, 34, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvws-2s0zu-9PCRtwcB3LoKb9Z-q7OqvoGDXsvGitBUVLkTA-oIYlkp7wSIFsi2tIe_5vKmWCBXtUFvIjrpz8ZZNAxRHI8QpFvhBNnv-x8A9lJpPghfF3To-8EEjFFEJa5MODbn5popk-1CMMeAB-JcPSojgP1GsN7s26PdsUmipX-IpDgJMtb-ZrIVGokORKLe1dNL_YrO9uS7-_JDowjeY82YceVuPSc_WZcvjGRs65at5rIDdmBdXbJXkG4Z_KRIdwStMdEVK99')" }}>
                        <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm border border-white/20">Solusi Dental Unit Terpercaya</span>
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight max-w-3xl">KARYA MANDIRI DENTAL</h1>
                        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto">Spesialis service, refurbish, dan jual-beli dental unit berkualitas untuk klinik gigi profesional.</p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Link to="/service" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-slate-100 transition-colors shadow-lg">Booking Service</Link>
                            <Link to="/products" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/30 transition-colors">Lihat Katalog</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="bg-white dark:bg-slate-800/50 py-16 px-4 transition-colors">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Layanan Kami</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">Solusi lengkap untuk kebutuhan peralatan klinik gigi Anda, didukung tim teknisi berpengalaman.</p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((s, i) => (
                            <AnimateOnScroll key={i} delay={i * 100}>
                                <div className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-2xl">{s.icon}</span></div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{s.desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnimateOnScroll>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Produk Unggulan</h2>
                                <p className="text-slate-500 dark:text-slate-400 max-w-lg">Dental unit pilihan yang sudah melalui proses inspeksi dan refurbish ketat.</p>
                            </div>
                            <Link to="/products" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">Lihat Semua <span className="material-symbols-outlined text-lg">arrow_forward</span></Link>
                        </div>
                    </AnimateOnScroll>
                    {loading ? (
                        <div className="flex justify-center w-full py-16">
                            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p, i) => (
                                <AnimateOnScroll key={p.id} delay={i * 150}>
                                    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-md ${getBadgeStyle(p.condition)}`}>{p.condition}</span>
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">{p.brand}</p>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.name}</h3>
                                            <p className="text-primary text-xl font-bold mt-1">{formatRp(p.price)}</p>
                                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-3 mt-auto">
                                                <a href={`https://wa.me/6281511249424?text=Halo%20Karya%20Mandiri%20Dental,%20saya%20tertarik%20dengan%20produk%20${p.name}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg text-sm font-bold transition-colors"><span className="material-symbols-outlined text-[18px]">chat</span>Tanya</a>
                                                <Link to={`/products/${p.id}`} className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-300 hover:text-primary py-2 rounded-lg text-sm font-medium transition-colors bg-transparent">Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white dark:bg-slate-800/50 py-16 px-4 transition-colors">
                <div className="max-w-7xl mx-auto text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Mengapa Memilih Kami?</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12">Komitmen kami memberikan layanan terbaik untuk klinik gigi Anda.</p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reasons.map((r, i) => (
                            <AnimateOnScroll key={i} delay={i * 100} animation="zoom-in">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4"><span className="material-symbols-outlined">{r.icon}</span></div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{r.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{r.desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {testimonials.length > 0 && (
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <AnimateOnScroll>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">Apa Kata Klien Kami?</h2>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {testimonials.map((t, i) => (
                                <AnimateOnScroll key={t.id} delay={i * 100} animation="fade-in">
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                                        <div className="flex justify-center gap-1 mb-4">
                                            {[...Array(t.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                            {[...Array(5 - t.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-gray-300 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 italic text-sm md:text-base leading-relaxed flex-grow">"{t.review}"</p>
                                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3">
                                            {t.image_url ? (
                                                <img src={t.image_url} alt={t.customer_name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{t.customer_name.charAt(0)}</div>
                                            )}
                                            <div className="text-left">
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{t.customer_name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{t.clinic_name || 'Klinik Gigi'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <AnimateOnScroll animation="zoom-in">
                <section className="px-4 pb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Butuh Konsultasi?</h2>
                            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">Hubungi kami sekarang untuk konsultasi gratis mengenai kebutuhan dental unit klinik Anda.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://wa.me/6281511249424" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Chat WhatsApp
                                </a>
                                <Link to="/products" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/30 transition-colors">Lihat Katalog</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
        </>
    )
}
