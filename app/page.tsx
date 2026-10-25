'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MedicalID({ params }: PageProps) {
  // Membaca params secara aman untuk Next.js terbaru
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

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!profile) return <div style={{ padding: '20px' }}>Data tidak ditemukan.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Medical ID Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}