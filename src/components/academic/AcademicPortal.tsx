import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, CheckCircle2, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

interface InterestSubmission {
  orgName: string;
  orgType: string;
  contactName: string;
  email: string;
  needDescription: string;
  submittedAt: string;
}

export const AcademicPortal: React.FC = () => {
  const { setPortal } = useApp();

  const [form, setForm] = useState({
    orgName: '',
    orgType: 'University',
    contactName: '',
    email: '',
    needDescription: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.orgName.trim() || !form.contactName.trim() || !form.email.trim() || !form.needDescription.trim()) {
      setError('Please complete all fields to submit your expression of interest.');
      return;
    }
    setError(null);
    const submission: InterestSubmission = {
      ...form,
      submittedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('academic_interest_submissions') || '[]');
      existing.push(submission);
      localStorage.setItem('academic_interest_submissions', JSON.stringify(existing));
    } catch {
      // Local storage fallback
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[800px] mx-auto py-12 px-4 space-y-8">
      <div>
        <button
          type="button"
          onClick={() => setPortal(null)}
          className="btn-action text-xs gap-2 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO REGISTRY SELECTION</span>
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-center text-[var(--heading-color)]">
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-mono-label text-xs text-[var(--muted-color)]">ACADEMIC & RESEARCH PORTAL</span>
          <StatusChip status="Planned" />
        </div>

        <h1 className="text-3xl font-heading text-[var(--heading-color)] font-bold">
          Academic & Research Network
        </h1>
      </div>

      <div className="p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
        <p className="text-base text-[var(--text-primary)] leading-relaxed">
          Planned portal. Intended interactions: research and testing requests between labs, clubs and companies; cohort calls for studies; certification programs.
        </p>
      </div>

      {/* Register Interest Form */}
      <div className="p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-6">
        <div className="border-b border-[var(--border-color)] pb-4">
          <div className="text-xs font-mono uppercase text-muted tracking-wider">COLLABORATION REGISTRY</div>
          <h2 className="text-xl font-heading font-bold text-[var(--heading-color)] mt-1">
            Register Interest
          </h2>
          <p className="text-xs text-[var(--muted-color)] mt-1">
            Institutional partners and research laboratories can pre-register for upcoming cohort calls and biomechanics validation protocols.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Thanks, we will contact you</h3>
            <p className="text-xs text-[var(--muted-color)] max-w-md mx-auto">
              Your institutional expression of interest for {form.orgName} ({form.orgType}) has been logged in state. The accreditation committee reviews submissions quarterly.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setForm({
                  orgName: '',
                  orgType: 'University',
                  contactName: '',
                  email: '',
                  needDescription: '',
                });
              }}
              className="text-xs font-mono underline text-[var(--muted-color)] hover:text-[var(--heading-color)] pt-2 block mx-auto"
            >
              Submit another expression of interest
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-accent/10 border border-accent/30 text-xs text-accent">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--heading-color)] mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={form.orgName}
                  onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  placeholder="e.g. Qatar University Sports Science Lab"
                  className="w-full px-3 py-2 bg-page border border-border text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--heading-color)] mb-1">
                  Organization Type *
                </label>
                <select
                  value={form.orgType}
                  onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                  className="w-full px-3 py-2 bg-page border border-border text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                >
                  <option value="University">University</option>
                  <option value="Research Center">Research Center</option>
                  <option value="Lab">Lab</option>
                  <option value="Company">Company</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--heading-color)] mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  placeholder="Full name of primary researcher or lead"
                  className="w-full px-3 py-2 bg-page border border-border text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--heading-color)] mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@institution.edu.qa"
                  className="w-full px-3 py-2 bg-page border border-border text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--heading-color)] mb-1">
                What you need *
              </label>
              <textarea
                value={form.needDescription}
                onChange={(e) => setForm({ ...form, needDescription: e.target.value })}
                rows={4}
                placeholder="Describe your research requirements, testing facilities, athlete cohorts needed, or certification queries..."
                className="w-full px-3 py-2 bg-page border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-accent text-white font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Expression of Interest</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
