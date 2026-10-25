'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MedicalID({ params }: PageProps) {
  // Unbox params secara aman menggunakan React.use() untuk Next.js terbaru
  const unwrappedParams = React.use(params);
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicalData() {
      if (!unwrappedParams?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('medical_records') // Ganti dengan nama tabel Supabase Anda jika berbeda
          .select('*')
          .eq('id', unwrappedParams.id)
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
  }, [unwrappedParams?.id]);

  if (loading) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading data medis...</div>;
  if (!profile) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Data profil tidak ditemukan.</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Medical ID Profile</h1>
      <hr />
      <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}