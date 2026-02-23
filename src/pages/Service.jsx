import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { useSettings } from '../context/SettingsContext'

const serviceCards = [
    { icon: 'handyman', title: 'Perbaikan Ringan', desc: 'Sesuai untuk perbaikan ringan atau jasa datang ke tempat (di luar biaya pergantian sparepart).', time: '1 Hari', price: 'Rp 350rb' },
    { icon: 'construction', title: 'Renovasi', desc: 'Termasuk pergantian cat, penggantian jok, ganti mesin, dll. Harga relatif berdasarkan survey lapangan dan harga kebutuhan sparepart.', time: 'Sesuai Survey', price: 'Rp 3jt - 15jt' },
]

const steps = [
    { icon: 'edit_calendar', title: 'Booking', desc: 'Isi formulir & jadwalkan', active: true },
    { icon: 'search', title: 'Pengecekan', desc: 'Teknisi memeriksa unit', active: false },
    { icon: 'description', title: 'Penawaran', desc: 'Persetujuan biaya', active: false },
    { icon: 'build', title: 'Pengerjaan', desc: 'Proses perbaikan', active: false },
    { icon: 'check_circle', title: 'Selesai', desc: 'Unit siap digunakan', active: false },
]

const faqs = [
    { q: 'Berapa lama garansi service?', a: 'Kami memberikan garansi service selama 1 bulan untuk kerusakan yang sama. Untuk penggantian sparepart, garansi mengikuti ketentuan dari pabrikan (biasanya 3-6 bulan).' },
    { q: 'Apakah melayani panggilan ke luar kota?', a: 'Ya, kami melayani panggilan service ke seluruh wilayah Jabodetabek dan kota-kota besar lainnya dengan tambahan biaya transportasi akomodasi teknisi.' },
    { q: 'Merek dental unit apa saja yang bisa diperbaiki?', a: 'Teknisi kami berpengalaman menangani berbagai merek global maupun lokal seperti Gnatus, Siger, Osada, Belmont, Yoshida, dan merek China lainnya.' },
]

