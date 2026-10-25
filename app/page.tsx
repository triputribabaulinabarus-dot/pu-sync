'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
 const [contacts, setContacts] = useState<any[]>([]);


  // 1. Mengambil data kontak darurat dari Supabase saat web dibuka
  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase.from('emergency_contacts').select('*');
      if (!error) setContacts(data);
    }
    fetchContacts();
  }, []);

  // 2. Fungsi Fitur Share My Location (Salin GPS Otomatis)
  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser kamu tidak mendukung GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const mapsLink = `https://google.com{latitude},${longitude}`;
      
      navigator.clipboard.writeText(mapsLink);
      alert("🚨 Koordinat GPS berhasil disalin! Silakan kirimkan ke Pos Keamanan atau teman terdekat via WhatsApp.");
    });
  };

  return (
    <main className="min-h-screen bg-blue-950 p-6 text-white font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-800 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-amber-400">PU SYNC</h1>
          <p className="text-gray-400 text-sm">President University Emergency Hub</p>
        </div>
        
        {/* Tombol SOS / Share Location */}
        <div className="bg-red-950/40 p-4 rounded-xl border border-red-900/60 text-center space-y-3">
          <p className="text-sm text-red-300 font-medium">🚨 Merasa tidak aman di area kampus?</p>
          <button 
            onClick={shareLocation}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200">
            📍 Share My Location (Salin GPS)
          </button>
        </div>

        {/* Daftar Kontak Darurat dari Database */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-amber-400/90 mb-1">☎️ Kontak Darurat Kampus</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex justify-between items-center p-3 bg-slate-800/80 rounded-xl border border-slate-700/50">
                <div>
                  <p className="font-semibold text-gray-200 text-sm">{contact.name}</p>
                  <p className="text-xs text-amber-500/80 font-medium">{contact.category}</p>
                </div>
                <a 
                  href={`tel:${contact.phone}`} 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition">
                  Hubungi
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
