const articles = [
    { cat: 'Panduan Pembelian', date: 'Sep 12, 2023', title: 'Rekomendasi Dental Unit Terbaik untuk Klinik Baru 2024', excerpt: 'Memilih dental unit pertama bisa membingungkan. Kami mengulas 3 model terbaik yang menyeimbangkan harga, fitur, dan daya tahan.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfDhBnOiZQN8gSj7PFgBLmoegDrWIOYWKEotWI5UVRJQjaCERWpxkIRUxGC2iqxM25O20FEkMZiqKhbDI1rxvTnW61VMl_63f9e50miXa5Pt_C72WoZNKGPtBc_iMdZEV0vBN5C4fcbTUU2JfV27NJ7B1i57Fk9Hos7LetbiDLmeH-N6uHBCJCg3tWJg6WzRmQPbbcREdt6U8M88-26Go1PqkzqvDpiphb3_kQVbGIZ9nkQ0SFfLMfLNye7s65wu3a1owGQWcyCXFf' },
    { cat: 'Servis', date: 'Aug 28, 2023', title: '5 Tanda Dental Unit Anda Perlu Servis Segera', excerpt: 'Jangan tunggu sampai rusak total. Kenali tanda-tanda awal kerusakan pada hidrolik dan sistem air.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAwXMPtUupQ__vuGM6xq86i8R7672mr1AcBKDsMA2aPK06kPD8n_FpUaW3gBms9nASZQtsRfPXu9jhsSa6yux7RnOnhLvPVCvXneZE7tAqSVIco1ljWYlERq1sEahGQri796AyWOaIPSdteyzpGRzNJ0woCtlaH4Iswn8xPCHxCgjLy_BZWmVzL35qqEcnzay0_L7P1AEQKbQO4I44HId11_WxoHV5NvxQ9WahIUIE5Cy7FpxD-LuQvMFyA7-Gmr7XTb91hVYBlcYl' },
    { cat: 'Tips Perawatan', date: 'Aug 15, 2023', title: 'Cara Membersihkan Suction System dengan Benar', excerpt: 'Suction yang tersumbat adalah masalah umum. Ikuti tutorial langkah demi langkah ini.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6Ix_NIsY-U-lUm7-typbmvpIikdAAWpTdK9ls55dRbsTahRGc9iThyhjY4dTiHlKB1in42rZ0Iwhh5mzSfilMivq97bht70nQYIFvKHyRyrtX_3Ner-2UJvIRjuIV2XqD9C-8z6dfRNaySbZEq51TA9om_ApcyBYOTFm6H8g6XRQYnrD7G3oUGEGzdaTHAnTFnjSmjSyMrBcvhmhu-THR_AOotsBKhuWkAz8wG7aX0C2p1AXgFNi19dNnhmRTsoivVHz6UFJaSgt7' },
    { cat: 'Berita Industri', date: 'Jul 30, 2023', title: 'Tren Desain Interior Klinik Gigi 2024', excerpt: 'Bagaimana desain ruangan mempengaruhi psikologis pasien? Simak tren warna dan tata letak terbaru.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiTkkMzbcoUAUlXr5Pu_tmWARJRmRbPz7vkF91x0mUxldgyq14mpfxuobjnsJpKQlKdzC8dk5Esq0lOaQ9FPPLrw94KcbA9DBcDCOHhMOTYvY3GpTXpyauXRymD8WTEQxEX-ebf7PWiFOgSWXy5EDWHgDnNKXubZhEthrdb9kcAgGc_wmjJVMKwaooEgFSrhVA4I8PMKN5Y8j76vX98xX_zB4jaJmJ6KDRtJtJpynAXbCBLtX1Xq42vO4b-qLnQlDj9DiOi4WzmVXr' },
    { cat: 'Servis', date: 'Jul 12, 2023', title: 'Mengatasi Masalah Handpiece yang Berisik', excerpt: 'Suara bising pada handpiece bisa mengindikasikan bearing yang aus.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyeRTzD4gT367QAmRtx2jONI5yJbvJwrzOSccDaYnpjyE_IOHENWe34g2OQXtHrJwRa3ZXO5a5ZN9MF_G6ga4hJPgS5uTDi1Wj-2pxw1NYg770Hs4mRtjE8JLrl0ddo-SXsfHxf-7XGHg5d--KutbaVURlfj_z9rr5ol3bQkBMGazIh4pu-1vEn0mnNq_XyqMbA3UdZ5JnTUe-FLvysmmCBL4UEjMsLFovWvrtv9gf-EYwXAhaDzyI1X6nJ1neudubeUeqwg-ChF1' },
    { cat: 'Panduan Pembelian', date: 'Jun 22, 2023', title: 'Memilih Curing Light: LED vs Halogen', excerpt: 'Perbandingan mendalam antara teknologi curing light LED modern dan halogen tradisional.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGN14aCGl_7tPMufmYUrnqdXo5gVVny886J1sz12QaSUgmgK9qz2ZPfTl-diHwIIHLCEEpidMGVTGV8vHRHOrOq93maPfdVq6AZky_Obx_c623dJUMU6eZ8DhllDAePjUJvOFqtoPweqOHeQgQ6sglR1phrEnf3GQBCtXKFL3BrjmYgC3QrH2r2ligAL01LxSpHsc9uGC8HenVCiFoJ_SRedZwxwu7QaukYCSSSZ24_EyrmiMoLHJ6wKLO4v3HBZxWFf8meuksn3Ho' },
]

