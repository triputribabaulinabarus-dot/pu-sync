'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../supabaseClient';

export default function ProfileSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    student_id: '',
    blood_type: 'O',
    allergies: '',
    ice_contact_name: '',
    ice_contact_phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mengambil user yang sedang aktif login
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert('Silakan login terlebih dahulu menggunakan email kampus Anda!');
      router.push('/login');
      setLoading(false);
      return;
    }

    // Simpan data formulir medis mahasiswa ke database Supabase cloud
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...formData,
      updated_at: new Date()
    });

    if (error) {
      alert(`Gagal menyimpan data: ${error.message}`);
    } else {
      alert('🎉 Profil Medis Anda berhasil diaktifkan! Kartu ICU Medical ID Anda kini sudah aktif.');
      router.push('/'); // Alihkan kembali ke halaman dashboard utama setelah sukses
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-blue-950 py-10 px-4 text-white font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-800 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-400">Formulir Profil Medis</h1>
          <p className="text-xs text-gray-400 mt-1">Lengkapi data penyelamat nyawa ini untuk mengaktifkan fitur kartu ICU Medical ID Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Nama Lengkap</label>
            <input type="text" required className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none" 
              onChange={e => setFormData({...formData, full_name: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">NIM (Student ID)</label>
            <input type="text" required placeholder="001202..." className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none" 
              onChange={e => setFormData({...formData, student_id: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Golongan Darah</label>
            <select className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none"
              onChange={e => setFormData({...formData, blood_type: e.target.value})}>
              <option value="O">O</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Riwayat Alergi (Obat / Makanan)</label>
            <textarea placeholder="Tulis 'Tidak Ada' jika bersih" className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none" rows={2}
              onChange={e => setFormData({...formData, allergies: e.target.value})} />
          </div>

          <div className="border-t border-slate-800 pt-4">
            <h3 className="font-semibold text-red-400 text-sm mb-3">📞 Kontak Darurat Keluarga (ICE)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Nama Wali / Orang Tua</label>
                <input type="text" required className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none" 
                  onChange={e => setFormData({...formData, ice_contact_name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">No. HP Aktif Wali</label>
                <input type="tel" required placeholder="0812..." className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-400 outline-none" 
                  onChange={e => setFormData({...formData, ice_contact_phone: e.target.value})} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold py-3 rounded-xl shadow-lg transition duration-200 text-sm disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan & Aktifkan Fitur 🛡️'}
          </button>
        </form>
      </div>
    </main>
  );
}
