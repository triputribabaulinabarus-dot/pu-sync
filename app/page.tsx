'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>PU Sync Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Selamat datang! Pilih fitur yang ingin Anda akses di bawah ini:</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* FITUR 1: MEDICAL ID */}
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0070f3' }}>🩺 Fitur Medical ID</h3>
          <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>
            Akses dan kelola data rekam medis digital yang terhubung dengan kartu NFC.
          </p>
          <Link href="/medid/test-id" style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Buka Medical ID
          </Link>
        </div>

        {/* FITUR 2: AKAN DATANG / FITUR LAIN */}
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#10b981' }}>🔄 Fitur PU Sync</h3>
          <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px' }}>
            Fitur sinkronisasi data akademik dan informasi kampus President University.
          </p>
          <Link href="/pusync" style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Buka PU Sync
          </Link>
        </div>

        {/* Anda bisa menduplikat kotak di atas jika nanti punya fitur ke-3, ke-4, dst. */}
      </div>
    </div>
  );
}