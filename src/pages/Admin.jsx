import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        name: '', brand: '', price: '', condition: 'Refurbished', category: 'Dental Unit (Fix)', description: '', image_url: '', gallery_urls: '',
        features: '', inclusions: '', warranty: ''
    })
    const [editingId, setEditingId] = useState(null)

    const [uploading, setUploading] = useState(false)
    const [uploadingGallery, setUploadingGallery] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        setLoading(true)
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data) setProducts(data)
        setLoading(false)
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

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

    const handleEdit = (p) => {
        setForm({ ...p })
        setEditingId(p.id)
        window.scrollTo(0, 0)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            setLoading(true)
            await supabase.from('products').delete().eq('id', id)
            await fetchProducts()
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Admin Panel - Kelola Produk</h1>

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
        </div>
    )
}
