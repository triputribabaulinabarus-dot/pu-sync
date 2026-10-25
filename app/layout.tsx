import type { Metadata } from "next";
import "./globals.css"; // Hapus baris ini jika Anda tidak punya file globals.css

export const metadata: Metadata = {
  title: "PU Sync",
  description: "Medical ID NFC Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}