import React, { useState } from 'react';
import { PlusCircle, Eye, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const B4PostVacancy: React.FC = () => {
  const { publishVacancy, setFlowStep } = useApp();

  const [formData, setFormData] = useState({
    title: 'Lead Youth Football Coach (U10 – U12)',
    sport: 'Football',
    ageGroup: '10–12',
    contractType: 'Full-time',
    startDate: '01 Sep 2026',
    location: 'Doha, Qatar',
    minLicense: "AFC/UEFA 'B' License",
    minExperienceYears: 3,
    languages: 'Arabic, English',
    club: 'Al Rayyan SC Youth Section (Sample)',
    salarySample: 'QAR 24,000 - 30,000 / month (Sample)',
    requirements: [
      "AFC/UEFA 'B' or federation-recognized equivalent",
      'Pediatric CPR and child safeguarding clearance',
      'Demonstrated 3+ years managing youth match squads'
    ],
    responsibilities: [
      'Design periodized technical microcycles for developmental age squads',
      'Oversee weekly league competitions and match analysis'
    ],
    benefits: 'Full club coaching kit, accommodation allowance, private healthcare and federation education sponsorship.'
  });

  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      publishVacancy({
        club: formData.club,
        title: formData.title,
        sport: formData.sport,
        ageGroup: formData.ageGroup,
        contractType: formData.contractType,
        location: formData.location,
        startDate: formData.startDate,
        minLicense: formData.minLicense,
        minExperienceYears: Number(formData.minExperienceYears) || 3,
        languages: formData.languages.split(',').map((s) => s.trim()),
        salarySample: formData.salarySample,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        benefits: formData.benefits
      });
      setIsPublishing(false);
      setFlowStep('B5');
    }, 550);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW B</span>
            <span>/</span>
            <span>CLUB CLIENT PERSPECTIVE</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B4 POST VACANCY</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Publish Academy Coaching Vacancy
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Define mandatory federation standards, age bracket, and compensation to match verified coaches in the registry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Client View" />
          <button
            onClick={() => setFlowStep('B5')}
            className="btn-action text-xs"
          >
            VIEW CANDIDATE SHORTLIST (B5)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-base text-[var(--heading-color)]">
                Vacancy Parameters & Qualifications
              </h3>
              <p className="text-xs text-[var(--muted-color)]">
                Forms the criteria used by the registry matching engine (License, Age Group, Experience, Location).
              </p>
            </div>

            {/* Role Title */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                ROLE TITLE *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] font-semibold"
              />
            </div>

            {/* Club Name */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                CLUB / ACADEMY NAME *
              </label>
              <input
                type="text"
                required
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
              />
            </div>

            {/* Sport & Age Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  SPORT *
                </label>
                <select
                  value={formData.sport}
                  onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                >
                  <option value="Football">Football</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Athletics">Athletics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  AGE GROUP (TARGET BRACKET) *
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                >
                  <option value="7–9">Ages 7–9 (Grassroots Foundations)</option>
                  <option value="10–12">Ages 10–12 (Skill Development)</option>
                  <option value="7–12">Ages 7–12 (Broad Youth Cohort)</option>
                </select>
              </div>
            </div>

            {/* Contract Type & Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  CONTRACT TYPE *
                </label>
                <select
                  value={formData.contractType}
                  onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                >
                  <option value="Full-time">Full-time Contract</option>
                  <option value="Part-time">Part-time (Afternoon / Weekends)</option>
                  <option value="Seasonal">Seasonal Development Camp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  TARGET START DATE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
            </div>

            {/* Minimum License Level & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  MINIMUM LICENSE LEVEL *
                </label>
                <select
                  value={formData.minLicense}
                  onChange={(e) => setFormData({ ...formData, minLicense: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                >
                  <option value="AFC/UEFA 'B' License">AFC/UEFA 'B' License</option>
                  <option value="AFC/UEFA 'C' License">AFC/UEFA 'C' License</option>
                  <option value="Grassroots Diploma">National Grassroots Diploma</option>
                  <option value="UEFA 'A' Youth">UEFA 'A' Youth Specialist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  MINIMUM EXPERIENCE (YEARS) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={formData.minExperienceYears}
                  onChange={(e) => setFormData({ ...formData, minExperienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
            </div>

            {/* Languages & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  LANGUAGES REQUIRED
                </label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  LOCATION (FACILITY GROUNDS)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-[var(--border-color)] flex justify-end">
              <button
                type="submit"
                disabled={isPublishing}
                className="btn-primary text-xs py-3 px-6 gap-2"
              >
                {isPublishing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                    <span>PUBLISHING VACANCY...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>PUBLISH VACANCY TO REGISTRY</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono-label text-[var(--muted-color)] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                LIVE CANDIDATE FEED PREVIEW
              </span>
              <StatusChip status="Instant Sync" size="sm" />
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-[var(--accent-text)] block">{formData.club}</span>
                <h3 className="font-heading text-lg text-[var(--heading-color)]">{formData.title}</h3>
                <span className="text-xs text-[var(--muted-color)]">{formData.location} · {formData.contractType}</span>
              </div>

              <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-color)]">Target Group:</span>
                  <span className="font-bold text-[var(--heading-color)]">Ages {formData.ageGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-color)]">Required License:</span>
                  <span className="font-bold text-emerald-500">{formData.minLicense}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-color)]">Minimum Experience:</span>
                  <span className="font-mono text-[var(--heading-color)]">{formData.minExperienceYears}+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-color)]">Languages:</span>
                  <span className="text-[var(--heading-color)]">{formData.languages}</span>
                </div>
              </div>

              <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 text-xs text-[var(--muted-color)] space-y-1">
                <span className="font-mono-label block text-[10px] text-emerald-500">
                  REGISTRY MATCHER ALERTS
                </span>
                <p className="text-[11px] leading-relaxed">
                  Upon publishing, 2 verified coaches in Doha matching the {formData.minLicense} requirement will receive notification to apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
