'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

function MedicalIDContent({ params }: PageProps) {
  // Membaca params secara asinkronus (Wajib untuk Next.js 15)
  const resolvedParams = React.use(params);
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicalData() {
      if (!resolvedParams?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('medical_records') 
          .select('*')
          .eq('id', resolvedParams.id)
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
  }, [resolvedParams?.id]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Data...</div>;
  if (!profile) return <div style={{ padding: '20px', textAlign: 'center' }}>Data tidak ditemukan.</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Medical ID Profile</h1>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}

// Komponen Utama yang diexport membungkus konten dengan Suspense agar lolos Vercel Build
export default function MedicalID({ params }: PageProps) {
  return (
    <React.Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}>
      <MedicalIDContent params={params} />
    </React.Suspense>
  );
}