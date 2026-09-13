'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const portfolioData = [
    {
      id: 'crm-gic',
      category: 'KUSTOMISASI CRM & AUTOMATION',
      categoryColor: 'text-lime-600',
      title: 'Pengembangan Modul Custom Perfex CRM (GIC)',
      desc: 'Pengembangan modul Marketing Automation Segment, penambahan custom field filter segment, otomasi Lead Rotation via Cron Job, serta pencatatan Notes pada Leads.',
      detailDesc: 'Proyek modifikasi dan pengembangan tingkat lanjut pada Perfex CRM untuk operasional GIC. Cakupan pengerjaan meliputi perancangan modul Marketing Automation Segment, integrasi kustom penambahan field filter target audience, sinkronisasi penjadwalan rotasi lead otomatis berbasis Cron Job server, serta pencatatan riwayat notes pada Leads.',
      video: '/portofolio/crm/CRM - GIC.mp4',
      images: [
        '/portofolio/crm/CRM GIC - Marketing Automation Segment.png',
        '/portofolio/crm/CRM GIC - Add Field In Filter Segment.png',
        '/portofolio/crm/CRM GIC - Leads.png',
        '/portofolio/crm/CRM GIC - Add Notes in Leads.png',
        '/portofolio/crm/CRM GIC - Setting Cron Time Lead Rotation.png',
      ],
    },
    {
      id: 'deteksi-penyakit',
      category: 'SISTEM INFORMASI KESEHATAN',
      categoryColor: 'text-teal-600',
      title: 'Sistem Informasi Deteksi Penyakit & Skrining Kesehatan',
      desc: 'Pengembangan sistem informasi medis interaktif untuk analisa awal, skrining indikasi gejala penyakit, serta manajemen data diagnosa kesehatan.',
      detailDesc: 'Aplikasi berbasis sistem informasi kesehatan yang dirancang untuk membantu alur skrining dan deteksi awal indikasi penyakit berdasarkan kumpulan gejala medis. Dilengkapi antarmuka pemantauan diagnosa, manajemen kriteria analisa kesehatan, serta visualisasi hasil evaluasi untuk mendukung analisis medis terstruktur.',
      images: [
        '/portofolio/deteksi-penyakit/Screenshot 2025-10-16 092443.png',
        '/portofolio/deteksi-penyakit/Screenshot 2025-10-31 090723.png',
        '/portofolio/deteksi-penyakit/Screenshot 2025-10-31 090811.png',
        '/portofolio/deteksi-penyakit/Screenshot 2025-10-31 090834.png',
        '/portofolio/deteksi-penyakit/Screenshot 2025-10-31 090907.png',
      ],
    },
    {
      id: 'savara-umrah',
      category: 'PORTAL RESERVASI UMRAH & HAJI',
      categoryColor: 'text-emerald-600',
      title: 'Platform Reservasi Umrah & Haji Terpadu (Savara)',
      desc: 'Pengembangan platform digital reservasi paket Umrah & Haji terkurasi, filter pencarian fleksibel, informasi detail itinerary perjalanan ibadah, dan portal pendaftaran jemaah.',
      detailDesc: 'Platform portal web modern "Savara (Savar Arabia)" untuk reservasi paket Umrah, Haji Plus, dan Land Arrangement. Dilengkapi sistem filter dinamis berdasarkan jenis paket, tanggal keberangkatan, durasi, hingga rentang harga. Menyediakan detail transparan fasilitas maskapai, akomodasi hotel, serta portal otentikasi pendaftaran akun jemaah.',
      images: [
        '/portofolio/savara/savara-1.png',
        '/portofolio/savara/savara-2.png',
        '/portofolio/savara/savara-3.png',
        '/portofolio/savara/savara-4.png',
        '/portofolio/savara/savara-5.png',
      ],
    },
    {
      id: 'travel',
      category: 'BOOKING & TRAVEL',
      categoryColor: 'text-blue-600',
      title: 'Platform Travina Traveling Indonesia & Booking Travel',
      desc: 'Pengembangan platform digital agen travel terverifikasi, pencarian paket wisata populer, kustomisasi perjalanan (Custom Trip), serta sistem otentikasi registrasi pengguna.',
      detailDesc: 'Platform marketplace dan informasi travel digital "Travina Traveling Indonesia". Memfasilitasi pengguna dalam menemukan agen travel terpercaya, memilih paket wisata populer (seperti Nusa Penida East Coast), menyusun rencana perjalanan custom (Custom Trip Indonesia), serta fitur otentikasi Login & Register terintegrasi verifikasi WhatsApp OTP.',
      images: [
        '/portofolio/travina/travina-1.png',
        '/portofolio/travina/travina-2.png',
        '/portofolio/travina/travina-3.png',
        '/portofolio/travina/travina-4.png',
        '/portofolio/travina/travina-5.png',
        '/portofolio/travel/Booking.png',
        '/portofolio/travel/Booking1.png',
      ],
    },
    {
      id: 'crm-kesehatan',
      category: 'MODIFIKASI & KLINIK',
      categoryColor: 'text-emerald-600',
      title: 'Kustomisasi Perfex CRM Layanan Kesehatan',
      desc: 'Penyesuaian modul operasional Perfex CRM untuk mendukung layanan fasilitas kesehatan, rekam medis pasien, dan penjadwalan janji temu.',
      detailDesc: 'Pengembangan dan penyesuaian alur kerja Perfex CRM khusus untuk kebutuhan manajemen klinik dan fasilitas kesehatan. Mencakup penyesuaian struktur data pendaftaran pasien, otomatisasi reminder alur layanan medis, serta dasbor pemantauan aktivitas medis.',
      images: [
        '/portofolio/crm/Perfex CRM Layanan Kesehatan.png',
      ],
    },
    {
      id: 'invoice',
      category: 'ALAT GRATIS',
      categoryColor: 'text-purple-600',
      title: 'Alat Pembuat Invoice Online Gratis',
      desc: 'Aplikasi web pembuat faktur/tagihan bisnis instan tanpa registrasi dengan fitur simpan PDF.',
      detailDesc: 'Tools web buatan MA23DIGITAL yang memungkinkan pelaku usaha kecil dan freelancer membuat tagihan profesional dalam hitungan detik dan mengekspornya langsung ke format PDF.',
      images: ['/portofolio/invoice-preview.jpg'],
      isLink: '/invoice',
    },
    {
      id: 'steak-indonesia',
      category: 'ENTERPRISE DASHBOARD & MANAGEMENT',
      categoryColor: 'text-orange-600',
      title: 'Dashboard Steak Indonesia (Multi-Role Management)',
      desc: 'Pengembangan portal dashboard internal terintegrasi berbasis Laravel dengan kontrol akses multi-role (HRD, Marketing, Finance, Ops) dan integrasi modul aplikasi bisnis.',
      detailDesc: 'Aplikasi portal internal Steak Indonesia berbasis Laravel framework. Sistem ini memiliki manajemen otentikasi ketat berbasis Role & Application Privilege (Superadmin, HRD, Marketing, Operational, Finance, Project, Digital Assets). Fitur utama meliputi sinkronisasi data user instan/import Excel, pengatasan hak akses berbasis divisi, serta integrasi pemanggilan aplikasi eksternal (seperti Relevance AI dan Portal Sosmed Steak Indonesia) secara seamless.',
      video: '/portofolio/steak/Dashboard Steak Indonesia.mp4',
      images: [
        '/portofolio/steak/Dashboard Steak Indonesia.png',
      ],
    },
    {
      id: 'qms',
      category: 'APLIKASI OFFICE & SDM',
      categoryColor: 'text-cyan-600',
      title: 'Development Aplikasi Office QMS & SDM',
      desc: 'Pengembangan sistem internal terpadu mencakup Manajemen SDM, Dashboard Statistik, Pengolahan Data Karyawan, Laporan Karyawan, dan Log Aktivitas.',
      detailDesc: 'Sistem manajemen internal terpadu Quality Management System (QMS) dan SDM. Mencakup halaman otentikasi (Login), Dasbor pemantauan utama, manajemen Data Karyawan, analisis Laporan Karyawan, serta fitur audit trail pencatatan Log Aktivitas pengguna untuk transparansi dan keamanan sistem.',
      video: '/portofolio/qms/Aplikasi Office - QSM.mp4',
      images: [
        '/portofolio/qms/Aplikasi QMS - Dashboard.png',
        '/portofolio/qms/Aplikasi QMS - Data Karyawan.png',
        '/portofolio/qms/Aplikasi QMS - Laporan Karyawan.png',
        '/portofolio/qms/Aplikasi QMS - Log Aktifitas.png',
        '/portofolio/qms/Aplikasi QMS - Login.png',
      ],
    },
    {
      id: 'performance-tracking',
      category: 'ENHANCEMENT & MODIFIKASI SISTEM',
      categoryColor: 'text-indigo-600',
      title: 'Enhancement & Modifikasi Sistem Performance Tracking (Maverick)',
      desc: 'Pengembangan dan modifikasi modul Performance Tracking mencakup monitoring kinerja Business Unit (BU), Initiatives Tracking, serta form input data performa.',
      detailDesc: 'Proyek modifikasi dan enhancement pada platform sistem manajemen kinerja internal (Maverick Performance Tracking). Pengerjaan meliputi penyesuaian visualisasi indikator pencapaian kinerja Business Unit, pemantauan status inisiatif strategis (Initiatives Detail Performance Tracking), serta optimasi alur dan penginputan data performa periodik.',
      video: '/portofolio/performance-tracking/Maverick - Performance Tracking Demo.mp4',
      images: [
        '/portofolio/performance-tracking/Maverick - Detail Performance Tracking Bu.png',
        '/portofolio/performance-tracking/Maverick - Initiatives Detail Performance Tracking.png',
        '/portofolio/performance-tracking/Maverick - Input Detail Performance Tracking Bu.png',
        '/portofolio/performance-tracking/Maverick - Input Initiatives Detail Performance Tracking.png',
      ],
    },
    {
      id: 'sinav',
      category: 'DOKUMENTASI SISTEM & KEMENTERIAN',
      categoryColor: 'text-amber-600',
      title: 'Dokumentasi Manual Book & Prototype SiNav 5.0 (KLHK)',
      desc: 'Penyusunan User Manual komprehensif untuk Sistem Navigasi Perhutanan Sosial (SiNav 5.0) mencakup fitur WebGIS, Statistik Multitier, dan Video Conference.',
      detailDesc: 'Penyusunan dokumen petunjuk penggunaan (Manual Book) resmi untuk portal SiNav Kementerian Lingkungan Hidup dan Kehutanan (KLHK). Dokumentasi mencakup panduan mengoperasikan peta WebGIS sebaran hutan adat/izin lokasi, analisis statistik capaian (Level 1-3), hingga integrasi fitur video conference interaktif stakeholder.',
      images: [
        '/portofolio/sinav/sinav-1.png',
        '/portofolio/sinav/sinav-2.png',
        '/portofolio/sinav/sinav-3.png',
        '/portofolio/sinav/sinav-4.png',
        '/portofolio/sinav/sinav-5.png',
      ],
    },
    {
      id: 'mr',
      category: 'DOKUMENTASI MANAJEMEN RISIKO BUMN',
      categoryColor: 'text-rose-600',
      title: 'Analisa & Rancangan Sistem Manajemen Risiko (PT RNI)',
      desc: 'Penyusunan dokumen identifikasi risiko, Kriteria Peluang & Dampak, Bagan Siklus MR, serta Matriks Inheren Risk & Residual Risk PT RNI (Persero).',
      detailDesc: 'Perancangan dokumen teknis dan sistem Manajemen Risiko (MR) untuk holding BUMN Pangan. Dokumentasi ini memuat bagan usulan proses MR (Sasaran, Risiko, Mitigasi, Rencana), pemetaan Profil Risiko Inheren Rencana Jangka Panjang Perusahaan (RJPP), hingga matriks skoring Inheren Risk vs Residual Risk berdasarkan RKAP perusahaan.',
      images: [
        '/portofolio/mr/mr-1.png',
        '/portofolio/mr/mr-2.png',
        '/portofolio/mr/mr-3.png',
      ],
    },
  ];

  // Handler Navigasi Next & Prev Gambar
  const handlePrevImage = useCallback(() => {
    if (!activeModal || !activeModal.images) return;
    setShowVideo(false);
    setActiveImgIdx((prevIdx) =>
      prevIdx === 0 ? activeModal.images.length - 1 : prevIdx - 1
    );
  }, [activeModal]);

  const handleNextImage = useCallback(() => {
    if (!activeModal || !activeModal.images) return;
    setShowVideo(false);
    setActiveImgIdx((prevIdx) =>
      prevIdx === activeModal.images.length - 1 ? 0 : prevIdx + 1
    );
  }, [activeModal]);

  // Listener Navigasi Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModal) return;

      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, handlePrevImage, handleNextImage]);

  const openModal = (item) => {
    setActiveImgIdx(0);
    setShowVideo(false);
    setActiveModal(item);
  };

  return (
    <main className="space-y-20 pb-20 bg-slate-50 text-slate-800">
      {/* 1. Hero */}
      <section id="beranda" className="min-h-[80vh] flex flex-col justify-center items-center text-center p-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="mb-4">
          <Image src="/logo.png" alt="MA23DIGITAL Logo" width={130} height={130} className="rounded-full shadow-lg shadow-cyan-500/20" />
        </div>

        <h1 className="text-lg md:text-2xl font-semibold text-slate-200 max-w-2xl mb-3 leading-relaxed tracking-wide">
          Jasa Pengembangan Website, <br className="hidden md:inline" />
          Dokumentasi Aplikasi & Pengolahan Data
        </h1>

        <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          MA23DIGITAL — SINCE 2023
        </p>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Mitra teknologi untuk mengembangkan website dan aplikasi, menyusun dokumentasi sistem, serta mengolah data sesuai dengan kebutuhan bisnis Anda.
        </p>

        <div className="flex gap-4">
          <Link href="#layanan" className="bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg shadow-lime-500/20">
            Jelajahi Layanan
          </Link>
          <Link href="/invoice" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold border border-slate-700 transition">
            Coba Invoice Gratis
          </Link>
        </div>
      </section>

      {/* 2. Tentang MA23DIGITAL */}
      <section id="tentang" className="max-w-5xl mx-auto p-6 scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-4 border-lime-500 pb-2 inline-block">
          Tentang MA23DIGITAL
        </h2>
        
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 space-y-6">
          <p className="text-slate-700 leading-relaxed text-base">
            <strong>MA23DIGITAL</strong> adalah layanan pengembangan software yang didirikan oleh Maulana Septiyadi, seorang Software Engineer dengan pengalaman lebih dari 11 tahun dalam pengembangan software dan aplikasi bisnis.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm">
            Sejak 2023, MA23DIGITAL hadir untuk membantu bisnis dan organisasi dalam membangun website, mengembangkan custom system, memperbaiki aplikasi, menyusun dokumentasi, serta mengolah data sesuai kebutuhan.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm">
            Berpengalaman menangani sistem yang digunakan dalam lingkungan production, kami mengutamakan stabilitas, keamanan, performa, dan kemudahan pemeliharaan. Bagi kami, solusi teknologi bukan sekadar aplikasi yang selesai dibuat, tetapi sistem yang dapat digunakan, dikembangkan, dan dipelihara dalam jangka panjang.
          </p>

          <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm mb-1">11+ Tahun Pengalaman</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pengembangan ditangani langsung oleh praktisi berpengalaman di bidang software development dan aplikasi bisnis.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm mb-1">Sesuai Kebutuhan Bisnis</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Solusi dirancang berdasarkan kebutuhan, alur kerja, dan permasalahan bisnis yang ingin diselesaikan.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm mb-1">Fokus pada Kualitas Sistem</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Memperhatikan struktur, stabilitas, performa, keamanan, dan kemudahan pengembangan sejak proses awal.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm mb-1">Dukungan Berkelanjutan</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tersedia layanan bug fixing, maintenance, dan pengembangan lanjutan setelah project selesai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Layanan Utama */}
      <section id="layanan" className="max-w-5xl mx-auto p-6 scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 border-b-4 border-lime-500 pb-2 inline-block">
          Layanan Utama
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Solusi teknologi yang disesuaikan dengan kebutuhan bisnis, mulai dari membangun sistem baru, mengembangkan sistem yang sudah ada, hingga menyiapkan dokumentasi dan pengolahan data.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-2xl border border-slate-100 hover:border-lime-400 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-lime-100 text-lime-700 rounded-xl flex items-center justify-center font-bold text-xl mb-4">01</div>
              <h3 className="font-bold text-xl mb-2 text-slate-800">Pengembangan Website & Sistem Custom</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pembuatan website dan aplikasi web yang responsif dan sesuai kebutuhan bisnis, termasuk sistem booking, travel, CRM, ERP, sistem internal, serta integrasi Payment Gateway dan API.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl border border-slate-100 hover:border-cyan-400 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-cyan-100 text-cyan-700 rounded-xl flex items-center justify-center font-bold text-xl mb-4">02</div>
              <h3 className="font-bold text-xl mb-2 text-slate-800">Kustomisasi, Bug Fixing & Maintenance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pengembangan dan perbaikan sistem yang sudah berjalan, mulai dari penambahan fitur, kustomisasi aplikasi, bug fixing, migrasi sistem atau database, hingga peningkatan performa.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl border border-slate-100 hover:border-blue-400 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl mb-4">03</div>
              <h3 className="font-bold text-xl mb-2 text-slate-800">Dokumentasi Teknis & Pengolahan Data</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Penyusunan Manual Book, dokumentasi teknis, dokumentasi arsitektur, dan skema database, serta pengolahan data terstruktur menggunakan MySQL, PostgreSQL, dan Oracle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portofolio Pilihan */}
      <section id="portofolio" className="max-w-5xl mx-auto p-6 scroll-mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 border-b-4 border-lime-500 pb-2 inline-block">
          Portofolio Pilihan
        </h2>
        <p className="text-slate-600 text-sm mb-8">
          Klik pada setiap kartu proyek di bawah ini untuk melihat dokumen screenshot, video demo, dan detail proyek.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => openModal(item)}
              className="p-6 bg-white shadow-md rounded-2xl border border-slate-100 hover:border-lime-500 transition cursor-pointer group flex flex-col justify-between hover:shadow-xl text-left"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${item.categoryColor}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-blue-600 font-bold group-hover:underline">
                    {item.video ? '▶ Putar Video' : 'Lihat Dokumen →'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL PREVIEW DENGAN SLIDER GAMBAR DAN PEMUTAR VIDEO */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl relative border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup X */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 z-50 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-slate-700 transition"
              title="Tutup (Esc)"
            >
              ✕
            </button>

            {/* Layout 2 Kolom Berdampingan */}
            <div className="grid md:grid-cols-12 min-h-[380px] max-h-[85vh]">
              {/* KOLOM KIRI: Media Pemutar Video atau Gambar Screenshot */}
              <div className="md:col-span-7 bg-slate-900 p-4 flex flex-col justify-between items-center relative group min-h-[280px]">
                
                {/* Tampilan Pemutar Video Langsung */}
                {showVideo && activeModal.video ? (
                  <div className="w-full h-full flex flex-col items-center justify-center my-auto">
                    <video 
                      controls 
                      autoPlay
                      preload="none"
                      className="w-full max-h-[320px] rounded-lg shadow-md border border-slate-800"
                    >
                      <source src={activeModal.video} type="video/mp4" />
                      Browser Anda tidak mendukung pemutaran video.
                    </video>
                  </div>
                ) : (
                  /* Tampilan Gambar Screenshot */
                  <div className="w-full h-full flex items-center justify-center overflow-hidden my-auto">
                    {activeModal.images && activeModal.images.length > 0 && (
                      <img
                        src={activeModal.images[activeImgIdx] || activeModal.images[0]}
                        alt={activeModal.title}
                        className="max-w-full max-h-[320px] object-contain rounded-lg shadow-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Tombol Panah Prev/Next jika sedang menampilkan Gambar */}
                {!showVideo && activeModal.images && activeModal.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-lime-500 hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border border-slate-700 transition z-20"
                      title="Gambar Sebelumnya (◄)"
                    >
                      ❮
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-lime-500 hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border border-slate-700 transition z-20"
                      title="Gambar Selanjutnya (►)"
                    >
                      ❯
                    </button>
                  </>
                )}

                {/* Slider Thumbnail Navigasi */}
                <div className="flex flex-col items-center gap-1.5 mt-2 max-w-full z-10">
                  <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
                    {/* Tombol Tab Video (jika ada) */}
                    {activeModal.video && (
                      <button
                        type="button"
                        onClick={() => setShowVideo(true)}
                        className={`px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1 ${
                          showVideo ? 'bg-lime-400 text-slate-950 scale-105' : 'bg-slate-800 text-slate-300 opacity-70'
                        }`}
                      >
                        ▶ Putar Video
                      </button>
                    )}

                    {/* Thumbnail Gambar */}
                    {activeModal.images && activeModal.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setShowVideo(false);
                          setActiveImgIdx(idx);
                        }}
                        className={`w-12 h-9 rounded overflow-hidden border-2 transition ${
                          !showVideo && activeImgIdx === idx ? 'border-lime-400 scale-105' : 'border-transparent opacity-50'
                        }`}
                      >
                        <img src={imgSrc} alt="Thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: Detail & Deskripsi */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                <div className="space-y-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${activeModal.categoryColor}`}>
                    {activeModal.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {activeModal.title}
                  </h3>
                  <div className="w-12 h-1 bg-lime-500 rounded-full"></div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {activeModal.detailDesc}
                  </p>
                </div>

                {activeModal.isLink && (
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={activeModal.isLink}
                      className="inline-block w-full text-center bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm"
                    >
                      Buka Aplikasi →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Kontak */}
      <section id="kontak" className="max-w-5xl mx-auto p-6 scroll-mt-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Hubungi Kami</h2>
        <p className="text-slate-600 mb-6">Konsultasikan kebutuhan pembuatan website, dokumentasi sistem, dan pengolahan data Anda bersama MA23DIGITAL.</p>
        
        <div className="inline-block bg-slate-900 text-white p-8 rounded-2xl shadow-xl text-left border border-slate-800 min-w-[320px]">
          <p className="font-bold text-xl text-lime-400 mb-1">MA23DIGITAL</p>
          <p className="text-xs text-slate-400 font-semibold mb-4">Studio Pengembangan Custom System & Website</p>
          
          <div className="space-y-2 text-sm text-slate-300">
            <p><strong>Owner:</strong> Maulana Septiyadi</p>
            <p><strong>Email:</strong> ma23digital@gmail.com</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Alamat Studio:</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Cluster Magnolia Puri Harmoni Pasir Mukti Blok N1 No.19<br />
              Kec. Citeureup, Kab. Bogor, Jawa Barat 16810
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}