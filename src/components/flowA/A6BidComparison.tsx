import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, Trophy, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';
import { Stepper, StepItem } from '../shared/Stepper.tsx';

export const A6BidComparison: React.FC = () => {
  const {
    suppliers,
    awardedSupplierId,
    awardSupplier,
    awardStage,
    setAwardStage,
    setFlowStep
  } = useApp();

  const [sortBy, setSortBy] = useState<'price' | 'delivery' | 'warranty'>('price');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(
    awardedSupplierId || suppliers[0]?.id || ''
  );
  const [isAwarding, setIsAwarding] = useState(false);

  // Sorted list of suppliers
  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (sortBy === 'price') return a.bid.priceQar - b.bid.priceQar;
    if (sortBy === 'delivery') return a.bid.deliveryWeeks - b.bid.deliveryWeeks;
    if (sortBy === 'warranty') return b.bid.warrantyYears - a.bid.warrantyYears;
    return 0;
  });

  const handleAward = () => {
    setIsAwarding(true);
    setTimeout(() => {
      awardSupplier(selectedSupplierId);
      setIsAwarding(false);
    }, 500);
  };

  const steps: StepItem[] = [
    {
      id: 'step-1',
      label: 'Awarded',
      status: awardedSupplierId ? 'completed' : 'active'
    },
    {
      id: 'step-2',
      label: 'Agreement',
      status: awardedSupplierId ? 'active' : 'upcoming',
      isPlanned: true
    },
    {
      id: 'step-3',
      label: 'Shipping',
      status: 'upcoming',
      isPlanned: true
    },
    {
      id: 'step-4',
      label: 'After-sales',
      status: 'upcoming',
      isPlanned: true
    }
  ];

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
            <span className="text-[var(--accent-text)]">A6 BID COMPARISON & AWARD</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Tender Bids Evaluation: Artificial Turf Pitch Package
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Compare compliant proposals received from verified sports infrastructure contractors side by side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="3 Bids Evaluated" />
          <StatusChip status="Sample" />
        </div>
      </div>

      {/* Post-Award Stepper */}
      {awardedSupplierId && (
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-label text-emerald-500 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              CONTRACT FORMALLY AWARDED
            </span>
            <span className="text-[11px] font-mono text-[var(--muted-color)]">
              SUPPLIER: {suppliers.find((s) => s.id === awardedSupplierId)?.name}
            </span>
          </div>
          <Stepper steps={steps} />
        </div>
      )}

      {/* Sort Bar */}
      <div className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs font-mono-label text-[var(--muted-color)]">
          01. SORT COMPARISON MATRIX BY:
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSortBy('price')}
            className={`btn-action text-xs py-1.5 px-3 ${
              sortBy === 'price'
                ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--panel-bg)] font-bold'
                : 'text-[var(--muted-color)]'
            }`}
          >
            LOWEST PRICE
          </button>
          <button
            type="button"
            onClick={() => setSortBy('delivery')}
            className={`btn-action text-xs py-1.5 px-3 ${
              sortBy === 'delivery'
                ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--panel-bg)] font-bold'
                : 'text-[var(--muted-color)]'
            }`}
          >
            FASTEST DELIVERY
          </button>
          <button
            type="button"
            onClick={() => setSortBy('warranty')}
            className={`btn-action text-xs py-1.5 px-3 ${
              sortBy === 'warranty'
                ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--panel-bg)] font-bold'
                : 'text-[var(--muted-color)]'
            }`}
          >
            LONGEST WARRANTY
          </button>
        </div>
      </div>

      {/* 3 Suppliers Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedSuppliers.map((supplier) => {
          const isSelected = selectedSupplierId === supplier.id;
          const isAwarded = awardedSupplierId === supplier.id;

          return (
            <div
              key={supplier.id}
              onClick={() => setSelectedSupplierId(supplier.id)}
              className={`p-5 border bg-[var(--panel-bg)] flex flex-col justify-between cursor-pointer transition-colors ${
                isAwarded
                  ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                  : isSelected
                  ? 'border-[var(--accent-red)] ring-1 ring-[var(--accent-red)]'
                  : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge Row */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-mono-label border ${
                    supplier.bid.tag === 'Lowest price'
                      ? 'border-blue-500/40 text-blue-400 bg-blue-500/10'
                      : supplier.bid.tag === 'Fastest delivery'
                      ? 'border-amber-500/40 text-amber-500 bg-amber-500/10'
                      : 'border-purple-500/40 text-purple-400 bg-purple-500/10'
                  }`}>
                    {supplier.bid.tag.toUpperCase()}
                  </span>

                  <VerifiedBadge
                    name={supplier.name}
                    details={supplier.verificationDetails}
                  />
                </div>

                {/* Company Name & Location */}
                <div>
                  <h3 className="font-heading text-base text-[var(--heading-color)]">
                    {supplier.name}
                  </h3>
                  <div className="text-xs text-[var(--muted-color)] mt-0.5">
                    {supplier.category} · {supplier.location}
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-1">
                  <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                    TOTAL SUBMITTED TENDER BID
                  </span>
                  <div className="text-2xl font-mono font-bold text-[var(--heading-color)] tabular-nums">
                    QAR {supplier.bid.priceQar.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[var(--muted-color)] block">
                    Fixed price inclusive of delivery & installation (Sample)
                  </span>
                </div>

                {/* Spec Points */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Product System</span>
                    <span className="font-semibold text-[var(--heading-color)] text-right">{supplier.bid.product}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">Delivery Timeline</span>
                    <span className="font-mono text-emerald-500 font-bold">{supplier.bid.deliveryWeeks} weeks</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                    <span className="text-[var(--muted-color)]">System Warranty</span>
                    <span className="font-mono text-[var(--accent-text)] font-bold">{supplier.bid.warrantyYears} years</span>
                  </div>
                </div>

                {/* Contractor Notes */}
                <div className="text-xs text-[var(--muted-color)] italic p-2.5 bg-[var(--inset-bg)] border border-[var(--border-color)]">
                  "{supplier.bid.notes}"
                </div>
              </div>

              {/* Bottom Selection Action */}
              <div className="pt-4 mt-4 border-t border-[var(--border-color)]">
                {isAwarded ? (
                  <div className="w-full py-2.5 text-center text-xs font-mono-label text-emerald-500 border border-emerald-500/40 bg-emerald-500/10 font-bold">
                    ✓ CONTRACT AWARDED
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSupplierId(supplier.id);
                    }}
                    className={`btn-action w-full text-xs justify-center ${
                      isSelected
                        ? 'border-[var(--accent-red)] text-[var(--accent-text)] bg-[var(--inset-bg)]'
                        : ''
                    }`}
                  >
                    {isSelected ? 'SELECTED FOR AWARD' : 'SELECT PROPOSAL'}
                  </button>
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
          onClick={() => setFlowStep('A3')}
          className="btn-action w-full sm:w-auto gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO TENDER PACKAGE</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!awardedSupplierId ? (
            <button
              type="button"
              onClick={handleAward}
              disabled={isAwarding || !selectedSupplierId}
              className="btn-primary w-full sm:w-auto gap-2 py-3 px-6 text-xs"
            >
              {isAwarding ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                  <span>RECORDING AWARD...</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>AWARD CONTRACT TO {suppliers.find((s) => s.id === selectedSupplierId)?.name.split(' ')[0]}</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-500 font-mono-label">
                TENDER CYCLE COMPLETED
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
