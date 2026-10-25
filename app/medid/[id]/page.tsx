'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../supabaseClient';

export default function MedicalID() {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicalData() {
      if (!params?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('medical_records') // Ganti dengan nama tabel Supabase Anda jika berbeda
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedicalData();
  }, [params?.id]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  if (!profile) return <div style={{ padding: '20px', textAlign: 'center' }}>Data tidak ditemukan.</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Medical ID Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}