const categories = ['Semua', 'Tips Perawatan', 'Panduan Pembelian', 'Servis & Perbaikan', 'Berita Industri']

import { useSEO } from '../hooks/useSEO'

export default function Blog() {
    useSEO({ title: 'Blog & Artikel', description: 'Tips perawatan dental unit, panduan pembelian, dan wawasan industri dari para ahli teknisi.' })

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-slate-900 py-16 lg:py-24">
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbNOEOy_NMfQkdGlHN_X8BfJ11Lw6cvhrRY4HevQUvCSkhm6kKTDsM6AfLgrCWW8Q87CjoMI_cD3sUdUp_wznpZb-UDrMxNYmlGlgJnETqj1fNQDFzrFPehrCOsBOGiCCb-Ac_MglhANLOElid1GykzuMVhkVJouS2j9xRXbZ4mlUUMI-inB552W8FYmJ24sj9zrWtclxi7llAjgHKu4FWXQ0U6SrGjk24pVQXj5r80S9efwhuvzjJOFOCHd-WjdVkZ7LAeYVL-26-')" }}></div>
                </div>
                <div className="relative z-20 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/30 backdrop-blur-sm">Resource Center</span>
                    <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">BLOG &amp; ARTIKEL</h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
                        Informasi terbaru seputar perawatan dental unit, tips servis, panduan pembelian, dan wawasan industri dari para ahli teknisi kami.
                    </p>
                    <div className="mx-auto flex max-w-lg items-center rounded-full bg-white p-1 shadow-xl">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="w-full border-none bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0" placeholder="Cari artikel, tips, atau panduan..." type="text" />
                        <button className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90">Cari</button>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Categories */}
                <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
                    {categories.map((c, i) => (
                        <button key={c} className={`rounded-full px-5 py-2 text-sm font-medium shadow-sm ring-1 ring-inset transition-all ${i === 0 ? 'bg-primary text-white ring-primary' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'}`}>{c}</button>
                    ))}
                </div>

                {/* Featured Article */}
                <div className="mb-16">
                    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 lg:flex-row transition-shadow hover:shadow-md">
                        <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-1/2">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkaseAe8pRemEKFKdrWdm6oINHxtoFqTPoIelfWONprHwwD5YmqpXVvF49oLud_pDfjfad3rBhkvPYDHPmHQhS3PA0mWDooT_gWvFTLEWkGmfIbvxfZisZ4J0D_hBn1ud54sDfecGrAKLDax4u1Gds-nuZwjhMH2wUH_AcExdKmdeqpESavf4Lfd0ksji022bk7WY-X3WfRdLPBWVPcw3Z_Xw7FVkRLoc_V9O1Ojz6bcWT2Go9ZLI9bq5bnywK_ST_cM5ZEFRGJHZw')" }}></div>
                        </div>
                        <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Featured</span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className="text-xs font-medium text-slate-500">Tips Perawatan</span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className="text-xs text-slate-500">Oct 24, 2023</span>
                            </div>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                                <a className="hover:text-primary transition-colors" href="#">Panduan Lengkap Merawat Dental Unit Agar Awet Bertahun-tahun</a>
                            </h2>
                            <p className="mb-8 text-base text-slate-600">
                                Dental unit adalah investasi terbesar klinik Anda. Pelajari langkah-langkah preventif harian, mingguan, dan bulanan untuk menjaga performa alat tetap prima.
                            </p>
                            <a className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 w-fit" href="#">
                                Baca Selengkapnya <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Articles Header */}
                <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Artikel Terbaru</h3>
                    <a className="flex items-center text-sm font-semibold text-primary hover:text-primary/80" href="#">Lihat Arsip <span className="material-symbols-outlined ml-1 text-[18px]">chevron_right</span></a>
                </div>

                {/* Article Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((a, i) => (
                        <article key={i} className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="relative h-48 w-full overflow-hidden">
                                <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="text-xs font-semibold text-primary">{a.cat}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <time className="text-xs text-slate-500">{a.date}</time>
                                </div>
                                <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">
                                    <a href="#">{a.title}</a>
                                </h3>
                                <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3">{a.excerpt}</p>
                                <a className="inline-flex items-center text-sm font-bold text-primary hover:underline" href="#">
                                    Baca Artikel <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-sm">1</button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50">3</button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>
            </div>

            {/* Newsletter */}
            <section className="border-t border-slate-200 bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 sm:px-12 xl:py-16">
                        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                        <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                        <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
                            <div className="max-w-xl text-center lg:text-left">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Dapatkan Tips Perawatan Mingguan</h2>
                                <p className="text-lg text-blue-100">Bergabunglah dengan 2,000+ teknisi dan dokter gigi lainnya.</p>
                            </div>
                            <div className="w-full max-w-md">
                                <form className="flex flex-col gap-3 sm:flex-row">
                                    <input className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100 focus:ring-2 focus:ring-white/50 backdrop-blur-sm" placeholder="Alamat Email Anda" type="email" />
                                    <button className="whitespace-nowrap rounded-lg bg-white px-6 py-3 text-base font-bold text-primary hover:bg-blue-50 transition-colors" type="button">Langganan</button>
                                </form>
                                <p className="mt-3 text-xs text-blue-200 text-center lg:text-left">Kami menghargai privasi Anda. Unsubscribe kapan saja.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
