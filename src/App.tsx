/**
 * Athlete Directory - Verified Registry & Marketplace Prototype
 * Main App Container & Multi-Scenario Interactive Router
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/shared/Header.tsx';
import { VerifiedModal } from './components/shared/VerifiedModal.tsx';
import { DemoControls } from './components/shared/DemoControls.tsx';
import { LandingScreen } from './components/landing/LandingScreen.tsx';
import { AcademicPortal } from './components/academic/AcademicPortal.tsx';

// Business Portal Screens
import { A1FacilityBrief } from './components/flowA/A1FacilityBrief.tsx';
import { A2FeasibilityEstimate } from './components/flowA/A2FeasibilityEstimate.tsx';
import { A3TenderPackage } from './components/flowA/A3TenderPackage.tsx';
import { A6BidComparison } from './components/flowA/A6BidComparison.tsx';
import { A4RequestsInbox } from './components/flowA/A4RequestsInbox.tsx';
import { A5RequestAndBid } from './components/flowA/A5RequestAndBid.tsx';
import { B4PostVacancy } from './components/flowB/B4PostVacancy.tsx';
import { B5CandidateShortlist } from './components/flowB/B5CandidateShortlist.tsx';
import { B6CandidateProfile } from './components/flowB/B6CandidateProfile.tsx';

// Individual Portal Screens
import { B1CoachProfile } from './components/flowB/B1CoachProfile.tsx';
import { B2Opportunities } from './components/flowB/B2Opportunities.tsx';
import { B3JobDetailAndApply } from './components/flowB/B3JobDetailAndApply.tsx';
import { B7MyApplications } from './components/flowB/B7MyApplications.tsx';
import { C6CoachSchedule } from './components/flowC/C6CoachSchedule.tsx';

// Athlete & Parent Portal Screens
import { C1FindCoach } from './components/flowC/C1FindCoach.tsx';
import { C2Results } from './components/flowC/C2Results.tsx';
import { C3CoachProfile } from './components/flowC/C3CoachProfile.tsx';
import { C4RequestSession } from './components/flowC/C4RequestSession.tsx';
import { C5RequestStatus } from './components/flowC/C5RequestStatus.tsx';

const AppContent: React.FC = () => {
  const {
    portal,
    setPortal,
    setMode,
    flowStep,
    setFlowStep,
    viewportMode,
    setViewportMode,
    toastMessage
  } = useApp();

  // Define section navigation metadata and stepper items
  const getSectionMetadata = () => {
    // Business: Plan a facility
    if (['A1', 'A2', 'A3', 'A6'].includes(flowStep)) {
      const steps = [
        { id: 'A1', label: '1. Facility Brief' },
        { id: 'A2', label: '2. Feasibility Estimate' },
        { id: 'A3', label: '3. Tender Package' },
        { id: 'A6', label: '4. Bid Comparison & Award' }
      ];
      const idx = steps.findIndex((s) => s.id === flowStep);
      return {
        sectionTitle: 'Plan a facility',
        breadcrumb: `Plan a facility · Step ${idx + 1} of ${steps.length}`,
        steps
      };
    }

    // Business: Hire a coach
    if (['B4', 'B5', 'B6'].includes(flowStep)) {
      const steps = [
        { id: 'B4', label: '1. Post Vacancy' },
        { id: 'B5', label: '2. Candidate Shortlist' },
        { id: 'B6', label: '3. Candidate Profile & Interview' }
      ];
      const idx = steps.findIndex((s) => s.id === flowStep);
      return {
        sectionTitle: 'Hire a coach',
        breadcrumb: `Hire a coach · Step ${idx + 1} of ${steps.length}`,
        steps
      };
    }

    // Business: Requests
    if (['A4', 'A5'].includes(flowStep)) {
      const steps = [
        { id: 'A4', label: '1. Requests Inbox' },
        { id: 'A5', label: '2. Request & Bid' }
      ];
      const idx = steps.findIndex((s) => s.id === flowStep);
      return {
        sectionTitle: 'Requests',
        breadcrumb: `Requests · Step ${idx + 1} of ${steps.length}`,
        steps
      };
    }

    // Individual: My profile
    if (flowStep === 'B1') {
      const steps = [{ id: 'B1', label: '1. Profile Details' }];
      return {
        sectionTitle: 'My profile',
        breadcrumb: 'My profile · Step 1 of 1',
        steps
      };
    }

    // Individual: Opportunities
    if (['B2', 'B3'].includes(flowStep)) {
      const steps = [
        { id: 'B2', label: '1. Vacancies' },
        { id: 'B3', label: '2. Job Detail & Apply' }
      ];
      const idx = steps.findIndex((s) => s.id === flowStep);
      return {
        sectionTitle: 'Opportunities',
        breadcrumb: `Opportunities · Step ${idx + 1} of ${steps.length}`,
        steps
      };
    }

    // Individual: My applications
    if (flowStep === 'B7') {
      const steps = [{ id: 'B7', label: '1. Applications & Offers' }];
      return {
        sectionTitle: 'My applications',
        breadcrumb: 'My applications · Step 1 of 1',
        steps
      };
    }

    // Individual: Session requests
    if (flowStep === 'C6') {
      const steps = [{ id: 'C6', label: '1. Schedule & Session Requests' }];
      return {
        sectionTitle: 'Session requests',
        breadcrumb: 'Session requests · Step 1 of 1',
        steps
      };
    }

    // Athlete or parent: Find a coach
    if (['C1', 'C2', 'C3', 'C4'].includes(flowStep)) {
      const steps = [
        { id: 'C1', label: '1. Find a Coach' },
        { id: 'C2', label: '2. Search Results' },
        { id: 'C3', label: '3. Coach Profile' },
        { id: 'C4', label: '4. Request Session' }
      ];
      const idx = steps.findIndex((s) => s.id === flowStep);
      return {
        sectionTitle: 'Find a coach',
        breadcrumb: `Find a coach · Step ${idx + 1} of ${steps.length}`,
        steps
      };
    }

    // Athlete or parent: My requests
    if (flowStep === 'C5') {
      const steps = [{ id: 'C5', label: '1. Request Status & Bookings' }];
      return {
        sectionTitle: 'My requests',
        breadcrumb: 'My requests · Step 1 of 1',
        steps
      };
    }

    return {
      sectionTitle: 'Overview',
      breadcrumb: 'Portal Overview',
      steps: []
    };
  };

  const { breadcrumb, steps } = getSectionMetadata();

  // Render current active screen
  const renderCurrentScreen = () => {
    if (portal === null) {
      return <LandingScreen />;
    }

    if (portal === 'academic') {
      return <AcademicPortal />;
    }

    switch (flowStep) {
      // Business - Buying: Facility
      case 'A1':
        return <A1FacilityBrief />;
      case 'A2':
        return <A2FeasibilityEstimate />;
      case 'A3':
        return <A3TenderPackage />;
      case 'A6':
        return <A6BidComparison />;

      // Business - Buying: Coach Recruitment
      case 'B4':
        return <B4PostVacancy />;
      case 'B5':
        return <B5CandidateShortlist />;
      case 'B6':
        return <B6CandidateProfile />;

      // Business - Selling: Supplier
      case 'A4':
        return <A4RequestsInbox />;
      case 'A5':
        return <A5RequestAndBid />;

      // Individual - Coach
      case 'B1':
        return <B1CoachProfile />;
      case 'B2':
        return <B2Opportunities />;
      case 'B3':
        return <B3JobDetailAndApply />;
      case 'B7':
        return <B7MyApplications />;
      case 'C6':
        return <C6CoachSchedule />;

      // Athlete or parent
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

      default:
        return <LandingScreen />;
    }
  };

  const isMobileFrame = viewportMode === 'mobile390';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* 72px Main Header */}
      <Header />

      {/* Breadcrumb & Stepper Sub-Navbar (only when inside an active portal) */}
      {portal && portal !== 'academic' && (
        <div className="bg-[var(--panel-bg)] border-b border-[var(--border-color)] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[var(--heading-color)] font-mono">
              {breadcrumb}
            </span>
          </div>

          {/* Right: Stepper Navigator Tabs */}
          {steps.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto">
              {steps.map((step) => {
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
          )}
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 py-6 px-4 sm:px-6 max-w-[1440px] w-full mx-auto">
        {isMobileFrame ? (
          <div className="flex flex-col items-center justify-center my-2">
            <div className="text-[11px] font-mono text-[var(--muted-color)] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-red)] inline-block" />
              <span>MOBILE 390PX VIEWPORT EMULATION</span>
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

      {/* Floating Demo Controls (Activated by ?demo=1) */}
      <DemoControls />

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
              <button
                onClick={() => {
                  setPortal('business');
                  setMode('buying');
                  setFlowStep('A1');
                }}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Business Portal
              </button>
              <button
                onClick={() => {
                  setPortal('individual');
                  setFlowStep('B1');
                }}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Individual Portal
              </button>
              <button
                onClick={() => {
                  setPortal('academic');
                }}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Academic Portal
              </button>
              <button
                onClick={() => {
                  setPortal('athlete');
                  setFlowStep('C1');
                }}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Athlete & Parent Portal
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
