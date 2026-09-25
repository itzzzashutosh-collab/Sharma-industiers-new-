import React from 'react';

export const ReportsScreen: React.FC = () => {
  const downloadReport = (name: string) => {
    const csvContent =
      'data:text/csv;charset=utf-8,Date,Product,Bags,Revenue,Region\n2025-08-01,Rustic Royale,250,117000,Jaipur\n2025-08-05,Weatherguard,300,123000,Jodhpur\n2025-08-08,Shine Emulsion,100,38000,Kota\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${name}_August_2025.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-chart-pie" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Reports &amp; Operational Analytics</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manufacturing yield ratios, regional territory performance, and exportable business audits.
          </p>
        </div>

        <button
          onClick={() => downloadReport('Executive_Master_Report')}
          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <i className="fa-solid fa-download text-[10px]" />
          <span>Export Master CSV</span>
        </button>
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Regional Territory Market Share</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Jaipur Metropolitan &amp; Rural</span>
                <span className="text-blue-600">42% (₹ 10.4L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Kota &amp; Hadoti Belt</span>
                <span className="text-emerald-600">28% (₹ 6.9L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Jodhpur &amp; Western Rajasthan</span>
                <span className="text-amber-600">18% (₹ 4.5L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Udaipur &amp; Mewar Division</span>
                <span className="text-purple-600">12% (₹ 3.0L)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Ready to download audits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Standard Audit Reports</h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Plant Daily Production &amp; Defect Log</p>
                <p className="text-[11px] text-slate-500">All batches, lines &amp; QC test passes</p>
              </div>
              <button
                onClick={() => downloadReport('Production_Log')}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-semibold text-[11px]"
              >
                CSV
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Dealer Outstanding &amp; Aging Summary</p>
                <p className="text-[11px] text-slate-500">Receivables above 30, 45, and 60 days</p>
              </div>
              <button
                onClick={() => downloadReport('Dealer_Aging_Summary')}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-semibold text-[11px]"
              >
                CSV
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">GST Monthly Output Register (GSTR-1)</p>
                <p className="text-[11px] text-slate-500">Tax invoices filed with Rajasthan GST</p>
              </div>
              <button
                onClick={() => downloadReport('GSTR1_Output_Tax')}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-semibold text-[11px]"
              >
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
