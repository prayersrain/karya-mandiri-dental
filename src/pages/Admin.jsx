import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
    const [activeTab, setActiveTab] = useState('products') // 'products' | 'messages' | 'testimonials'

    const [products, setProducts] = useState([])
    const [messages, setMessages] = useState([])
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        name: '', brand: '', price: '', condition: 'Refurbished', category: 'Dental Unit (Fix)', description: '', image_url: '', gallery_urls: '',
        features: '', inclusions: '', warranty: ''
    })
    const [editingId, setEditingId] = useState(null)

    const [testiForm, setTestiForm] = useState({ customer_name: '', clinic_name: '', review: '', rating: 5, image_url: '', is_active: true })
    const [editingTestiId, setEditingTestiId] = useState(null)

    const [uploading, setUploading] = useState(false)
    const [uploadingGallery, setUploadingGallery] = useState(false)

    useEffect(() => {
        if (activeTab === 'products') {
            fetchProducts()
        } else if (activeTab === 'messages') {
            fetchMessages()
        } else if (activeTab === 'testimonials') {
            fetchTestimonials()
        }
    }, [activeTab])

    async function fetchProducts() {
        setLoading(true)
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data) setProducts(data)
        setLoading(false)
    }

    async function fetchMessages() {
        setLoading(true)
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
        if (data) setMessages(data)
        setLoading(false)
    }

    async function fetchTestimonials() {
        setLoading(true)
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
        if (data) setTestimonials(data)
        setLoading(false)
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleTestiChange = (e) => setTestiForm({ ...testiForm, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

    const uploadFile = async (file) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file)

        if (uploadError) {
            alert('Gagal mengupload gambar: ' + uploadError.message)
            return null
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath)

        return data.publicUrl
    }

    const handleMainImageUpload = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return
            setUploading(true)
            const file = e.target.files[0]
            const publicUrl = await uploadFile(file)
            if (publicUrl) setForm(prev => ({ ...prev, image_url: publicUrl }))
        } finally {
            setUploading(false)
        }
    }

    const handleTestiImageUpload = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return
            setUploading(true)
            const file = e.target.files[0]
            const publicUrl = await uploadFile(file)
            if (publicUrl) setTestiForm(prev => ({ ...prev, image_url: publicUrl }))
        } finally {
            setUploading(false)
        }
    }

    const handleGalleryUpload = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return
            setUploadingGallery(true)

            const newUrls = []
            for (const file of e.target.files) {
                const publicUrl = await uploadFile(file)
                if (publicUrl) newUrls.push(publicUrl)
            }

            if (newUrls.length > 0) {
                setForm(prev => {
                    const existingUrls = prev.gallery_urls ? prev.gallery_urls.trim() : ''
                    const urlsToAdd = newUrls.join('\n')
                    return {
                        ...prev,
                        gallery_urls: existingUrls ? `${existingUrls}\n${urlsToAdd}` : urlsToAdd
                    }
                })
            }
        } finally {
            setUploadingGallery(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const payload = { ...form, price: Number(form.price) || 0 }

        if (editingId) {
            await supabase.from('products').update(payload).eq('id', editingId)
        } else {
            await supabase.from('products').insert([payload])
        }

        setForm({ name: '', brand: '', price: '', condition: 'Refurbished', category: 'Dental Unit (Fix)', description: '', image_url: '', gallery_urls: '', features: '', inclusions: '', warranty: '' })
        setEditingId(null)
        await fetchProducts()
    }

    const handleTestiSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const payload = { ...testiForm, rating: Number(testiForm.rating) || 5 }

        if (editingTestiId) {
            await supabase.from('testimonials').update(payload).eq('id', editingTestiId)
        } else {
            await supabase.from('testimonials').insert([payload])
        }

        setTestiForm({ customer_name: '', clinic_name: '', review: '', rating: 5, image_url: '', is_active: true })
        setEditingTestiId(null)
        await fetchTestimonials()
    }

    const handleEdit = (p) => {
        setForm({ ...p })
        setEditingId(p.id)
        window.scrollTo(0, 0)
    }

    const handleEditTesti = (t) => {
        setTestiForm({ ...t })
        setEditingTestiId(t.id)
        window.scrollTo(0, 0)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            setLoading(true)
            await supabase.from('products').delete().eq('id', id)
            await fetchProducts()
        }
    }

    const handleDeleteMessage = async (id) => {
        if (window.confirm("Yakin ingin menghapus pesan ini?")) {
            setLoading(true)
            await supabase.from('contact_messages').delete().eq('id', id)
            await fetchMessages()
        }
    }

    const handleDeleteTesti = async (id) => {
        if (window.confirm("Yakin ingin menghapus testimoni ini?")) {
            setLoading(true)
            await supabase.from('testimonials').delete().eq('id', id)
            await fetchTestimonials()
        }
    }

    const handleToggleActiveTesti = async (id, currentStatus) => {
        setLoading(true)
        await supabase.from('testimonials').update({ is_active: !currentStatus }).eq('id', id)
        await fetchTestimonials()
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Admin Panel</h1>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    Kelola Produk
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`pb-4 px-2 font-bold transition-colors flex items-center gap-2 ${activeTab === 'messages' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    Pesan Masuk {messages.length > 0 && <span className="bg-primary text-white text-xs py-0.5 px-2 rounded-full">{messages.length}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('testimonials')}
                    className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'testimonials' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    Kelola Testimoni
                </button>
            </div>

            {activeTab === 'products' && (
                <>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Nama Produk</label>
                                <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Merek (Brand)</label>
                                <input name="brand" value={form.brand} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Harga (Rp)</label>
                                <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Gambar Utama</label>
                                <div className="flex flex-col gap-2">
                                    <input type="file" accept="image/*" onChange={handleMainImageUpload} disabled={uploading} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer dark:text-slate-300" />
                                    {uploading && <p className="text-sm text-slate-500 dark:text-slate-400">Pemberitahuan: Sedang mengupload...</p>}
                                    <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Atau paste URL gambar di sini" required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" />
                                    {form.image_url && <img src={form.image_url} alt="Preview" className="h-20 w-20 object-cover rounded-lg mt-2 border border-slate-200 dark:border-slate-700" />}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Kondisi</label>
                                <select name="condition" value={form.condition} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white">
                                    <option>Refurbished</option>
                                    <option>Second Original</option>
                                    <option>Baru</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Kategori</label>
                                <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white">
                                    <option>Dental Unit (Fix)</option>
                                    <option>Portable Unit</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Gambar Tambahan (Gallery - Opsional)</label>
                                <div className="flex flex-col gap-2">
                                    <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} disabled={uploadingGallery} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 cursor-pointer dark:text-slate-300 dark:file:bg-slate-700 dark:file:text-white dark:hover:file:bg-slate-600" />
                                    {uploadingGallery && <p className="text-sm text-slate-500 dark:text-slate-400">Pemberitahuan: Sedang mengupload gambar tambahan...</p>}
                                    <textarea name="gallery_urls" value={form.gallery_urls || ''} onChange={handleChange} placeholder="Pisahkan URL langsung dengan enter (baris baru) jika ingin manual" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="3"></textarea>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Deskripsi Singkat Tambahan</label>
                                <textarea name="description" value={form.description || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="2"></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Fitur Unggulan & Spesifikasi Khusus</label>
                                <p className="text-xs text-slate-500 mb-2">Gunakan Enter (Baris Baru) untuk memisahkan setiap poin/bullet-list.</p>
                                <textarea name="features" value={form.features || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="3"></textarea>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Kelengkapan Unit</label>
                                <p className="text-xs text-slate-500 mb-2">Daftar part bawaan (Gunakan baris baru).</p>
                                <textarea name="inclusions" value={form.inclusions || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="3"></textarea>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Info Garansi</label>
                                <p className="text-xs text-slate-500 mb-2">Penjelasan klaim / durasi (Gunakan baris baru).</p>
                                <textarea name="warranty" value={form.warranty || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="3"></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50">
                                    {loading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Tambah Produk')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', brand: '', price: '', condition: 'Refurbished', category: 'Dental Unit (Fix)', description: '', image_url: '', gallery_urls: '', features: '', inclusions: '', warranty: '' }) }} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-300">
                                        Batal Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 font-semibold dark:text-slate-200">ID</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Nama Produk</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Harga</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="p-4 dark:text-slate-300">{p.id}</td>
                                        <td className="p-4 dark:text-slate-300 font-medium">{p.name}</td>
                                        <td className="p-4 dark:text-slate-300">Rp {p.price.toLocaleString('id-ID')}</td>
                                        <td className="p-4">
                                            <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 font-medium mr-4">Edit</button>
                                            <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && !loading && (
                                    <tr><td colSpan="4" className="p-4 text-center text-slate-500">Tidak ada produk ditemukan.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>)}

            {activeTab === 'messages' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 font-semibold dark:text-slate-200 whitespace-nowrap">Tanggal</th>
                                    <th className="p-4 font-semibold dark:text-slate-200 min-w-[200px]">Pengirim</th>
                                    <th className="p-4 font-semibold dark:text-slate-200 min-w-[300px]">Pesan</th>
                                    <th className="p-4 font-semibold dark:text-slate-200 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(m => (
                                    <tr key={m.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="p-4 dark:text-slate-300 text-sm whitespace-nowrap align-top">
                                            {new Date(m.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}<br />
                                            <span className="text-xs text-slate-500">{new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-slate-900 dark:text-white">{m.name}</div>
                                            {m.email && <div className="text-sm text-slate-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> {m.email}</div>}
                                            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> {m.phone}</div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">{m.subject}</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{m.message}</p>
                                        </td>
                                        <td className="p-4 text-right align-top">
                                            <div className="flex flex-col gap-2 items-end">
                                                <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}?text=Halo%20${m.name},%20menindaklanjuti%20pesan%20Anda%20di%20Website%20Karya%20Mandiri%20Dental...`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold bg-[#25D366] text-white px-3 py-1.5 rounded-lg hover:bg-[#20bd5a] flex items-center gap-1 w-max">
                                                    Balas via WA
                                                </a>
                                                <button onClick={() => handleDeleteMessage(m.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && !loading && (
                                    <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada pesan masuk.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'testimonials' && (
                <>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{editingTestiId ? 'Edit Testimoni' : 'Tambah Testimoni'}</h2>
                        <form onSubmit={handleTestiSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Nama Pelanggan (Dokter)</label>
                                <input name="customer_name" value={testiForm.customer_name} onChange={handleTestiChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Nama Klinik / Instansi</label>
                                <input name="clinic_name" value={testiForm.clinic_name || ''} onChange={handleTestiChange} placeholder="(Opsional)" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Isi Testimoni</label>
                                <textarea name="review" value={testiForm.review} onChange={handleTestiChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" rows="3"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Rating (Bintang 1-5)</label>
                                <select name="rating" value={testiForm.rating} onChange={handleTestiChange} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white">
                                    <option value="5">5 Bintang (Sangat Puas)</option>
                                    <option value="4">4 Bintang (Puas)</option>
                                    <option value="3">3 Bintang (Biasa)</option>
                                    <option value="2">2 Bintang (Kurang)</option>
                                    <option value="1">1 Bintang (Sangat Kurang)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 dark:text-slate-300">Foto Profil / Klinik (Opsional)</label>
                                <div className="flex flex-col gap-2">
                                    <input type="file" accept="image/*" onChange={handleTestiImageUpload} disabled={uploading} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer dark:text-slate-300" />
                                    {uploading && <p className="text-xs text-slate-500">Mengupload...</p>}
                                    <input name="image_url" value={testiForm.image_url || ''} onChange={handleTestiChange} placeholder="URL Gambar Foto Profil" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white text-sm" />
                                    {testiForm.image_url && <img src={testiForm.image_url} alt="Preview" className="h-12 w-12 object-cover rounded-full mt-2 border border-slate-200 dark:border-slate-700" />}
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 mt-2">
                                <input type="checkbox" id="is_active" name="is_active" checked={testiForm.is_active} onChange={handleTestiChange} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                                <label htmlFor="is_active" className="text-sm font-semibold dark:text-slate-300">Aktifkan & Tampilkan di Beranda</label>
                            </div>
                            <div className="md:col-span-2 flex gap-3 mt-4">
                                <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50">
                                    {loading ? 'Menyimpan...' : (editingTestiId ? 'Update Testimoni' : 'Simpan Testimoni')}
                                </button>
                                {editingTestiId && (
                                    <button type="button" onClick={() => { setEditingTestiId(null); setTestiForm({ customer_name: '', clinic_name: '', review: '', rating: 5, image_url: '', is_active: true }) }} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-300">
                                        Batal Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-4 font-semibold dark:text-slate-200 w-16">Foto</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Pelanggan</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Review</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Status</th>
                                    <th className="p-4 font-semibold dark:text-slate-200">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map(t => (
                                    <tr key={t.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="p-4">
                                            {t.image_url ?
                                                <img src={t.image_url} alt={t.customer_name} className="w-10 h-10 rounded-full object-cover" /> :
                                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 font-bold">{t.customer_name.charAt(0)}</div>
                                            }
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{t.customer_name}</div>
                                            <div className="text-sm text-slate-500">{t.clinic_name || '-'}</div>
                                            <div className="flex text-amber-500 mt-1">
                                                {[...Array(t.rating)].map((_, i) => <span key={i} className="material-symbols-outlined text-[14px]">star</span>)}
                                            </div>
                                        </td>
                                        <td className="p-4 max-w-[300px] truncate text-sm text-slate-700 dark:text-slate-300">
                                            {t.review}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleToggleActiveTesti(t.id, t.is_active)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${t.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}
                                            >
                                                {t.is_active ? 'Tampil' : 'Sembunyi'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button onClick={() => handleEditTesti(t)} className="text-blue-500 hover:text-blue-700 font-medium mr-4">Edit</button>
                                            <button onClick={() => handleDeleteTesti(t.id)} className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {testimonials.length === 0 && !loading && (
                                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">Belum ada testimoni.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}
