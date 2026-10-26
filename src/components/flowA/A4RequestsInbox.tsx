import React, { useState } from 'react';
import { Inbox, FileText, Clock, Building2, CheckCircle2, ChevronRight, XCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';
import { EmptyState } from '../shared/EmptyState.tsx';

export const A4RequestsInbox: React.FC = () => {
  const { supplierRequests, setFlowStep, suppliers, setSelectedPackageForComparison } = useApp();
  const [tab, setTab] = useState<'New' | 'Bid sent' | 'Declined'>('New');

  const mySupplierProfile = suppliers[0]; // Northgate Sports Infrastructure (Sample)

  const filteredRequests = supplierRequests.filter((r) => r.status === tab);

  const handleReviewRequest = (requestId: string) => {
    setSelectedPackageForComparison(requestId);
    setFlowStep('A5');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>BUSINESS PORTAL</span>
            <span>/</span>
            <span>SUPPLIER REQUESTS</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A4 REQUESTS INBOX</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Tender Requests & RFPs Inbox
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Invitations to tender issued by athletic clubs, developers, and governing bodies in Qatar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Provider View" />
          <StatusChip status="Sample" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Requests List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tabs */}
          <div className="flex border border-[var(--border-color)] bg-[var(--inset-bg)]">
            {(['New', 'Bid sent', 'Declined'] as ('New' | 'Bid sent' | 'Declined')[]).map((t) => {
              const count = supplierRequests.filter((r) => r.status === t).length;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
                    tab === t
                      ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                      : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{t.toUpperCase()}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--border-color)]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards List or Empty State */}
          {filteredRequests.length === 0 ? (
            <EmptyState
              title={`No requests under "${tab}"`}
              description={
                tab === 'New'
                  ? 'There are no open tenders awaiting your review at this time. Published client tenders will appear here.'
                  : `No tenders have been marked as ${tab.toLowerCase()} yet.`
              }
              actionLabel={tab !== 'New' ? 'VIEW NEW TENDERS' : undefined}
              onAction={tab !== 'New' ? () => setTab('New') : undefined}
            />
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 border border-[var(--border-color)] overflow-hidden shrink-0 hidden sm:block relative">
                        <img
                          src={req.category.toLowerCase().includes('aquatic') || req.title.toLowerCase().includes('pool')
                            ? 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=300&q=80'
                            : req.category.toLowerCase().includes('arena') || req.title.toLowerCase().includes('hall')
                            ? 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80'
                            : 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=300&q=80'}
                          alt={req.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                            {req.category}
                          </span>
                          <span className="text-xs text-[var(--border-color)]">/</span>
                          <span className="text-xs font-mono text-[var(--accent-text)]">
                            TIER: {req.tier}
                          </span>
                        </div>
                        <h3 className="font-heading text-base text-[var(--heading-color)] font-bold">
                          {req.title}
                        </h3>
                        <div className="text-xs text-[var(--muted-color)] flex items-center gap-2">
                          <span>{req.facility}</span>
                          <span>·</span>
                          <span>{req.location}</span>
                        </div>
                      </div>
                    </div>

                    <StatusChip status={req.status} />
                  </div>

                  {/* Specs Snippet */}
                  <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] space-y-1.5">
                    <div className="text-[10px] font-mono-label text-[var(--muted-color)]">
                      TECHNICAL REQUIREMENTS OVERVIEW
                    </div>
                    <ul className="space-y-1 list-disc list-inside text-[var(--muted-color)]">
                      {req.specs.slice(0, 3).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Submission Info if Bid Sent */}
                  {req.submittedBid && (
                    <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 text-xs space-y-1 font-mono">
                      <div className="text-emerald-500 font-bold">SUBMITTED BID DETAILS:</div>
                      <div className="text-[var(--text-primary)]">
                        Price: QAR {req.submittedBid.priceQar.toLocaleString()} · Delivery: {req.submittedBid.deliveryWeeks} weeks · Warranty: {req.submittedBid.warrantyYears} yrs
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted-color)]">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Bids close in {req.deadlineDays} days</span>
                    </div>

                    {req.status === 'New' && (
                      <button
                        type="button"
                        onClick={() => handleReviewRequest(req.id)}
                        className="btn-primary py-2 px-4 text-xs gap-1.5"
                      >
                        <span>REVIEW REQUEST & BID</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side Card: "Your Listing" (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono-label text-[var(--muted-color)]">
                YOUR VERIFIED LISTING
              </span>
              <VerifiedBadge
                name={mySupplierProfile.name}
                details={mySupplierProfile.verificationDetails}
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-base text-[var(--heading-color)]">
                {mySupplierProfile.name}
              </h3>
              <p className="text-xs text-[var(--muted-color)]">
                {mySupplierProfile.category}
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-[var(--border-color)] py-3">
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Registration</span>
                <span className="font-mono text-[var(--heading-color)]">
                  {mySupplierProfile.verificationDetails.crNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Audit Authority</span>
                <span className="text-[var(--heading-color)]">
                  {mySupplierProfile.verificationDetails.authority}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Accreditations</span>
                <span className="font-mono text-emerald-500 font-bold text-right text-[11px]">
                  installer qualification, to be stated by the bidder
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Active Tenders</span>
                <span className="font-mono text-[var(--heading-color)]">{supplierRequests.length} active packages</span>
              </div>
            </div>

            <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] text-xs text-[var(--muted-color)] space-y-1">
              <span className="font-mono-label block text-[10px] text-[var(--text-primary)]">
                VERIFICATION STATUS
              </span>
              <p className="text-[11px] leading-relaxed">
                Your company profile is cleared to submit quotations on official sports development tenders across Qatar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
