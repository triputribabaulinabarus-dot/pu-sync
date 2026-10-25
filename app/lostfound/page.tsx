'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
export default function LostFound() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('lost');
  const [contact, setContact] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('lost_and_found')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('item-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        alert('Gagal mengunggah gambar: ' + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from('item-images').getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const { error: insertError } = await supabase.from('lost_and_found').insert([
      {
        title,
        description,
        status,
        image_url: imageUrl,
        contact_number: contact,
      },
    ]);

    if (insertError) {
      alert('Gagal menyimpan laporan: ' + insertError.message);
    } else {
      alert('🎉 Laporan barang berhasil dikirim!');
      setTitle('');
      setDescription('');
      setContact('');
      setImageFile(null);
      fetchItems();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-blue-950 p-6 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-amber-400">Lost & Found Hub</h1>
          <p className="text-gray-400 text-sm mt-1">Laporkan barang hilang atau barang yang Anda temukan di area President University</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
            <h2 className="text-lg font-bold text-amber-400/90">📢 Buat Laporan Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Nama Barang</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Misal: Kunci Motor, KTM, dll" className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Status Laporan</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="lost">❌ Hilang (Lost)</option>
                  <option value="found">✅ Ditemukan (Found)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Deskripsi & Lokasi Kejadian</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tulis detail barang..." className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-400" rows={3} />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Nomor WhatsApp Pelapor</label>
                <input type="tel" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="62812xxxx" className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Foto Barang (Opsional)</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-blue-950 hover:file:bg-amber-600 file:cursor-pointer" />


              <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold py-2.5 rounded-xl shadow-lg transition duration-200">
                {loading ? 'Mengirim...' : 'Kirim Laporan 🚀'}
              </button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-amber-400/90">📋 Daftar Barang Terkini</h2>
            {items.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10 bg-slate-900 rounded-2xl border border-slate-800">Belum ada laporan barang saat ini.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                    {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-base text-gray-100">{item.title}</h3>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${item.status === 'lost' ? 'bg-red-950 text-red-400' : 'bg-green-950 text-green-400'}`}>
                            {item.status === 'lost' ? 'Hilang' : 'Ditemukan'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-3">{item.description}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                        <a href={`https://wa.me{item.contact_number}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-xs">Hubungi Wali</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}