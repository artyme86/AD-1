import React, { useState } from 'react';
import { Send, FileText, Clock, CheckCircle2, ArrowRight, ArrowLeft, Building2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const A3TenderPackage: React.FC = () => {
  const {
    isTenderSent,
    sendTender,
    bidDeadlineDays,
    setBidDeadlineDays,
    setFlowStep,
    suppliers
  } = useApp();

  const [isSending, setIsSending] = useState(false);

  const rfpCards = [
    {
      id: 'rfp-turf',
      title: 'Package 01: Artificial Turf Surface & Sub-base',
      category: 'Sports Surfaces & Civil Works',
      specs: 'FIFA Quality Pro 50mm, shock pad, organic heat-limiting infill for Doha summer',
      bidsCount: isTenderSent ? 3 : 0,
      status: isTenderSent ? '3 bids received' : 'Draft RFP',
      highlight: true
    },
    {
      id: 'rfp-light',
      title: 'Package 02: High-Mast LED Floodlighting',
      category: 'Electrical & Optics',
      specs: 'IP66 dust-sealed, 750 lux sports field coverage, 55°C ambient heat sink',
      bidsCount: isTenderSent ? 2 : 0,
      status: isTenderSent ? '2 bids received' : 'Draft RFP',
      highlight: false
    },
    {
      id: 'rfp-nets',
      title: 'Package 03: Perimeter Ball Catch Nets',
      category: 'Safety & Enclosures',
      specs: '6m height, high-tenacity UV stabilized knotless polypropylene, 120 km/h wind load',
      bidsCount: isTenderSent ? 2 : 0,
      status: isTenderSent ? '2 bids received' : 'Draft RFP',
      highlight: false
    },
    {
      id: 'rfp-seats',
      title: 'Package 04: Spectator Seating & Shading',
      category: 'Architectural Tensile',
      specs: '500 modular seats with UV-inhibited polyolefin copolymer & PTFE shade canopy',
      bidsCount: isTenderSent ? 1 : 0,
      status: isTenderSent ? '1 bid received' : 'Draft RFP',
      highlight: false
    },
    {
      id: 'rfp-olympic',
      title: 'Package 05: Olympic 50m Pool & Active Chilling',
      category: 'Heavy Aquatics Engineering',
      specs: '280 kW titanium heat-exchange chillers, multi-media regenerative sand filtration',
      bidsCount: isTenderSent ? 2 : 0,
      status: isTenderSent ? '2 bids received' : 'Draft RFP',
      highlight: false
    },
    {
      id: 'rfp-training-pool',
      title: 'Package 06: Youth 25m Training Pool System',
      category: 'Aquatics Engineering',
      specs: 'Turnkey hydraulic pump package, automated salinity, ozone disinfection',
      bidsCount: isTenderSent ? 2 : 0,
      status: isTenderSent ? '2 bids received' : 'Draft RFP',
      highlight: false
    }
  ];

  const handleSendTender = () => {
    setIsSending(true);
    setTimeout(() => {
      sendTender();
      setIsSending(false);
    }, 650);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW A</span>
            <span>/</span>
            <span>B2B FACILITY PLANNING</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A3 TENDER PACKAGE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Procurement Tender Package & RFP Distribution
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Six structured RFP work packages ready for targeted distribution to pre-screened, verified sports suppliers.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            Verified suppliers in Qatar and GCC will be notified to formulate competitive bids against these technical specs.
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

      {/* Six RFP Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rfpCards.map((card) => {
          const isTurf = card.id === 'rfp-turf';
          return (
            <div
              key={card.id}
              className={`p-5 border bg-[var(--panel-bg)] flex flex-col justify-between transition-colors ${
                isTurf && isTenderSent
                  ? 'border-[var(--accent-red)] ring-1 ring-[var(--accent-red)]'
                  : 'border-[var(--border-color)]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                    {card.category}
                  </span>
                  {isTenderSent ? (
                    <span className={`px-2 py-0.5 text-[10px] font-mono-label border ${
                      isTurf
                        ? 'border-[var(--accent-red)] text-[var(--accent-text)] bg-[var(--inset-bg)] font-bold'
                        : 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
                    }`}>
                      {card.bidsCount} BIDS
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-mono-label border border-[var(--border-color)] text-[var(--muted-color)]">
                      READY TO ISSUE
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-sm text-[var(--heading-color)] leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                  {card.specs}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--muted-color)]">
                  {isTenderSent ? `Deadline: ${bidDeadlineDays} days` : 'Status: Ready'}
                </span>

                {isTurf && isTenderSent ? (
                  <button
                    type="button"
                    onClick={() => setFlowStep('A6')}
                    className="btn-action text-[11px] py-1 px-3 text-[var(--accent-text)] border-[var(--accent-red)] flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>COMPARE BIDS</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[var(--muted-color)] font-mono">
                    {isTenderSent ? 'Active' : 'Unpublished'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
              disabled={isSending}
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
              onClick={() => setFlowStep('A6')}
              className="btn-primary w-full sm:w-auto gap-2 py-3 px-6 text-xs"
            >
              <span>VIEW & COMPARE RECEIVED BIDS (A6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
