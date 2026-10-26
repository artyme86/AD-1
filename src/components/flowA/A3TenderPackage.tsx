import React, { useState } from 'react';
import { Send, FileText, Clock, CheckCircle2, ArrowRight, ArrowLeft, Eye, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const A3TenderPackage: React.FC = () => {
  const {
    isTenderSent,
    sendTender,
    bidDeadlineDays,
    setBidDeadlineDays,
    setFlowStep,
    tenderPackages,
    bids,
    selectedPackageForComparison,
    setSelectedPackageForComparison,
    facilityBrief
  } = useApp();

  const [isSending, setIsSending] = useState(false);

  const totalFacilities =
    facilityBrief.pitches5aSide +
    facilityBrief.olympicPools +
    facilityBrief.smallerPools +
    facilityBrief.indoorHalls;

  const handleSendTender = () => {
    setIsSending(true);
    setTimeout(() => {
      sendTender();
      setIsSending(false);
    }, 500);
  };

  const handleComparePackage = (pkgId: string) => {
    setSelectedPackageForComparison(pkgId);
    setFlowStep('A6');
  };

  const getPackageImage = (title: string, category: string) => {
    const t = (title + ' ' + category).toLowerCase();
    if (t.includes('turf') || t.includes('surface')) {
      return 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=400&q=80';
    }
    if (t.includes('pool') || t.includes('aquatic')) {
      return 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80';
    }
    if (t.includes('hall') || t.includes('arena') || t.includes('floor')) {
      return 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80';
    }
    if (t.includes('light') || t.includes('electrical')) {
      return 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80';
    }
    return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&q=80';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>BUSINESS PORTAL</span>
            <span>/</span>
            <span>PLAN A FACILITY</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A3 TENDER PACKAGE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Procurement Tender Package & RFP Distribution
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Work packages derived directly from your facility brief, ready for distribution to pre-screened sports suppliers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Illustrative estimate, not a quotation" />
          {isTenderSent ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-label border border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
              <CheckCircle2 className="w-3.5 h-3.5" /> TENDER PUBLISHED (ACTIVE)
            </span>
          ) : (
            <StatusChip status="Draft Mode" />
          )}
        </div>
      </div>

      {/* Tender Configuration Strip */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono-label text-[var(--muted-color)] block flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            BID SUBMISSION WINDOW / DEADLINE
          </span>
          <p className="text-xs text-[var(--text-primary)]">
            Verified suppliers in Qatar and GCC will formulate competitive bids against these technical specs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--muted-color)] mr-1">WINDOW:</span>
          {([7, 14, 21] as (7 | 14 | 21)[]).map((days) => (
            <button
              key={days}
              type="button"
              disabled={isTenderSent}
              onClick={() => setBidDeadlineDays(days)}
              className={`btn-action text-xs py-1.5 px-3 ${
                bidDeadlineDays === days
                  ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                  : 'text-[var(--muted-color)]'
              }`}
            >
              {days} DAYS
            </button>
          ))}
        </div>
      </div>

      {/* Tender Packages Grid (Generated strictly from facility brief) */}
      {tenderPackages.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
          <AlertCircle className="w-6 h-6 text-amber-500 mx-auto" />
          <h3 className="font-heading text-sm text-[var(--heading-color)]">
            No Packages Configured
          </h3>
          <p className="text-xs text-[var(--muted-color)]">
            Add at least one facility in the facility brief to generate tender packages.
          </p>
          <button
            onClick={() => setFlowStep('A1')}
            className="btn-action text-xs mt-2"
          >
            EDIT FACILITY BRIEF
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenderPackages.map((pkg) => {
            const pkgBids = bids.filter((b) => b.requestId === pkg.id);
            const bidsCount = pkgBids.length;

            return (
              <div
                key={pkg.id}
                className="border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col justify-between transition-colors overflow-hidden"
              >
                {/* Package Photo */}
                <div className="h-28 w-full overflow-hidden relative border-b border-[var(--border-color)]">
                  <img
                    src={getPackageImage(pkg.title, pkg.category)}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs border border-white/20 text-[9px] font-mono text-white">
                    {pkg.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                        PACKAGE #{pkg.id.slice(-4).toUpperCase()}
                      </span>
                      {isTenderSent ? (
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono-label border ${
                            bidsCount > 0
                              ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10 font-bold'
                              : 'border-blue-500/40 text-blue-400 bg-blue-500/10'
                          }`}
                        >
                          {bidsCount > 0 ? `${bidsCount} ${bidsCount === 1 ? 'BID' : 'BIDS'}` : 'Open, awaiting bids'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-mono-label border border-[var(--border-color)] text-[var(--muted-color)]">
                          READY TO ISSUE
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-sm text-[var(--heading-color)] font-bold leading-snug">
                      {pkg.title}
                    </h3>

                  <ul className="text-xs text-[var(--muted-color)] space-y-1 list-disc list-inside">
                    {pkg.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="truncate">{spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--muted-color)]">
                    {isTenderSent ? `Deadline: ${bidDeadlineDays} days` : 'Status: Ready'}
                  </span>

                  {isTenderSent && (
                    <button
                      type="button"
                      onClick={() => handleComparePackage(pkg.id)}
                      className="btn-action text-[11px] py-1 px-3 text-[var(--accent-text)] border-[var(--accent-red)] flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{bidsCount > 0 ? `COMPARE (${bidsCount})` : 'VIEW PACKAGE'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-[var(--border-color)] bg-[var(--panel-bg)]">
        <button
          type="button"
          onClick={() => setFlowStep('A2')}
          className="btn-action w-full sm:w-auto gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO FEASIBILITY</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isTenderSent ? (
            <button
              type="button"
              onClick={handleSendTender}
              disabled={isSending || tenderPackages.length === 0}
              className="btn-primary w-full sm:w-auto gap-2 py-3 px-6 text-xs"
            >
              {isSending ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                  <span>DISPATCHING TO VERIFIED SUPPLIERS...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SEND TENDER TO SUPPLIERS</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (tenderPackages.length > 0) {
                  setSelectedPackageForComparison(tenderPackages[0].id);
                }
                setFlowStep('A6');
              }}
              className="btn-primary w-full sm:w-auto gap-2 py-3 px-6 text-xs"
            >
              <span>VIEW BID COMPARISON (A6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
