import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi | MA23DIGITAL',
  description: 'Kebijakan Privasi MA23DIGITAL mengenai perlindungan dan pengolahan data pengguna.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 md:p-12 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <Link href="/" className="inline-block text-emerald-400 font-semibold text-sm hover:underline mb-4">
          ← Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black text-white border-b border-slate-700 pb-4">
          Kebijakan Privasi (Privacy Policy)
        </h1>
        
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Terakhir diperbarui: September 2026. Selamat datang di **MA23DIGITAL**. Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan kepada kami.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">1. Pengolahan Data Invoice Online</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Layanan <i>Alat Pembuat Invoice Online Gratis</i> di situs MA23DIGITAL beroperasi penuh di sisi klien (client-side browser). Seluruh data transaksi, nama perusahaan, nilai tagihan, dan file logo yang Anda unggah **tidak disimpan** di server kami, melainkan diolah langsung di peramban Anda.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">2. Pengumpulan Data Analitis & Cookies</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Kami dapat menggunakan layanan analitik pihak ketiga (seperti Google Analytics atau Google AdSense) yang menggunakan <i>cookies</i> untuk mengumpulkan informasi anonim mengenai lalu lintas situs, preferensi pengunjung, dan kinerja iklan untuk meningkatkan pengalaman pengguna.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-emerald-400">3. Keamanan Data</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Kami menerapkan langkah-langkah keamanan teknis standar industri untuk menjaga integritas dan keamanan layanan kami.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-700 pt-6">
          <h2 className="text-lg font-bold text-white">Hubungi Kami</h2>
          <p className="text-slate-300 text-sm">
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, Anda dapat menghubungi kami melalui kontak yang tersedia di halaman utama MA23DIGITAL.
          </p>
        </section>
      </div>
    </div>
  );
}