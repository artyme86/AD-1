/**
 * Athlete Directory - Verified Registry & Marketplace Prototype
 * Main App Container & Multi-Scenario Interactive Router
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/shared/Header.tsx';
import { VerifiedModal } from './components/shared/VerifiedModal.tsx';

// Flow A
import { A1FacilityBrief } from './components/flowA/A1FacilityBrief.tsx';
import { A2FeasibilityEstimate } from './components/flowA/A2FeasibilityEstimate.tsx';
import { A3TenderPackage } from './components/flowA/A3TenderPackage.tsx';
import { A6BidComparison } from './components/flowA/A6BidComparison.tsx';
import { A4RequestsInbox } from './components/flowA/A4RequestsInbox.tsx';
import { A5RequestAndBid } from './components/flowA/A5RequestAndBid.tsx';

// Flow B
import { B1CoachProfile } from './components/flowB/B1CoachProfile.tsx';
import { B2Opportunities } from './components/flowB/B2Opportunities.tsx';
import { B3JobDetailAndApply } from './components/flowB/B3JobDetailAndApply.tsx';
import { B7MyApplications } from './components/flowB/B7MyApplications.tsx';
import { B4PostVacancy } from './components/flowB/B4PostVacancy.tsx';
import { B5CandidateShortlist } from './components/flowB/B5CandidateShortlist.tsx';
import { B6CandidateProfile } from './components/flowB/B6CandidateProfile.tsx';

// Flow C
import { C1FindCoach } from './components/flowC/C1FindCoach.tsx';
import { C2Results } from './components/flowC/C2Results.tsx';
import { C3CoachProfile } from './components/flowC/C3CoachProfile.tsx';
import { C4RequestSession } from './components/flowC/C4RequestSession.tsx';
import { C5RequestStatus } from './components/flowC/C5RequestStatus.tsx';
import { C6CoachSchedule } from './components/flowC/C6CoachSchedule.tsx';

const AppContent: React.FC = () => {
  const {
    activeFlow,
    setActiveFlow,
    flowStep,
    setFlowStep,
    persona,
    setPersona,
    role,
    viewportMode,
    setViewportMode,
    toastMessage
  } = useApp();

  // Define Steps per flow and role
  const getStepNavItems = () => {
    if (activeFlow === 'A') {
      if (persona === 'Supplier') {
        return [
          { id: 'A4', label: 'A4. Requests Inbox', roleHint: 'Supplier' },
          { id: 'A5', label: 'A5. Request & Bid', roleHint: 'Supplier' }
        ];
      }
      return [
        { id: 'A1', label: 'A1. Facility Brief', roleHint: 'Club' },
        { id: 'A2', label: 'A2. Feasibility Estimate', roleHint: 'Club' },
        { id: 'A3', label: 'A3. Tender Package', roleHint: 'Club' },
        { id: 'A6', label: 'A6. Bid Comparison & Award', roleHint: 'Club' }
      ];
    }

    if (activeFlow === 'B') {
      if (persona === 'Coach') {
        return [
          { id: 'B1', label: 'B1. Coach Profile', roleHint: 'Coach' },
          { id: 'B2', label: 'B2. Opportunities', roleHint: 'Coach' },
          { id: 'B3', label: 'B3. Job Detail & Apply', roleHint: 'Coach' },
          { id: 'B7', label: 'B7. My Applications', roleHint: 'Coach' }
        ];
      }
      return [
        { id: 'B4', label: 'B4. Post Vacancy', roleHint: 'Club' },
        { id: 'B5', label: 'B5. Candidate Shortlist', roleHint: 'Club' },
        { id: 'B6', label: 'B6. Candidate Profile & Interview', roleHint: 'Club' }
      ];
    }

    // Flow C
    if (persona === 'Coach') {
      return [
        { id: 'C6', label: 'C6. Session Requests & Schedule', roleHint: 'Coach' }
      ];
    }
    return [
      { id: 'C1', label: 'C1. Find a Coach', roleHint: 'Parent' },
      { id: 'C2', label: 'C2. Search Results', roleHint: 'Parent' },
      { id: 'C3', label: 'C3. Coach Profile', roleHint: 'Parent' },
      { id: 'C4', label: 'C4. Request Session', roleHint: 'Parent' },
      { id: 'C5', label: 'C5. Request Status & Bookings', roleHint: 'Parent' }
    ];
  };

  const stepItems = getStepNavItems();

  // Render current active screen
  const renderCurrentScreen = () => {
    switch (flowStep) {
      // Flow A
      case 'A1':
        return <A1FacilityBrief />;
      case 'A2':
        return <A2FeasibilityEstimate />;
      case 'A3':
        return <A3TenderPackage />;
      case 'A6':
        return <A6BidComparison />;
      case 'A4':
        return <A4RequestsInbox />;
      case 'A5':
        return <A5RequestAndBid />;

      // Flow B
      case 'B1':
        return <B1CoachProfile />;
      case 'B2':
        return <B2Opportunities />;
      case 'B3':
        return <B3JobDetailAndApply />;
      case 'B7':
        return <B7MyApplications />;
      case 'B4':
        return <B4PostVacancy />;
      case 'B5':
        return <B5CandidateShortlist />;
      case 'B6':
        return <B6CandidateProfile />;

      // Flow C
      case 'C1':
        return <C1FindCoach />;
      case 'C2':
        return <C2Results />;
      case 'C3':
        return <C3CoachProfile />;
      case 'C4':
        return <C4RequestSession />;
      case 'C5':
        return <C5RequestStatus />;
      case 'C6':
        return <C6CoachSchedule />;

      default:
        return <A1FacilityBrief />;
    }
  };

  const isMobileFrame = (activeFlow === 'B' || activeFlow === 'C') && viewportMode === 'mobile390';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* 72px Main Header */}
      <Header />

      {/* Secondary Scenario & Stepper Sub-Navbar */}
      <div className="bg-[var(--panel-bg)] border-b border-[var(--border-color)] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Current Perspective Description */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-label text-[10px] text-[var(--muted-color)]">
            CURRENT FLOW:
          </span>
          <span className="font-bold text-[var(--heading-color)]">
            {activeFlow === 'A' && 'A. B2B Facility Planning & Tender'}
            {activeFlow === 'B' && 'B. Club Youth Coach Hiring'}
            {activeFlow === 'C' && 'C. Parent Private Coach Discovery'}
          </span>
          <span className="text-[var(--border-color)]">|</span>
          <span className="text-[var(--muted-color)] font-mono text-[11px]">
            Perspective: <strong className="text-[var(--accent-text)]">{persona}</strong> ({role})
          </span>
        </div>

        {/* Right: Screen Navigator Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {stepItems.map((step) => {
            const isActive = flowStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setFlowStep(step.id)}
                className={`px-2.5 py-1 text-[11px] font-mono-label cursor-pointer whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                    : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 py-6 px-4 sm:px-6 max-w-[1440px] w-full mx-auto">
        {isMobileFrame ? (
          <div className="flex flex-col items-center justify-center my-2">
            <div className="text-[11px] font-mono text-[var(--muted-color)] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-red)] inline-block" />
              <span>MOBILE 390PX VIEWPORT EMULATION (FLOW {activeFlow})</span>
              <button
                onClick={() => setViewportMode('responsive')}
                className="underline hover:text-[var(--text-primary)] cursor-pointer ml-2"
              >
                Return to full desktop
              </button>
            </div>

            {/* Simulated 390px Phone Wrapper */}
            <div className="w-[390px] border-2 border-[var(--border-color)] bg-[var(--page-bg)] p-3 overflow-hidden shadow-none">
              <div className="h-6 border-b border-[var(--border-color)] mb-3 flex items-center justify-between text-[10px] font-mono text-[var(--muted-color)] px-1">
                <span>09:41</span>
                <span>5G · 100%</span>
              </div>
              <div className="overflow-y-auto max-h-[780px] pr-1">
                {renderCurrentScreen()}
              </div>
            </div>
          </div>
        ) : (
          renderCurrentScreen()
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 p-4 border border-[var(--accent-red)] bg-[var(--panel-bg)] text-xs text-[var(--heading-color)] max-w-md flex items-center justify-between gap-3 shadow-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--accent-red)] inline-block shrink-0" />
            <span className="font-mono text-xs">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Official Verification Audit Dossier Modal */}
      <VerifiedModal />

      {/* Civic / Institutional Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--panel-bg)] py-8 px-4 sm:px-6 text-xs text-[var(--muted-color)] mt-12">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-heading text-sm font-bold text-[var(--heading-color)] flex items-center gap-2">
                <span className="text-[var(--accent-text)]">▲</span> ATHLETE DIRECTORY
              </div>
              <p className="text-[11px] text-[var(--muted-color)]">
                Verified registry and marketplace for sports infrastructure, certified coaching recruitment, and youth development.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <button onClick={() => { setActiveFlow('A'); setPersona('Club'); }} className="hover:text-[var(--text-primary)]">
                Flow A (B2B Facility)
              </button>
              <button onClick={() => { setActiveFlow('B'); setPersona('Coach'); }} className="hover:text-[var(--text-primary)]">
                Flow B (Youth Coach)
              </button>
              <button onClick={() => { setActiveFlow('C'); setPersona('Parent'); }} className="hover:text-[var(--text-primary)]">
                Flow C (Private Coach)
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
            <span>© 2026 Athlete Directory. All sample names, figures and prices marked as Sample. Illustrative estimates are not quotations.</span>
            <span className="text-emerald-500">Registry Integrity: 100% Verified Credentials</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
