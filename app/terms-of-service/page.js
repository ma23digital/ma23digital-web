import Link from 'next/link';

export const metadata = {
  title: 'Syarat & Ketentuan | MA23DIGITAL',
  description: 'Syarat dan Ketentuan penggunaan layanan MA23DIGITAL.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <Link href="/" className="inline-block text-emerald-400 font-semibold text-sm hover:underline mb-4">
          ← Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black text-white border-b border-slate-700 pb-4">
          Syarat & Ketentuan (Terms of Service)
        </h1>
        
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Terakhir diperbarui: September 2026. Dengan mengakses dan menggunakan situs **MA23DIGITAL**, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">1. Penggunaan Layanan Gratis</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Layanan pembuat invoice online disediakan secara gratis "apa adanya" (as-is). MA23DIGITAL tidak bertanggung jawab atas kerugian finansial atau kekeliruan data yang timbul dari penggunaan dokumen invoice yang dihasilkan.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">2. Hak Kekayaan Intelektual</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Seluruh elemen desain, kode program, logo, dan konten portofolio di situs MA23DIGITAL merupakan hak cipta yang dilindungi. Pengguna dilarang menyalin atau mendistribusikan ulang elemen situs tanpa izin tertulis.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">3. Perubahan Ketentuan</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            MA23DIGITAL berhak memperbarui Syarat dan Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-700 pt-6">
          <h2 className="text-lg font-bold text-white">Hubungi Kami</h2>
          <p className="text-slate-300 text-sm">
            Untuk pertanyaan terkait syarat layanan, silakan hubungi kami melalui formulir kontak di beranda.
          </p>
        </section>
      </div>
    </div>
  );
}