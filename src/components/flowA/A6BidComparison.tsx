import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, Clock, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';
import { Stepper, StepItem } from '../shared/Stepper.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const A6BidComparison: React.FC = () => {
  const {
    suppliers,
    awardedSupplierId,
    awardSupplier,
    tenderPackages,
    selectedPackageForComparison,
    setSelectedPackageForComparison,
    bids,
    setFlowStep
  } = useApp();

  const [sortBy, setSortBy] = useState<'price' | 'delivery' | 'warranty'>('price');
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [isAwarding, setIsAwarding] = useState(false);

  const activePackage =
    tenderPackages.find((p) => p.id === selectedPackageForComparison) ||
    tenderPackages[0] || {
      id: 'pkg-turf',
      title: 'Premium artificial turf pitch package'
    };

  // Bids for the active package
  const packageBids = bids.filter((b) => b.requestId === activePackage.id);

  // Sorted list of bids
  const sortedBids = [...packageBids].sort((a, b) => {
    if (sortBy === 'price') return a.priceQar - b.priceQar;
    if (sortBy === 'delivery') return a.deliveryWeeks - b.deliveryWeeks;
    if (sortBy === 'warranty') return b.warrantyYears - a.warrantyYears;
    return 0;
  });

  const handleAward = () => {
    if (!selectedBidId) return;
    const bid = packageBids.find((b) => b.id === selectedBidId);
    if (!bid) return;
    setIsAwarding(true);
    setTimeout(() => {
      awardSupplier(bid.supplierId);
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
            <span>BUSINESS PORTAL</span>
            <span>/</span>
            <span>PLAN A FACILITY</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A6 BID COMPARISON & AWARD</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Tender Bids Evaluation: {activePackage.title}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Compare compliant proposals received from verified sports infrastructure contractors side by side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Illustrative estimate, not a quotation" />
          <StatusChip status={`${packageBids.length} ${packageBids.length === 1 ? 'Bid Received' : 'Bids Received'}`} />
          <StatusChip status="Sample" />
        </div>
      </div>

      {/* Package Selector (if multiple packages exist) */}
      {tenderPackages.length > 1 && (
        <div className="p-3 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono-label text-[var(--muted-color)]">EVALUATE PACKAGE:</span>
          {tenderPackages.map((pkg) => {
            const count = bids.filter((b) => b.requestId === pkg.id).length;
            const isSelected = activePackage.id === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => {
                  setSelectedPackageForComparison(pkg.id);
                  setSelectedBidId(null);
                }}
                className={`btn-action text-xs py-1 px-3 ${
                  isSelected
                    ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                    : 'text-[var(--muted-color)]'
                }`}
              >
                <span>{pkg.title}</span>
                <span className="text-[10px] font-mono ml-1.5 px-1 border border-[var(--border-color)]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}



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

      {/* Main Content: Empty State vs Bids Matrix */}
      {packageBids.length === 0 ? (
        <EmptyState
          title="No bids yet. Suppliers decide whether to bid."
          description="This tender package is currently open to verified contractors. Once a supplier submits a quotation (e.g., via A5 or the Demo controls panel), their proposal will populate this comparison matrix."
          actionLabel="SUBMIT A BID AS SUPPLIER (A5)"
          onAction={() => setFlowStep('A5')}
        />
      ) : (
        <div className="space-y-4">
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

          {/* Bids Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedBids.map((bid) => {
              const supplier =
                suppliers.find((s) => s.id === bid.supplierId) || suppliers[0];
              const isSelected = selectedBidId === bid.id;
              const isAwarded = awardedSupplierId === supplier.id;

              return (
                <div
                  key={bid.id}
                  onClick={() => setSelectedBidId(bid.id)}
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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {bid.source === 'simulated' ? (
                          <span className="px-2 py-0.5 text-[10px] font-mono-label border border-amber-500/40 text-amber-500 bg-amber-500/10">
                            Simulated
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-mono-label border border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                            Live Submission
                          </span>
                        )}
                      </div>

                      {supplier.verified ? (
                        <VerifiedBadge
                          name={supplier.name}
                          details={supplier.verificationDetails}
                        />
                      ) : (
                        <StatusChip status="Pending" />
                      )}
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
                        QAR {bid.priceQar.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-[var(--muted-color)] block">
                        Fixed price inclusive of delivery & installation (Sample)
                      </span>
                    </div>

                    {/* Spec Points */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                        <span className="text-[var(--muted-color)]">Product System</span>
                        <span className="font-semibold text-[var(--heading-color)] text-right">{bid.product}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                        <span className="text-[var(--muted-color)]">Delivery Timeline</span>
                        <span className="font-mono text-emerald-500 font-bold">{bid.deliveryWeeks} weeks</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                        <span className="text-[var(--muted-color)]">System Warranty</span>
                        <span className="font-mono text-[var(--accent-text)] font-bold">{bid.warrantyYears} years</span>
                      </div>
                    </div>

                    {/* Contractor Notes */}
                    <div className="text-xs text-[var(--muted-color)] italic p-2.5 bg-[var(--inset-bg)] border border-[var(--border-color)]">
                      "{bid.notes}"
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
                          setSelectedBidId(bid.id);
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
        </div>
      )}

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
          {packageBids.length > 0 && !awardedSupplierId && (
            <button
              type="button"
              onClick={handleAward}
              disabled={isAwarding || !selectedBidId}
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
                  <span>AWARD CONTRACT TO SELECTED BIDDER</span>
                </>
              )}
            </button>
          )}

          {awardedSupplierId && (
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
