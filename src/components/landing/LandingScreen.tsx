import React from 'react';
import { Building2, User, GraduationCap, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const LandingScreen: React.FC = () => {
  const { setPortal, setMode, setFlowStep } = useApp();

  const handleOpenBusiness = () => {
    setMode('buying');
    setPortal('business');
    setFlowStep('A1');
  };

  const handleOpenIndividual = () => {
    setPortal('individual');
    setFlowStep('B1');
  };

  const handleOpenAcademic = () => {
    setPortal('academic');
  };

  const handleOpenAthlete = () => {
    setPortal('athlete');
    setFlowStep('C1');
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8 sm:py-12 px-2 sm:px-4">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--border-color)] bg-[var(--panel-bg)] text-xs font-mono-label text-[var(--muted-color)] mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>VERIFIED REGISTRY & MARKETPLACE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[var(--heading-color)] font-bold tracking-tight">
          One verified registry. Four entry points.
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted-color)] mt-3 leading-relaxed">
          Select your organization or personal profile category to access verified tenders, certified personnel, accredited infrastructure, and marketplace services.
        </p>
      </div>

      {/* Four entry point cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Card 1: Business */}
        <div
          onClick={handleOpenBusiness}
          className="border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col justify-between hover:border-[var(--accent-red)] transition-all cursor-pointer group overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenBusiness()}
        >
          {/* Card Image Header */}
          <div className="h-40 sm:h-44 w-full relative overflow-hidden border-b border-[var(--border-color)]">
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80"
              alt="Sports Infrastructure & Stadium Facilities"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-bg)] via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 border border-white/20 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                <Building2 className="w-4 h-4 text-[var(--accent-text)]" />
              </div>
              <span className="text-[10px] font-mono-label text-white/90 bg-black/70 backdrop-blur-xs border border-white/20 px-2 py-0.5">
                B2B & INSTITUTIONAL
              </span>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>TURF · AQUATICS · ARENAS</span>
              <span className="text-emerald-400 font-bold">53+ Verified Suppliers</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading text-[var(--heading-color)] font-bold mb-2">
                Business
              </h2>
              <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                Clubs, facilities, suppliers, academies, sports bodies and companies. Plan, tender, bid and hire.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-xs font-mono-label text-[var(--heading-color)] group-hover:text-[var(--accent-text)] flex items-center gap-2 font-bold">
                <span>ENTER BUSINESS PORTAL</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--muted-color)]">
                <span>Buying</span>
                <span>·</span>
                <span>Selling</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Individual */}
        <div
          onClick={handleOpenIndividual}
          className="border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col justify-between hover:border-[var(--accent-red)] transition-all cursor-pointer group overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenIndividual()}
        >
          {/* Card Image Header */}
          <div className="h-40 sm:h-44 w-full relative overflow-hidden border-b border-[var(--border-color)]">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
              alt="Certified Sports Coaches and Practitioners"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-bg)] via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 border border-white/20 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                <User className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono-label text-white/90 bg-black/70 backdrop-blur-xs border border-white/20 px-2 py-0.5">
                PRACTITIONERS & TALENT
              </span>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>AFC / UEFA / ITF ACCREDITED</span>
              <span className="text-emerald-400 font-bold">Audited Licenses</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading text-[var(--heading-color)] font-bold mb-2">
                Individual
              </h2>
              <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                Coaches, specialists, researchers and media. Build a verified profile and find opportunities.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-xs font-mono-label text-[var(--heading-color)] group-hover:text-[var(--accent-text)] flex items-center gap-2 font-bold">
                <span>ENTER INDIVIDUAL PORTAL</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--muted-color)]">
                <span>Profile</span>
                <span>·</span>
                <span>Vacancies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Academic */}
        <div
          onClick={handleOpenAcademic}
          className="border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col justify-between hover:border-[var(--accent-red)] transition-all cursor-pointer group overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenAcademic()}
        >
          {/* Card Image Header */}
          <div className="h-40 sm:h-44 w-full relative overflow-hidden border-b border-[var(--border-color)]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="Sports Science and Biomechanics Laboratory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-bg)] via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 border border-white/20 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4 text-purple-400" />
              </div>
              <StatusChip status="Planned" />
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>RESEARCH & BIOMECHANICS</span>
              <span className="text-purple-300">Cohort Studies</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading text-[var(--heading-color)] font-bold mb-2">
                Academic
              </h2>
              <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                Universities, research centers and labs. Intended for research testing and cohort collaborations.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-xs font-mono-label text-[var(--muted-color)] group-hover:text-[var(--text-primary)] flex items-center gap-2 font-bold">
                <span>VIEW PLANNED PORTAL</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[10px] font-mono text-[var(--muted-color)]">
                Research & Labs
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Athlete or parent */}
        <div
          onClick={handleOpenAthlete}
          className="border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col justify-between hover:border-[var(--accent-red)] transition-all cursor-pointer group overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenAthlete()}
        >
          {/* Card Image Header */}
          <div className="h-40 sm:h-44 w-full relative overflow-hidden border-b border-[var(--border-color)]">
            <img
              src="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80"
              alt="Youth Athletics and Private Coaching"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-bg)] via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 border border-white/20 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <span className="px-2 py-0.5 border border-amber-500/60 text-amber-300 bg-black/70 backdrop-blur-xs font-mono-label text-[10px]">
                Preview. Opens after provider registration.
              </span>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
              <span>SAFESPORT CHILD PROTECTION</span>
              <span className="text-blue-300 font-bold">100% ID Verified</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading text-[var(--heading-color)] font-bold mb-2">
                Athlete or parent
              </h2>
              <p className="text-sm text-[var(--muted-color)] leading-relaxed">
                Find verified coaches, specialists, gyms and clubs with certified background checks and safeguarding.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-xs font-mono-label text-[var(--heading-color)] group-hover:text-[var(--accent-text)] flex items-center gap-2 font-bold">
                <span>ENTER ATHLETE OR PARENT PORTAL</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--muted-color)]">
                <span>Discover</span>
                <span>·</span>
                <span>Book</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Platform Pillars & Graphics */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div>
            <span className="text-[10px] font-mono-label text-[var(--muted-color)]">STANDARDS & GOVERNANCE</span>
            <h3 className="text-lg font-heading text-[var(--heading-color)] font-bold">
              The Three Core Pillars of Athlete Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--muted-color)] hidden sm:inline">
            Qatar Sports Ecosystem Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1 */}
          <div className="border border-[var(--border-color)] bg-[var(--panel-bg)] p-4 flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden border border-[var(--border-color)] mb-3 relative">
                <img
                  src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80"
                  alt="FIFA Quality Pro Synthetic Turf"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 border border-white/20 text-[9px] font-mono text-emerald-400">
                  CR-VERIFIED
                </div>
              </div>
              <h4 className="font-heading text-sm font-bold text-[var(--heading-color)] mb-1">
                Civil Infrastructure & Surfaces
              </h4>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                FIFA Quality Pro artificial turf, World Aquatics 10-lane competition tanks, and FIBA sprung wooden courts tendered directly to verified suppliers.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-color)]">
              <span>ISO 9001:2015</span>
              <span className="text-emerald-500 font-bold">Warranty Audited</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="border border-[var(--border-color)] bg-[var(--panel-bg)] p-4 flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden border border-[var(--border-color)] mb-3 relative">
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80"
                  alt="Licensed Coaching Personnel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 border border-white/20 text-[9px] font-mono text-emerald-400">
                  QFA & UEFA AUDITED
                </div>
              </div>
              <h4 className="font-heading text-sm font-bold text-[var(--heading-color)] mb-1">
                Accredited Coaching Licenses
              </h4>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                Direct validation with AFC, UEFA, ITF, and World Aquatics governing bodies. Every coach carries SafeSport child protection certification.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-color)]">
              <span>SafeSport Level 2</span>
              <span className="text-emerald-500 font-bold">Police Clearance Active</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="border border-[var(--border-color)] bg-[var(--panel-bg)] p-4 flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden border border-[var(--border-color)] mb-3 relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                  alt="Sports Science and Analytics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 border border-white/20 text-[9px] font-mono text-purple-400">
                  PLANNED
                </div>
              </div>
              <h4 className="font-heading text-sm font-bold text-[var(--heading-color)] mb-1">
                Sports Science & Lab Cohorts
              </h4>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                Collaborative testing sandbox connecting universities, biomechanics labs, and sports academies for athlete physiology and performance trials.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-color)]">
              <span>Biomechanics</span>
              <span className="text-purple-400">Research Gateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* Informational banner */}
      <div className="mt-8 p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] text-xs text-[var(--muted-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 inline-block shrink-0" />
          <span>All profiles, licenses and background checks are verified by accredited sports governing bodies.</span>
        </div>
        <span className="text-[var(--heading-color)] shrink-0">Sample registry data for preview.</span>
      </div>
    </div>
  );
};
