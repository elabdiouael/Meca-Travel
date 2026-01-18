import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // Import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MecaTravel - Hajj & Omra",
  description: "Agence de voyage spécialisée Hajj et Omra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider> {/* WRAP HERE */}
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}