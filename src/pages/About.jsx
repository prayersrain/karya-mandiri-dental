import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const stats = [
    { value: '500+', label: 'Unit Tertangani' },
    { value: '10+', label: 'Tahun Pengalaman' },
    { value: '300+', label: 'Klinik Partner' },
    { value: '98%', label: 'Kepuasan Klien' },
]

const team = [
    { name: 'Wahyudi', role: 'Founder & Lead Technician', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEhxI5wpToPmf8SQA0Wj3A1LokgGQv-IHEbiicn1tSFrJdBFrQm0Pf4SACVJ8pRloZOQdlxtW60sFtm46jSRwPCU4pqfbSPFWDdF9kpJEwu7zow17BBB_y43P68H_d-4KRO5abRz12Ri4Cw4s2VapXTko2GX-KMwt9kSsX2F-DTbap9zez5vl3NQJs-yd1q8POGeolgUwU_Y8_gh8cOvBpbruMICkBYbtbyla-IpRW4dUKAKyyCKRQYYR_F9YdGTizvFpNs2yTSFKo' },
    { name: 'H. Arief Rahman', role: 'Operations Manager', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfDhBnOiZQN8gSj7PFgBLmoegDrWIOYWKEotWI5UVRJQjaCERWpxkIRUxGC2iqxM25O20FEkMZiqKhbDI1rxvTnW61VMl_63f9e50miXa5Pt_C72WoZNKGPtBc_iMdZEV0vBN5C4fcbTUU2JfV27NJ7B1i57Fk9Hos7LetbiDLmeH-N6uHBCJCg3tWJg6WzRmQPbbcREdt6U8M88-26Go1PqkzqvDpiphb3_kQVbGIZ9nkQ0SFfLMfLNye7s65wu3a1owGQWcyCXFf' },
    { name: 'Susanto', role: 'Senior Technician', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAwXMPtUupQ__vuGM6xq86i8R7672mr1AcBKDsMA2aPK06kPD8n_FpUaW3gBms9nASZQtsRfPXu9jhsSa6yux7RnOnhLvPVCvXneZE7tAqSVIco1ljWYlERq1sEahGQri796AyWOaIPSdteyzpGRzNJ0woCtlaH4Iswn8xPCHxCgjLy_BZWmVzL35qqEcnzay0_L7P1AEQKbQO4I44HId11_WxoHV5NvxQ9WahIUIE5Cy7FpxD-LuQvMFyA7-Gmr7XTb91hVYBlcYl' },
]

export default function About() {
    useSEO({ title: 'Tentang Kami', description: 'Karya Mandiri Dental - Mitra terpercaya untuk solusi dental unit profesional di Indonesia sejak 2010.' })

    return (
        <>
            {/* Hero */}
            <section className="relative flex min-h-[480px] flex-col items-center justify-center gap-6 overflow-hidden px-4 text-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvws-2s0zu-9PCRtwcB3LoKb9Z-q7OqvoGDXsvGitBUVLkTA-oIYlkp7wSIFsi2tIe_5vKmWCBXtUFvIjrpz8ZZNAxRHI8QpFvhBNnv-x8A9lJpPghfF3To-8EEjFFEJa5MODbn5popk-1CMMeAB-JcPSojgP1GsN7s26PdsUmipX-IpDgJMtb-ZrIVGokORKLe1dNL_YrO9uS7-_JDowjeY82YceVuPSc_WZcvjGRs65at5rIDdmBdXbJXkG4Z_KRIdwStMdEVK99')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-primary/40"></div>
                </div>
                <div className="relative z-10 max-w-3xl">
                    <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm border border-white/20 mb-4">Since 2010</span>
                    <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">TENTANG KAMI</h1>
                    <p className="text-white/90 text-lg leading-relaxed">Mitra terpercaya untuk solusi dental unit profesional di Indonesia</p>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="relative z-30 mx-auto -mt-16 w-full max-w-6xl px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4">
                            <span className="text-3xl font-black text-primary">{s.value}</span>
                            <span className="text-sm font-medium text-slate-500 mt-1">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story */}
            <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-20 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2">
                        <div className="h-1 w-12 rounded-full bg-primary"></div>
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">Cerita Kami</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Dedikasi Lebih Dari Satu Dekade Untuk Industri Dental</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Karya Mandiri Dental didirikan oleh Wahyudi, seorang teknisi dental unit berpengalaman yang memiliki visi untuk menyediakan layanan service dan penjualan dental unit berkualitas tinggi dengan harga yang terjangkau.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Berawal dari workshop kecil di Bekasi, kini kami telah melayani ratusan klinik gigi di seluruh Indonesia. Tim kami terdiri dari teknisi senior yang memiliki pengalaman lebih dari 10 tahun dalam menangani berbagai merek dental unit ternama.
                    </p>
                </div>
                <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvws-2s0zu-9PCRtwcB3LoKb9Z-q7OqvoGDXsvGitBUVLkTA-oIYlkp7wSIFsi2tIe_5vKmWCBXtUFvIjrpz8ZZNAxRHI8QpFvhBNnv-x8A9lJpPghfF3To-8EEjFFEJa5MODbn5popk-1CMMeAB-JcPSojgP1GsN7s26PdsUmipX-IpDgJMtb-ZrIVGokORKLe1dNL_YrO9uS7-_JDowjeY82YceVuPSc_WZcvjGRs65at5rIDdmBdXbJXkG4Z_KRIdwStMdEVK99" alt="Workshop kami" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-white py-20 px-4">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Visi & Misi</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                                <span className="material-symbols-outlined text-3xl">visibility</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Visi</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Menjadi mitra utama dan terpercaya bagi setiap klinik gigi di Indonesia dalam menyediakan peralatan dental berkualitas tinggi dan layanan purna jual yang prima.
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                                <span className="material-symbols-outlined text-3xl">flag</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Misi</h3>
                            <ul className="text-slate-600 leading-relaxed space-y-2">
                                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Menyediakan dental unit refurbished dan bekas dengan kualitas terjamin</li>
                                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Memberikan layanan service yang cepat, transparan, dan bergaransi</li>
                                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Membangun hubungan jangka panjang berbasis kepercayaan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-slate-50 py-20 px-4">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Tim Kami</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Profesional berpengalaman yang siap melayani kebutuhan dental unit Anda</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {team.map((t, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center">
                                <div className="aspect-square overflow-hidden">
                                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 text-lg">{t.name}</h3>
                                    <p className="text-sm text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary px-4 py-20 relative overflow-hidden">
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Berpartner Dengan Kami?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Hubungi kami sekarang untuk konsultasi gratis.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://wa.me/6281511249424" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                            Hubungi Kami
                        </a>
                        <Link to="/products" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/30 transition-colors">
                            Lihat Katalog
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
