import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
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
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link href="/#beranda" className="hover:text-lime-400 transition">Beranda</Link>
        <Link href="/#tentang" className="hover:text-lime-400 transition">Tentang Kami</Link>
        <Link href="/#layanan" className="hover:text-lime-400 transition">Layanan</Link>
        <Link href="/#portofolio" className="hover:text-lime-400 transition">Portofolio</Link>
        <Link href="/#kontak" className="hover:text-lime-400 transition">Kontak</Link>
        <Link href="/invoice" className="bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold hover:opacity-90 transition">
          Coba Invoice Gratis
        </Link>
      </div>
    </nav>
  );
}