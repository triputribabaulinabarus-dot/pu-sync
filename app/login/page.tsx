'use client';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validasi domain email President University
    if (!email.endsWith('@student.president.ac.id') && !email.endsWith('@president.ac.id')) {
      setMessage('❌ Akses ditolak! Anda harus menggunakan email resmi President University (@student.president.ac.id).');
      setLoading(false);
      return;
    }

    // Mengirim Magic Link otomatis ke email mahasiswa via Supabase Auth
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile-setup`,
      },
    });

    if (error) {
      setMessage(`❌ Terjadi kesalahan: ${error.message}`);
    } else {
      setMessage('📩 Link masuk aman telah dikirim ke email kampus Anda! Silakan cek kotak masuk/spam email PresUniv Anda.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-950 p-6 text-white font-sans">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-800 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-amber-400">PU SYNC</h1>
          <p className="text-gray-400 text-sm">Gatekeeper - Khusus Mahasiswa & Staf</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Resmi Kampus</label>
            <input
              type="email"
              required
              placeholder="nama.kamu@student.president.ac.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 outline-none text-white text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold py-3 rounded-xl shadow-lg transition duration-200 disabled:opacity-50 text-sm"
          >
            {loading ? 'Memproses...' : 'Kirim Tautan Masuk 🚀'}
          </button>
        </form>
        
        {message && (
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-center text-xs font-medium text-amber-400">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}