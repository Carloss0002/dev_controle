import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/providers/auth'
import { ModalProvider } from '@/providers/modal'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Controle - Seu Sistema de gerenciamento",
  description: "Gerencie seus clientes e atendimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ModalProvider>
            <Header/>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
