import React from 'react';
import { Invoice } from '../../../types/erp';

interface InvoicePreviewDocumentProps {
  invoice: Invoice;
  onDownloadPdf?: () => void;
}

export const InvoicePreviewDocument: React.FC<InvoicePreviewDocumentProps> = ({
  invoice,
  onDownloadPdf,
}) => {
  // Calculations
  const taxableTotal = invoice.taxableAmount || Math.round(invoice.amountRaw * 0.8475);
  const isInterState = invoice.igstAmount && invoice.igstAmount > 0;
  const cgst = isInterState ? 0 : invoice.cgstAmount || Math.round(taxableTotal * 0.09);
  const sgst = isInterState ? 0 : invoice.sgstAmount || Math.round(taxableTotal * 0.09);
  const igst = isInterState ? invoice.igstAmount || Math.round(taxableTotal * 0.18) : 0;
  const grandTotal = invoice.amountRaw;

  // Convert amount to words in Indian numbering
  const numberToWordsIndian = (num: number): string => {
    const a = [
      '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
      'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ',
      'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n: number): string => {
      let str = '';
      if (n > 19) {
        str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
      } else {
        str += a[n];
      }
      return str.trim();
    };

    if (num === 0) return 'Zero Rupees Only';
    let output = '';
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const hundred = Math.floor(num / 100);
    const rest = num % 100;

    if (crore > 0) output += inWords(crore) + ' Crore ';
    if (lakh > 0) output += inWords(lakh) + ' Lakh ';
    if (thousand > 0) output += inWords(thousand) + ' Thousand ';
    if (hundred > 0) output += inWords(hundred) + ' Hundred ';
    if (rest > 0) output += (output ? 'and ' : '') + inWords(rest) + ' ';

    return `INR ${output.trim()} Only`;
  };

  return (
    <div
      id="invoice-print-area"
      className="bg-white text-slate-800 font-sans p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200 text-[11px] leading-relaxed max-w-[850px] mx-auto select-text"
      style={{ minHeight: '1100px' }}
    >
      {/* IRN Bar if available */}
      {invoice.irnNumber && (
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg mb-4 text-[10px] flex flex-col md:flex-row md:items-center justify-between gap-1 text-slate-600">
          <div className="truncate">
            <span className="font-bold text-slate-800">IRN: </span>
            <span className="font-mono text-slate-600">{invoice.irnNumber}</span>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span>
              <strong className="text-slate-800">Ack No:</strong> {invoice.irnAcknowledgmentNumber || '11202508910023'}
            </span>
            <span>
              <strong className="text-slate-800">Ack Date:</strong> {invoice.irnDate || invoice.date}
            </span>
          </div>
        </div>
      )}

      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 drop-shadow-sm" viewBox="0 0 100 100">
                <path d="M20,65 Q10,35 45,20 Q60,35 35,65 Z" fill="#f97316" />
                <path d="M45,20 Q80,10 75,45 Q50,45 45,20 Z" fill="#06b6d4" />
                <path d="M75,45 Q90,80 50,75 Q45,55 75,45 Z" fill="#10b981" />
                <path d="M50,75 Q20,95 20,65 Q35,60 50,75 Z" fill="#eab308" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                SWATCH PAINTS INDIA PVT. LTD.
              </h1>
              <p className="text-[10px] text-slate-600 leading-tight">
                Works &amp; Factory: Plot 44-48, Phase II, Sitapura Industrial Area, Tonk Road, Jaipur, Rajasthan - 302022
                <br />
                Registered Office: Swatch Tower, MI Road, Jaipur - 302001 | Phone: +91 141 409 2800
                <br />
                <strong>GSTIN:</strong> 08AAACS1294K1Z8 &nbsp;|&nbsp; <strong>PAN:</strong> AAACS1294K &nbsp;|&nbsp; <strong>State:</strong> Rajasthan (08)
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block bg-slate-900 text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-wider rounded">
              TAX INVOICE
            </span>
            <p className="text-[9px] text-slate-500 mt-1 uppercase font-semibold">
              Original for Recipient
            </p>
            <p className="text-[11px] font-bold text-slate-900 mt-1">{invoice.invoiceNumber}</p>
          </div>
        </div>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-slate-200 rounded-lg p-3 bg-slate-50/70 mb-4 text-[10px]">
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Invoice Date</span>
          <span className="font-bold text-slate-800">{invoice.date}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Payment Due Date</span>
          <span className="font-bold text-slate-800">{invoice.dueDate}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Sales Order Ref</span>
          <span className="font-bold text-slate-800">{invoice.orderNumber}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Payment Terms</span>
          <span className="font-bold text-slate-800">{invoice.paymentTerms || '15 Days Credit'}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">E-Way Bill No</span>
          <span className="font-bold text-blue-600">{invoice.eWayBillNumber || '2810 4492 8192'}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Place of Supply</span>
          <span className="font-bold text-slate-800">{invoice.shippingAddress?.split(',')[1]?.trim() || 'Rajasthan (08)'}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Sales Officer</span>
          <span className="font-bold text-slate-800">{invoice.salesperson || 'Ramesh Sharma'}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold uppercase">Reverse Charge</span>
          <span className="font-bold text-slate-800">No (N/A)</span>
        </div>
      </div>

      {/* Customer Billed & Shipped To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Bill To */}
        <div className="border border-slate-200 rounded-lg p-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Details of Receiver (Billed To)</span>
            <span className="text-slate-600 font-semibold">{invoice.customerType || 'Authorized Dealer'}</span>
          </div>
          <h2 className="text-xs font-black text-slate-900">{invoice.customer}</h2>
          <p className="text-[10px] text-slate-600 mt-1">
            {invoice.billingAddress || 'Shop #14-16, Nehru Hardware Bazar, Jodhpur, Rajasthan - 342001'}
            <br />
            <strong>GSTIN / UIN:</strong> {invoice.gstin || '08AABCM4591B1Z3'}
            <br />
            <strong>Phone:</strong> {invoice.phone || '+91 98290 14820'} | <strong>Email:</strong> {invoice.email || 'accounts@client.com'}
          </p>
        </div>

        {/* Ship To */}
        <div className="border border-slate-200 rounded-lg p-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Details of Consignee (Shipped To)</span>
          </div>
          <h2 className="text-xs font-black text-slate-900">{invoice.customer}</h2>
          <p className="text-[10px] text-slate-600 mt-1">
            {invoice.shippingAddress || invoice.billingAddress || 'Godown 3, Industrial Area Phase II, Jodhpur, Rajasthan - 342003'}
            <br />
            <strong>State:</strong> {invoice.shippingAddress?.includes('Delhi') ? 'Delhi (07)' : 'Rajasthan (08)'}
            <br />
            <strong>Transport:</strong> Direct Plant Dispatch via Express Line
          </p>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase border-b border-slate-200">
              <th className="py-2 px-2.5 text-center w-8">#</th>
              <th className="py-2 px-3">Description of Goods</th>
              <th className="py-2 px-2 text-center">HSN</th>
              <th className="py-2 px-2 text-right">Qty</th>
              <th className="py-2 px-2 text-center">Unit</th>
              <th className="py-2 px-2 text-right">Rate</th>
              <th className="py-2 px-2 text-right">Disc %</th>
              <th className="py-2 px-2.5 text-right">Taxable Val</th>
              <th className="py-2 px-2 text-center">GST</th>
              <th className="py-2 px-3 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[10px] font-medium text-slate-700">
            {invoice.items.map((item, idx) => {
              const disc = item.discountPercent || 0;
              const gross = item.qty * item.unitPrice;
              const taxable = Math.round(gross * (1 - disc / 100));
              const gst = Math.round(taxable * 0.18);
              const total = taxable + gst;

              return (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-2.5 text-center text-slate-400 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-[9px] text-slate-400 font-normal">
                      Industrial Grade • 100% Pure Acrylic Polymer Binder • ISO Certified
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center font-mono text-slate-600">{item.hsnCode || '320910'}</td>
                  <td className="py-2 px-2 text-right font-bold text-slate-900">{item.qty}</td>
                  <td className="py-2 px-2 text-center text-slate-500">{item.unit || 'Nos'}</td>
                  <td className="py-2 px-2 text-right font-mono tabular-nums">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                  <td className="py-2 px-2 text-right font-mono text-slate-500">{disc}%</td>
                  <td className="py-2 px-2.5 text-right font-mono font-semibold tabular-nums">
                    ₹{taxable.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-2 text-center text-slate-500 font-semibold">18%</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tax Breakdown & Calculations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-start">
        {/* Bank & Tax Details Left */}
        <div className="space-y-3 text-[10px]">
          <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/50">
            <span className="font-bold text-slate-900 block uppercase mb-1">Company Bank Details for RTGS / NEFT:</span>
            <div className="grid grid-cols-2 gap-1 text-slate-700">
              <div><strong>Bank Name:</strong> ICICI Bank Ltd.</div>
              <div><strong>Account Name:</strong> Swatch Paints India Pvt Ltd</div>
              <div><strong>A/c Number:</strong> 001205018492</div>
              <div><strong>IFSC Code:</strong> ICIC0000012</div>
              <div><strong>Branch:</strong> Sitapura Ind. Area, Jaipur</div>
              <div><strong>UPI VPA:</strong> swatchpaints@icici</div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-2.5">
            <span className="font-bold text-slate-800 block uppercase mb-1">Total Amount in Words:</span>
            <p className="font-bold text-slate-900 italic text-[11px]">
              {numberToWordsIndian(grandTotal)}
            </p>
          </div>
        </div>

        {/* Financial Summary Right */}
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/80 space-y-1.5 text-[11px]">
          <div className="flex justify-between text-slate-600">
            <span>Total Taxable Value:</span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              ₹{taxableTotal.toLocaleString('en-IN')}
            </span>
          </div>

          {!isInterState ? (
            <>
              <div className="flex justify-between text-slate-600">
                <span>Central GST (CGST 9%):</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  ₹{cgst.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>State GST (SGST 9%):</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  ₹{sgst.toLocaleString('en-IN')}
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-slate-600">
              <span>Integrated GST (IGST 18%):</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                ₹{igst.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Round Off:</span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">₹0.00</span>
          </div>

          <div className="border-t-2 border-slate-900 pt-1.5 flex justify-between items-baseline">
            <span className="text-xs font-black text-slate-900 uppercase">Grand Invoice Total:</span>
            <span className="text-base font-black text-slate-900 font-mono tabular-nums">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Payment Status Summary */}
          {invoice.amountPaid !== undefined && (
            <div className="border-t border-slate-200 pt-1.5 mt-1 text-[10px] space-y-1">
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Amount Paid / Settled:</span>
                <span className="font-mono tabular-nums">₹{invoice.amountPaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-rose-700 font-bold">
                <span>Net Balance Receivable:</span>
                <span className="font-mono tabular-nums">₹{(invoice.balanceDue ?? 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code & Signatures Bottom */}
      <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-3 gap-4 items-end text-[10px]">
        {/* QR Code */}
        <div className="flex items-center gap-2.5">
          <div className="w-16 h-16 border border-slate-300 p-1 rounded bg-white flex flex-col items-center justify-center">
            {/* SVG QR Code representation */}
            <svg className="w-14 h-14" viewBox="0 0 100 100" fill="#1e293b">
              <rect x="5" y="5" width="25" height="25" fill="#1e293b" />
              <rect x="10" y="10" width="15" height="15" fill="#fff" />
              <rect x="13" y="13" width="9" height="9" fill="#1e293b" />

              <rect x="70" y="5" width="25" height="25" fill="#1e293b" />
              <rect x="75" y="10" width="15" height="15" fill="#fff" />
              <rect x="78" y="13" width="9" height="9" fill="#1e293b" />

              <rect x="5" y="70" width="25" height="25" fill="#1e293b" />
              <rect x="10" y="75" width="15" height="15" fill="#fff" />
              <rect x="13" y="78" width="9" height="9" fill="#1e293b" />

              <rect x="35" y="10" width="10" height="10" />
              <rect x="50" y="10" width="10" height="10" />
              <rect x="35" y="25" width="10" height="10" />
              <rect x="50" y="35" width="10" height="10" />
              <rect x="65" y="45" width="10" height="10" />
              <rect x="35" y="50" width="10" height="10" />
              <rect x="50" y="65" width="10" height="10" />
              <rect x="65" y="70" width="10" height="10" />
              <rect x="80" y="55" width="10" height="10" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-slate-800 block text-[9px] uppercase">GST E-Invoice QR</span>
            <span className="text-[8px] text-slate-500 leading-tight block">
              Digitally signed by NIC E-Invoice System
            </span>
          </div>
        </div>

        {/* Customer Acknowledgement */}
        <div className="text-center pb-2">
          <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
          <p className="text-[9px] font-semibold text-slate-500 uppercase">
            Receiver's Signature &amp; Stamp
          </p>
        </div>

        {/* Authorised Signatory */}
        <div className="text-right">
          <p className="text-[9px] font-bold text-slate-600 uppercase">
            For SWATCH PAINTS INDIA PVT LTD
          </p>
          <div className="my-1.5 flex justify-end">
            {/* Stamp + Signature representation */}
            <div className="relative inline-block pr-2">
              <span className="inline-block px-2 py-0.5 border border-blue-500 rounded text-[9px] font-black text-blue-600 rotate-[-4deg]">
                SWATCH PAINTS INDIA PVT LTD
                <br />
                <span className="text-[7px] text-blue-500 font-semibold">★ AUTHORIZED SIGNATORY ★</span>
              </span>
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-900">Ashutosh Sharma</p>
          <p className="text-[8px] text-slate-500 font-semibold uppercase">Authorized Signatory</p>
        </div>
      </div>

      {/* Legal Footer Note */}
      <div className="border-t border-slate-100 pt-3 mt-3 text-[9px] text-slate-400 text-center leading-normal">
        Subject to Jaipur Jurisdiction. Interest @ 18% p.a. will be charged if the bill is not paid within the due date.
        Goods once sold will not be taken back without prior written manufacturer authorization.
        <br />
        This is a computer generated, digitally signed tax invoice.
      </div>
    </div>
  );
};
