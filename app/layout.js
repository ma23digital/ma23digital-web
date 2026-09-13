import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'ma23digital | Jasa Pengembang Web & Rekayasa Perangkat Lunak Bandung',
  description: 'Portofolio ma23digital - Layanan pembuatan aplikasi web kustom, optimasi backend Laravel/CI4, serta pembuat invoice gratis online.',
  keywords: ['jasa pembuatan web bandung', 'software engineer bandung', 'pembuat invoice gratis', 'ma23digital'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}