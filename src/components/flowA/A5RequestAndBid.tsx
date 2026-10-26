import React, { useState } from 'react';
import { ArrowLeft, Send, XCircle, CheckCircle2, ShieldCheck, Clock, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const A5RequestAndBid: React.FC = () => {
  const {
    supplierRequests,
    submitSupplierBid,
    declineSupplierRequest,
    setFlowStep,
    selectedPackageForComparison
  } = useApp();

  const activeRequest =
    supplierRequests.find((r) => r.id === selectedPackageForComparison) ||
    supplierRequests[0] || {
      id: 'pkg-turf',
      title: 'Premium artificial turf pitch package',
      category: 'Sports Surfaces & Civil Works',
      facility: 'Club Facility (Sample)',
      location: 'Doha, Qatar',
      tier: 'Premium',
      deadlineDays: 14,
      status: 'New',
      specs: [
        'UV-stabilised polyethylene monofilament 50mm pile height',
        'heat-limiting infill designed to reduce surface heat; supplier to document performance',
        'Shock pad elastic layer with laser-levelled sub-base',
        'relevant international quality certification, to be stated by the bidder',
        'UV warranty period to be stated by the bidder'
      ]
    };

  const [formData, setFormData] = useState({
    priceQar: '840000',
    product: 'Pro Turf (Sample)',
    deliveryWeeks: '6',
    warrantyYears: '8',
    notes: 'Proposal includes laser sub-base calibration, shock pad underlayment, and heat-limiting infill designed to reduce surface heat; supplier to document performance.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitSupplierBid(activeRequest.id, {
        priceQar: Number(formData.priceQar) || 840000,
        product: formData.product,
        deliveryWeeks: Number(formData.deliveryWeeks) || 6,
        warrantyYears: Number(formData.warrantyYears) || 8,
        notes: formData.notes
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 500);
  };

  const handleDecline = () => {
    declineSupplierRequest(activeRequest.id);
    setFlowStep('A4');
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
            <span className="text-[var(--accent-text)]">A5 REQUEST & BID SUBMISSION</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Tender Specification & Bid Proposal
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Review detailed technical requirements and formulate an official commercial tender bid.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Sample Form" />
        </div>
      </div>

      {submittedSuccess ? (
        <div className="p-8 border border-emerald-500/40 bg-[var(--panel-bg)] space-y-4 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-heading text-[var(--heading-color)]">
            Bid Successfully Transmitted
          </h2>
          <p className="text-xs text-[var(--muted-color)] leading-relaxed">
            Your quotation of <strong className="text-[var(--text-primary)] font-mono">QAR {Number(formData.priceQar).toLocaleString()} (Sample)</strong> has been submitted. The client's comparison screen in stage A6 now lists this live bid.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setFlowStep('A4')}
              className="btn-action text-xs"
            >
              RETURN TO INBOX
            </button>
            <button
              onClick={() => setFlowStep('A6')}
              className="btn-primary text-xs"
            >
              PREVIEW CLIENT COMPARISON (A6)
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Requirements Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono-label text-[var(--muted-color)]">
                  RFP WORK PACKAGE
                </span>
                <h3 className="font-heading text-lg text-[var(--heading-color)] mt-1">
                  {activeRequest.title}
                </h3>
                <div className="text-xs text-[var(--muted-color)] mt-0.5">
                  Client: {activeRequest.facility} · {activeRequest.location}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                  <span className="text-[var(--muted-color)]">Quality Standard</span>
                  <span className="font-mono text-emerald-500 font-bold text-right text-[11px]">
                    relevant international quality certification, to be stated by the bidder
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                  <span className="text-[var(--muted-color)]">Target Climate</span>
                  <span className="font-mono text-[var(--heading-color)]">Doha summer conditions</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                  <span className="text-[var(--muted-color)]">Bid Deadline</span>
                  <span className="font-mono text-amber-500 font-bold">{activeRequest.deadlineDays} calendar days</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono-label block text-[10px] text-[var(--muted-color)]">
                  MANDATORY SPECIFICATIONS
                </span>
                <ul className="text-xs text-[var(--muted-color)] space-y-2">
                  {activeRequest.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent-red)] font-bold">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={handleDecline}
                  className="btn-action w-full justify-center text-xs text-red-400 hover:text-red-300 border-red-500/30 gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>DECLINE TO BID ON THIS RFP</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bid Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitBid} className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
              <div className="border-b border-[var(--border-color)] pb-3">
                <h3 className="font-heading text-base text-[var(--heading-color)]">
                  Formulate Commercial Tender Bid
                </h3>
                <p className="text-xs text-[var(--muted-color)]">
                  All price fields must be expressed in QAR (Sample). Once transmitted, this quotation cannot be withdrawn before the closing deadline.
                </p>
              </div>

              {/* Total Price */}
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                  TOTAL TENDER PRICE (QAR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-mono text-[var(--muted-color)]">QAR</span>
                  <input
                    type="number"
                    required
                    value={formData.priceQar}
                    onChange={(e) => setFormData({ ...formData, priceQar: e.target.value })}
                    className="w-full pl-12 pr-3 py-2 text-xs font-mono bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] font-bold text-base"
                    placeholder="840000"
                  />
                </div>
                <span className="block text-[10px] text-[var(--muted-color)] mt-1 font-mono">
                  Sample figure. Inclusive of delivery, laser grading & infill compaction.
                </span>
              </div>

              {/* Product and Model */}
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                  PRODUCT SYSTEM & MODEL SPECIFICATION *
                </label>
                <input
                  type="text"
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>

              {/* Delivery & Warranty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                    DELIVERY TIMELINE (WEEKS) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={52}
                    value={formData.deliveryWeeks}
                    onChange={(e) => setFormData({ ...formData, deliveryWeeks: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                    WARRANTY DURATION (YEARS) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={25}
                    value={formData.warrantyYears}
                    onChange={(e) => setFormData({ ...formData, warrantyYears: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                  />
                </div>
              </div>

              {/* Technical Compliance Notes */}
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1.5">
                  TECHNICAL COMPLIANCE NOTES & HEAT MITIGATION STRATEGY
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setFlowStep('A4')}
                  className="btn-action text-xs gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CANCEL</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs gap-2 py-2.5 px-6"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                      <span>SUBMITTING QUOTE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT BINDING BID (QAR)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
