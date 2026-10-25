'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect, ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../supabaseClient';
export default function MedicalID() {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicalData() {
      if (!params?.id) return;
      
      // Mengambil data medis publik berdasarkan ID user tanpa perlu login
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (!error) setProfile(data);
      setLoading(false);
    }
    fetchMedicalData();
  }, [params]);

  if (loading) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">Memuat Data Penyelamat Nyawa...</main>;
  
  if (!profile) return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans p-6">
      <div className="text-center p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-sm">
        <p className="text-red-400 font-bold text-lg">⚠️ Data Tidak Ditemukan</p>
        <p className="text-xs text-gray-400 mt-2">Kartu NFC atau QR Code ini belum terdaftar atau profil medis belum diisi lengkap.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-red-950/20 py-10 px-4 text-white font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl shadow-2xl p-6 border-2 border-red-600/50 space-y-6 relative overflow-hidden">
        {/* Dekorasi Garis Darurat */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-pulse"></div>
        
        <div className="text-center space-y-1">
          <span className="bg-red-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            🚨 ICU MEDICAL ID
          </span>
          <h1 className="text-2xl font-black text-gray-100 pt-2 tracking-tight">{profile.full_name}</h1>
          <p className="text-xs text-amber-400 font-semibold tracking-wide">Student ID: {profile.student_id}</p>
        </div>

        {/* Indikator Golongan Darah */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between shadow-inner">
          <div>
            <p className="text-xs text-gray-400 font-medium">Golongan Darah</p>
            <p className="text-sm text-gray-300 font-bold mt-0.5">Blood Type</p>
          </div>
          <div className="w-16 h-16 bg-red-600/90 rounded-2xl flex items-center justify-center font-black text-3xl shadow-lg border border-red-500 animate-bounce">
            {profile.blood_type}
          </div>
        </div>

        {/* Informasi Alergi */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 space-y-1.5">
          <p className="text-xs text-red-400 font-bold tracking-wide uppercase">⚠️ Riwayat Alergi / Allergies:</p>
          <p className="text-sm text-gray-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-medium leading-relaxed">
            {profile.allergies || 'Tidak Ada Alergi'}
          </p>
        </div>

        {/* Kontak Wali Utama Darurat */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 space-y-3">
          <p className="text-xs text-amber-400 font-bold tracking-wide uppercase">📞 Kontak Darurat (ICE - In Case of Emergency):</p>
          <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div>
              <p className="font-bold text-gray-200 text-sm">{profile.ice_contact_name}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Wali / Orang Tua</p>
            </div>
            <a 
              href={`tel:${profile.ice_contact_phone}`}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-xl text-xs transition duration-200 shadow-md">
              PANGGIL WALI
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
