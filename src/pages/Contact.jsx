import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'

export default function Contact() {
    const [form, setForm] = useState({ nama: '', email: '', wa: '', subjek: 'Pertanyaan Umum', pesan: '' })
    useSEO({ title: 'Hubungi Kami', description: 'Hubungi Karya Mandiri Dental untuk konsultasi dental unit. Jl. Raya Pondok Benda No.26, Jatiasih, Bekasi.' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
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
                    style={{ backgroundImage: "linear-gradient(rgba(16, 24, 34, 0.7), rgba(19, 109, 236, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJAOnhkou0TswbObjQImmTm5CoF7NuJ2zungyQQnR0ex-Zzo4cXOtIEB59RCeVNDF6C1FPQMRTkWan0-91oHJ8GVK3IAvPq19URvO2-xne1qJi72ZKGO_T7J9LUc6uVVxhRjl6xMb5_Y6JH1xb0Yv93XZMOTpLGZSYG-JJ2fOuwc0Uxr2MCJod3w1JWAThfJL0UU5Likpvv269e8EFD5LbPpj4hJrKQ228xVXa_RH9sOdSKVFCuDcltbeKli4hJzYUqmJ3A9rFwRv2')" }}>
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
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                                    <input name="nama" value={form.nama} onChange={handleChange} required className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary" placeholder="Nama Anda" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Alamat Email</label>
                                    <input name="email" value={form.email} onChange={handleChange} className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary" placeholder="nama@email.com" type="email" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Nomor WhatsApp</label>
                                    <input name="wa" value={form.wa} onChange={handleChange} required className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary" placeholder="0815..." type="tel" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700">Subjek</label>
                                    <select name="subjek" value={form.subjek} onChange={handleChange} className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:ring-primary focus:border-primary">
                                        <option>Pertanyaan Umum</option>
                                        <option>Permintaan Penawaran</option>
                                        <option>Jadwal Service</option>
                                        <option>Komplain</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Pesan</label>
                                <textarea name="pesan" value={form.pesan} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:ring-primary focus:border-primary resize-none" placeholder="Tuliskan pesan Anda di sini..." rows="5"></textarea>
                            </div>
                            <button className="mt-2 h-12 w-full md:w-auto px-8 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20" type="submit">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Kirim via WhatsApp
                            </button>
                        </form>
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