export default function Service() {
    const [booking, setBooking] = useState({
        namaKlinik: '', noWa: '', alamat: '', merek: '', layanan: 'Perbaikan Ringan', keluhan: '', jadwal: ''
    })
    const { settings } = useSettings()

    const heroBg = settings?.service_hero || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvws-2s0zu-9PCRtwcB3LoKb9Z-q7OqvoGDXsvGitBUVLkTA-oIYlkp7wSIFsi2tIe_5vKmWCBXtUFvIjrpz8ZZNAxRHI8QpFvhBNnv-x8A9lJpPghfF3To-8EEjFFEJa5MODbn5popk-1CMMeAB-JcPSojgP1GsN7s26PdsUmipX-IpDgJMtb-ZrIVGokORKLe1dNL_YrO9uS7-_JDowjeY82YceVuPSc_WZcvjGRs65at5rIDdmBdXbJXkG4Z_KRIdwStMdEVK99'
    useSEO({ title: 'Layanan Service', description: 'Layanan service, perbaikan, dan maintenance dental unit profesional. Booking teknisi sekarang!' })

    const handleChange = (e) => setBooking({ ...booking, [e.target.name]: e.target.value })

    const handleBooking = (e) => {
        e.preventDefault()
        const text = `*BOOKING SERVICE - Karya Mandiri Dental*%0A%0A` +
            `*Nama Klinik/Dokter:* ${booking.namaKlinik}%0A` +
            `*No. WhatsApp:* ${booking.noWa}%0A` +
            `*Alamat:* ${booking.alamat}%0A` +
            `*Merek/Tipe Unit:* ${booking.merek}%0A` +
            `*Jenis Layanan:* ${booking.layanan}%0A` +
            `*Keluhan:* ${booking.keluhan}%0A` +
            `*Rencana Jadwal:* ${booking.jadwal}`
        window.open(`https://wa.me/6281511249424?text=${text}`, '_blank')
    }

    return (
        <>
            {/* Hero */}
            <div className="relative w-full bg-slate-900">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url('${heroBg}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-blue-100 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        Dipercaya 500+ Klinik
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 max-w-4xl leading-tight">Layanan Service &amp; Perbaikan Dental Unit</h1>
                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-light">
                        Jaga klinik Anda tetap berjalan lancar dengan layanan maintenance dari teknisi berpengalaman. Respon cepat, harga transparan, dan bergaransi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a className="bg-primary hover:bg-primary-hover text-white text-base font-bold py-3 px-8 rounded shadow-lg shadow-primary/25 transition-all" href="#booking-form">Booking Service</a>
                        <a className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-base font-semibold py-3 px-8 rounded transition-all" href="#services">Lihat Harga</a>
                    </div>
                </div>
            </div>

            {/* Services */}
            <div className="w-full bg-white py-16 sm:py-24" id="services">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Jenis Layanan</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Solusi lengkap yang disesuaikan dengan kebutuhan spesifik peralatan Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {serviceCards.map((s, i) => (
                            <div key={i} className="group bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 flex-grow">{s.desc}</p>
                                <div className="border-t border-slate-200 pt-4 mt-auto">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span> {s.time}
                                    </div>
                                    <div className="text-primary font-bold">
                                        <span className="text-xs text-slate-400 font-normal mr-1">Mulai</span> {s.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Process */}
            <div className="w-full bg-slate-50 py-16 border-y border-slate-200">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Proses Service</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
                            {steps.map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 border-4 border-white ${s.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border border-slate-300 ring-2 ring-transparent'}`}>
                                        <span className="material-symbols-outlined text-xl">{s.icon}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900">{i + 1}. {s.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Form */}
            <div className="w-full bg-background-light py-16 sm:py-24" id="booking-form">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                        <div className="bg-primary px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="material-symbols-outlined">calendar_month</span> Booking Service
                            </h2>
                            <p className="text-blue-100 text-sm mt-1">Isi formulir di bawah ini, data akan dikirim langsung ke WhatsApp kami.</p>
                        </div>
                        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleBooking}>
                            <div className="flex flex-col gap-6">
                                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-2 border-b border-slate-100 pb-2">Informasi Klinik</h3>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Nama Klinik / Dokter</label>
                                    <input name="namaKlinik" value={booking.namaKlinik} onChange={handleChange} required className="h-10 px-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="e.g. Klinik Gigi Sehat" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700">No. WhatsApp</label>
                                    <input name="noWa" value={booking.noWa} onChange={handleChange} required className="h-10 px-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="e.g. 0815-1124-9424" type="tel" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Alamat Lengkap</label>
                                    <textarea name="alamat" value={booking.alamat} onChange={handleChange} required className="p-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" placeholder="Alamat praktik..." rows="4"></textarea>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-2 border-b border-slate-100 pb-2">Detail Service</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Merek/Tipe Unit</label>
                                        <input name="merek" value={booking.merek} onChange={handleChange} required className="h-10 px-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="e.g. Gnatus" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Jenis Layanan</label>
                                        <select name="layanan" value={booking.layanan} onChange={handleChange} className="h-10 px-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                                            <option>Perbaikan Ringan</option>
                                            <option>Renovasi</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Keluhan / Kerusakan</label>
                                    <textarea name="keluhan" value={booking.keluhan} onChange={handleChange} required className="p-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" placeholder="Deskripsikan masalahnya..." rows="2"></textarea>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700">Rencana Jadwal</label>
                                    <input name="jadwal" value={booking.jadwal} onChange={handleChange} className="h-10 px-3 w-full rounded border border-slate-300 bg-slate-50 text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" type="date" />
                                </div>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-lg transition-colors shadow-lg shadow-green-500/20" type="submit">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Kirim Booking via WhatsApp
                                </button>
                                <p className="text-center text-xs text-slate-500 mt-3">Data Anda akan diformat otomatis ke pesan WhatsApp admin kami.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="w-full bg-white py-16 sm:py-24 border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
                    <div className="flex flex-col gap-4">
                        {faqs.map((f, i) => (
                            <details key={i} className="group bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-slate-900">
                                    <span>{f.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="text-slate-600 p-5 pt-0 text-sm leading-relaxed">{f.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
