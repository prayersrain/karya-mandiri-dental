import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { useSettings } from '../context/SettingsContext'

export default function Contact() {
    const [form, setForm] = useState({ nama: '', email: '', wa: '', subjek: 'Pertanyaan Umum', pesan: '' })
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const { settings } = useSettings()

    const heroBg = settings?.contact_hero || 'https://images.unsplash.com/photo-1516328318414-39645116f3af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'

    useSEO({ title: 'Hubungi Kami', description: 'Hubungi Karya Mandiri Dental untuk konsultasi dental unit. Jl. Raya Pondok Benda No.26, Jatiasih, Bekasi.' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        const { error } = await supabase.from('contact_messages').insert([{
            name: form.nama,
            email: form.email || null,
            phone: form.wa,
            subject: form.subjek,
            message: form.pesan
        }])

        if (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            toast.error('Gagal mengirim pesan. Silakan coba lagi.')
            return
        }

        setStatus('success')
        toast.success('Pesan Anda berhasil terkirim!')
        setForm({ nama: '', email: '', wa: '', subjek: 'Pertanyaan Umum', pesan: '' })
    }

    const openWhatsApp = () => {
        const text = `*Pesan dari Website Karya Mandiri Dental*%0A%0A` +
            `*Nama:* ${form.nama}%0A` +
            `*Email:* ${form.email}%0A` +
            `*WhatsApp:* ${form.wa}%0A` +
            `*Subjek:* ${form.subjek}%0A` +
            `*Pesan:* ${form.pesan}`
        window.open(`https://wa.me/6281511249424?text=${text}`, '_blank')
    }

    return (
        <>
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 relative overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(rgba(16, 24, 34, 0.7), rgba(19, 109, 236, 0.4)), url('${heroBg}')` }}>
                    <div className="flex flex-col gap-2 text-center relative z-10">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl drop-shadow-lg">HUBUNGI KAMI</h1>
                        <p className="text-slate-100 text-sm font-medium sm:text-lg max-w-lg mx-auto drop-shadow-md">Solusi terbaik untuk unit gigi Anda. Kami siap membantu kebutuhan klinik Anda.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: 'location_on', title: 'Alamat Workshop', lines: ['Jl. Raya Pondok Benda No. 26', 'RT 05 RW 02, Kec. Jatiasih', 'Kota Bekasi, Jawa Barat'] },
                        { icon: 'call', title: 'Telepon & Email', lines: ['+62 815-1124-9424', 'karyamandiridental@gmail.com'] },
                        { icon: 'schedule', title: 'Jam Operasional', lines: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 08:00 - 14:00'] },
                    ].map((c, i) => (
                        <div key={i} className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">{c.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{c.title}</h3>
                                {c.lines.map((l, j) => <p key={j} className="text-slate-500 text-sm">{l}</p>)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form + Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Form */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h2>
                            <p className="text-slate-500">Isi formulir di bawah ini, pesan Anda akan dikirim langsung ke WhatsApp kami.</p>
                        </div>
                        {status === 'success' ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-fade-in flex flex-col items-center gap-3">
                                <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Pesan Terkirim!</h3>
                                <p className="text-slate-600 text-sm">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda melalui nomor WhatsApp atau Email yang dilampirkan.</p>
                                <button onClick={() => setStatus('idle')} className="mt-4 text-primary font-bold text-sm hover:underline">Kirim pesan lain</button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                                        Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp langsung.
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                                        <input name="nama" value={form.nama} onChange={handleChange} required className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary disabled:opacity-50" placeholder="Nama Anda" type="text" disabled={status === 'loading'} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Alamat Email (Opsional)</label>
                                        <input name="email" value={form.email} onChange={handleChange} className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary disabled:opacity-50" placeholder="nama@email.com" type="email" disabled={status === 'loading'} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Nomor Telepon / WA</label>
                                        <input name="wa" value={form.wa} onChange={handleChange} required className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary disabled:opacity-50" placeholder="0815..." type="tel" disabled={status === 'loading'} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Subjek</label>
                                        <select name="subjek" value={form.subjek} onChange={handleChange} className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary disabled:opacity-50" disabled={status === 'loading'}>
                                            <option>Pertanyaan Umum</option>
                                            <option>Permintaan Penawaran</option>
                                            <option>Jadwal Service</option>
                                            <option>Komplain</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Pesan</label>
                                    <textarea name="pesan" value={form.pesan} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:ring-primary focus:border-primary resize-none disabled:opacity-50" placeholder="Tuliskan pesan Anda di sini..." rows="5" disabled={status === 'loading'}></textarea>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                    <button disabled={status === 'loading'} className="h-12 flex-1 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70" type="submit">
                                        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
                                    </button>
                                    <button type="button" onClick={openWhatsApp} disabled={status === 'loading' || !form.nama || !form.pesan} className="h-12 md:w-auto px-6 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        WhatsApp
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Map */}
                    <div className="flex flex-col h-full min-h-[400px]">
                        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100">
                            <iframe
                                title="Lokasi Karya Mandiri Dental"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d106.96!3d-6.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698fddc1f1e0e7%3A0x0!2sJatiasih%2C%20Kota%20Bekasi!5e0!3m2!1sen!2sid!4v1708912345678!5m2!1sen!2sid"
                                width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen="" loading="lazy"
                            ></iframe>
                            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg max-w-[220px] border border-slate-200">
                                <p className="text-xs font-bold text-slate-900">Karya Mandiri Dental</p>
                                <p className="text-xs text-slate-500">Jl. Raya Pondok Benda No. 26, Jatiasih, Bekasi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white shadow-lg hover:shadow-xl transition-all group">
                        <div className="absolute right-0 top-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <span className="material-symbols-outlined">chat</span>
                                </div>
                                <h3 className="text-xl font-bold">Butuh Respon Cepat?</h3>
                            </div>
                            <p className="text-green-50 max-w-sm">Chat langsung dengan tim kami via WhatsApp untuk konsultasi instan.</p>
                            <a href="https://wa.me/6281511249424" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors">
                                Chat WhatsApp <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-blue-600 p-8 text-white shadow-lg hover:shadow-xl transition-all group">
                        <div className="absolute left-0 bottom-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </div>
                                <h3 className="text-xl font-bold">Jadwalkan Service</h3>
                            </div>
                            <p className="text-blue-50 max-w-sm">Unit gigi bermasalah? Booking teknisi kami sekarang juga.</p>
                            <a href="/service" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary hover:bg-blue-50 transition-colors">
                                Booking Sekarang <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
