import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-6xl md:text-8xl font-black text-emerald-400 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-400 max-w-md mb-6 text-sm md:text-base">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm transition shadow-lg"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}