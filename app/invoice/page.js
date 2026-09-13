'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InvoicePage() {
  const getTodayFormatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // State Identitas & Header
  const [logo, setLogo] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(`INV-${getTodayFormatted()}-0001`);
  const [companyName, setCompanyName] = useState('MA23 Digital');
  const [billTo, setBillTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [poNumber, setPoNumber] = useState(`PO-${getTodayFormatted()}-0001`);

  // State Item Baris Barang/Jasa
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0 },
  ]);

  // State Footer, Catatan & Ketentuan
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('');

  // State Pajak, Diskon & Pengiriman
  const [taxPercent, setTaxPercent] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showShipping, setShowShipping] = useState(false);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: '', quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: field === 'description' ? value : Number(value) || 0,
          };
        }
        return item;
      })
    );
  };

  // Perhitungan
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.rate,
    0
  );
  const discountVal = showDiscount ? Number(discountAmount) || 0 : 0;
  const shippingVal = showShipping ? Number(shippingAmount) || 0 : 0;
  const taxVal = (subtotal - discountVal) * (Number(taxPercent) / 100);
  const total = subtotal - discountVal + taxVal + shippingVal;
  const balanceDue = total - Number(amountPaid);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatNumber = (amount) => {
    return (amount || 0).toLocaleString('id-ID');
  };

  // 1. Fungsi Cetak / Unduh PDF via Browser Print
  const handlePrintOrPdf = () => {
    window.print();
  };

  // 2. Fungsi Unduh Excel (.csv)
  const handleExportExcel = () => {
    let csvRows = [];
    const cleanCell = (val) => `"${String(val || '').replace(/"/g, '""')}"`;

    csvRows.push([cleanCell(`INVOICE #${invoiceNo}`)]);
    csvRows.push([cleanCell('Perusahaan'), cleanCell(companyName)]);
    csvRows.push([cleanCell('Tagihan Kepada'), cleanCell(billTo.replace(/\n/g, ' '))]);
    csvRows.push([cleanCell('Alamat Penagihan'), cleanCell(shipTo.replace(/\n/g, ' '))]);
    csvRows.push([cleanCell('Tanggal'), cleanCell(invoiceDate)]);
    csvRows.push([cleanCell('Jatuh Tempo'), cleanCell(dueDate)]);
    csvRows.push([cleanCell('Nomor PO'), cleanCell(poNumber)]);
    csvRows.push([]);

    csvRows.push([
      cleanCell('Deskripsi'),
      cleanCell('Kuantitas'),
      cleanCell('Harga Satuan (IDR)'),
      cleanCell('Total (IDR)'),
    ]);

    items.forEach((item) => {
      csvRows.push([
        cleanCell(item.description),
        item.quantity,
        item.rate,
        item.quantity * item.rate,
      ]);
    });

    csvRows.push([]);
    csvRows.push(['', '', cleanCell('Subtotal'), subtotal]);
    if (showDiscount) csvRows.push(['', '', cleanCell('Diskon'), discountVal]);
    csvRows.push(['', '', cleanCell(`Pajak (${taxPercent}%)`), taxVal]);
    if (showShipping) csvRows.push(['', '', cleanCell('Pengiriman'), shippingVal]);
    csvRows.push(['', '', cleanCell('Total'), total]);
    csvRows.push(['', '', cleanCell('Jumlah Dibayarkan'), amountPaid]);
    csvRows.push(['', '', cleanCell('Sisa Tagihan'), balanceDue]);

    const csvString = '\uFEFF' + csvRows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceNo || 'Invoice'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* CSS Cetak Khusus 1 Halaman A4 & Sembunyikan Header Website */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header,
          nav,
          footer,
          .print\\:hidden {
            display: none !important;
          }
          body * {
            visibility: hidden;
          }
          #invoice-container,
          #invoice-container * {
            visibility: visible;
          }
          #invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 12mm !important;
            margin: 0 !important;
          }
          input,
          textarea {
            border: none !important;
            background: transparent !important;
            resize: none !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-3 md:p-6 text-slate-800">
        {/* Tombol Aksi */}
        <div className="max-w-4xl mx-auto mb-4 flex flex-wrap justify-between items-center gap-3 print:hidden">
          <Link
            href="/"
            className="text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            ← Kembali ke Beranda
          </Link>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePrintOrPdf}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg text-xs md:text-sm transition shadow-sm flex items-center gap-1 cursor-pointer"
            >
              🖨️ Cetak / Unduh PDF
            </button>
            <button
              type="button"
              onClick={handleExportExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs md:text-sm transition shadow-sm flex items-center gap-1 cursor-pointer"
            >
              📊 Unduh Excel (.csv)
            </button>
          </div>
        </div>

        {/* CONTAINER INVOICE */}
        <div
          id="invoice-container"
          className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200 text-xs md:text-sm"
        >
          {/* HEADER */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6 flex items-start">
              <label className="w-40 h-20 border-2 border-dashed border-slate-300 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-slate-400 overflow-hidden bg-slate-50 relative group">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-1">
                    <span className="text-lg font-bold text-slate-400 block">
                      +
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Tambahkan Logo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="col-span-6 text-right flex flex-col items-end">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-wide mb-2">
                INVOICE
              </h1>
              <div className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-2.5 py-1 w-48 bg-white">
                <span className="text-slate-400 font-bold">#</span>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full text-right font-semibold focus:outline-none text-slate-800 text-xs"
                />
              </div>
            </div>
          </div>

          {/* DETAIL PERUSAHAAN & FORM TANGGAL */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nama Perusahaan Anda"
                className="w-full border border-slate-300 rounded-lg p-2 font-semibold focus:outline-none focus:border-emerald-500 text-xs md:text-sm"
              />
            </div>

            <div className="col-span-6 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-medium text-slate-600">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-xs w-40 text-right focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-medium text-slate-600">
                  Jatuh Tempo
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-xs w-40 text-right focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-medium text-slate-600">
                  Nomor PO
                </label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-xs w-40 text-right focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* ALAMAT PENAGIHAN */}
          <div className="grid grid-cols-12 gap-4 mb-5">
            <div className="col-span-6">
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                Tagihan kepada
              </label>
              <textarea
                rows={2}
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                placeholder="Nama / Perusahaan Klien"
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                Alamat / Informasi Penagihan
              </label>
              <textarea
                rows={2}
                value={shipTo}
                onChange={(e) => setShipTo(e.target.value)}
                placeholder="(opsional)"
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* TABEL ITEM */}
          <div className="mb-3">
            <div className="bg-slate-900 text-white rounded-t-lg px-3 py-2 grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider">
              <div className="col-span-6 md:col-span-7">Deskripsi</div>
              <div className="col-span-2 text-center">Kuantitas</div>
              <div className="col-span-2 text-right">Harga Satuan</div>
              <div className="col-span-2 md:col-span-1 text-right">Total</div>
            </div>

            <div className="divide-y divide-slate-200 border-x border-b border-slate-200 rounded-b-lg">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-2 grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-6 md:col-span-7 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-rose-500 font-bold text-xs px-1 print:hidden cursor-pointer"
                      title="Hapus Baris"
                    >
                      ✕
                    </button>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, 'description', e.target.value)
                      }
                      placeholder="Deskripsi jasa / layanan software..."
                      className="w-full border border-slate-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, 'quantity', e.target.value)
                      }
                      className="w-full border border-slate-300 rounded-lg px-2 py-1 text-xs text-center focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center border border-slate-300 rounded-lg px-2 py-1 bg-white">
                    <span className="text-[10px] text-slate-400 mr-1">Rp</span>
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, 'rate', e.target.value)
                      }
                      className="w-full text-right text-xs focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 text-right text-xs font-semibold text-slate-800">
                    IDR {formatNumber(item.quantity * item.rate)}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1.5 rounded-lg text-xs border border-slate-200 transition flex justify-center items-center gap-1 print:hidden cursor-pointer"
            >
              <span>+</span> Item baris
            </button>
          </div>

          {/* FOOTER & TOTAL */}
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-6 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Catatan
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Informasi rekening bank, metode transfer, dll."
                  className="w-full border border-slate-300 focus:border-emerald-500 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Ketentuan
                </label>
                <textarea
                  rows={2}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Syarat pembayaran DP, masa garansi perbaikan"
                  className="w-full border border-slate-300 focus:border-emerald-500 rounded-lg p-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="col-span-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-700">
                <span>Subtotal</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-medium text-slate-700">Pajak</span>
                <div className="flex items-center gap-1 border border-slate-300 rounded-lg px-2 py-0.5 w-24 bg-white">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(e.target.value)}
                    className="w-full text-right text-xs focus:outline-none"
                  />
                  <span className="text-[10px] font-semibold text-slate-500">%</span>
                </div>
              </div>

              <div className="flex gap-3 text-[11px] font-bold text-emerald-600 pt-0.5 print:hidden">
                {!showDiscount && (
                  <button
                    type="button"
                    onClick={() => setShowDiscount(true)}
                    className="hover:underline cursor-pointer"
                  >
                    + Diskon
                  </button>
                )}
                {!showShipping && (
                  <button
                    type="button"
                    onClick={() => setShowShipping(true)}
                    className="hover:underline cursor-pointer"
                  >
                    + Pengiriman
                  </button>
                )}
              </div>

              {showDiscount && (
                <div className="flex justify-between items-center gap-2 text-xs">
                  <span className="text-slate-700">Diskon</span>
                  <div className="flex items-center border border-slate-300 rounded-lg px-2 py-0.5 w-32 bg-white">
                    <span className="text-[10px] text-slate-400 mr-1">Rp</span>
                    <input
                      type="number"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(e.target.value)}
                      className="w-full text-right text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDiscount(false)}
                      className="ml-1 text-slate-400 hover:text-rose-500 font-bold text-[10px] print:hidden cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {showShipping && (
                <div className="flex justify-between items-center gap-2 text-xs">
                  <span className="text-slate-700">Pengiriman</span>
                  <div className="flex items-center border border-slate-300 rounded-lg px-2 py-0.5 w-32 bg-white">
                    <span className="text-[10px] text-slate-400 mr-1">Rp</span>
                    <input
                      type="number"
                      value={shippingAmount}
                      onChange={(e) => setShippingAmount(e.target.value)}
                      className="w-full text-right text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowShipping(false)}
                      className="ml-1 text-slate-400 hover:text-rose-500 font-bold text-[10px] print:hidden cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <hr className="border-slate-200 my-1" />

              <div className="flex justify-between items-center text-base font-black text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <div className="flex justify-between items-center gap-2 text-xs font-semibold text-slate-700">
                <span>Jumlah dibayarkan</span>
                <div className="flex items-center border border-slate-300 rounded-lg px-2 py-0.5 w-32 bg-white">
                  <span className="text-[10px] text-slate-400 mr-1">Rp</span>
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-full text-right text-xs font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <hr className="border-slate-200 my-1" />

              <div className="flex justify-between items-center text-base font-black text-slate-900">
                <span>Sisa</span>
                <span>{formatCurrency(balanceDue)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}