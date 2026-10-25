import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PU SYNC - President University Hub",
  description: "Integrated Emergency and Student Portal",
};

export default function MedicalIDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
    <html lang="en">
      <body className="min-h-screen bg-blue-950 text-white flex flex-col antialiased">
        
        {/* UNIVERSAL GLOBAL NAVBAR */}
        <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Logo Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black text-amber-400 tracking-tight">
                PU SYNC
              </span>
              <span className="bg-red-600/20 text-red-400 border border-red-900 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Campus Portal
              </span>
            </Link>

            {/* Menu Navigasi Link */}
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-xs font-bold text-gray-300">
              <Link href="/" className="px-3 py-2 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition">
                🏠 Dashboard
              </Link>
              <Link href="/lostfound" className="px-3 py-2 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition">
                📦 Lost & Found
              </Link>
              <Link href="/profile-setup" className="px-3 py-2 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition">
                📝 Med Profile
              </Link>
              <Link href="/medid/test-user" className="px-3 py-2 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition">
                🚨 ICU Medical ID
              </Link>
              <Link href="/login" className="ml-2 bg-amber-500 hover:bg-amber-600 text-blue-950 px-4 py-2 rounded-xl shadow transition font-black">
                Login 🔐
              </Link>
            </div>

          </div>
        </nav>

        {/* Dynamic content page changes here */}
        <div className="flex-1 w-full flex items-center justify-center">
        </div>

      </body>
    </html>


