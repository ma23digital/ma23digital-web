'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="MA23DIGITAL Logo" 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
          MA23DIGITAL
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center text-sm font-medium">
        <Link href="/#beranda" className="hover:text-lime-400 transition">Beranda</Link>
        <Link href="/#tentang" className="hover:text-lime-400 transition">Tentang Kami</Link>
        <Link href="/#layanan" className="hover:text-lime-400 transition">Layanan</Link>
        <Link href="/#portofolio" className="hover:text-lime-400 transition">Portofolio</Link>
        <Link href="/#kontak" className="hover:text-lime-400 transition">Kontak</Link>
        <Link href="/invoice" className="bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold hover:opacity-90 transition">
          Coba Invoice Gratis
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-slate-300 hover:text-white focus:outline-none p-1"
        aria-label="Toggle Menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 flex flex-col p-6 space-y-4 md:hidden shadow-xl">
          <Link href="/#beranda" onClick={() => setIsOpen(false)} className="hover:text-lime-400 transition">Beranda</Link>
          <Link href="/#tentang" onClick={() => setIsOpen(false)} className="hover:text-lime-400 transition">Tentang Kami</Link>
          <Link href="/#layanan" onClick={() => setIsOpen(false)} className="hover:text-lime-400 transition">Layanan</Link>
          <Link href="/#portofolio" onClick={() => setIsOpen(false)} className="hover:text-lime-400 transition">Portofolio</Link>
          <Link href="/#kontak" onClick={() => setIsOpen(false)} className="hover:text-lime-400 transition">Kontak</Link>
          <Link href="/invoice" onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-950 px-4 py-2.5 rounded-lg font-bold text-center hover:opacity-90 transition">
            Coba Invoice Gratis
          </Link>
        </div>
      )}
    </nav>
  );
}