import React, { useState } from 'react';
import { ShieldCheck, Award, Briefcase, Globe, Calendar, CheckCircle2, Clock, Edit3, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { VerifiedBadge } from '../shared/VerifiedBadge.tsx';

export const B1CoachProfile: React.FC = () => {
  const { coaches, updateCoachProfile, setFlowStep } = useApp();
  const coach = coaches[0]; // Primary Coach A (Tariq Mansour)

  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(coach.headline);
  const [bio, setBio] = useState(coach.bio);
  const [availability, setAvailability] = useState(coach.availability);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoachProfile(coach.id, {
      headline,
      bio,
      availability
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW B</span>
            <span>/</span>
            <span>COACH PERSPECTIVE</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">B1 COACH PROFILE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Verified Coach Professional Profile
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Your credentials and coaching background as presented to accredited clubs and youth academy directors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Provider View" />
          <button
            onClick={() => setFlowStep('B2')}
            className="btn-primary text-xs py-2 px-3 gap-1.5"
          >
            <span>VIEW CLUB OPPORTUNITIES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Profile Completeness Bar */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[var(--muted-color)]">PROFILE COMPLETENESS</span>
            <span className="font-mono font-bold text-emerald-500">{coach.profileCompleteness}%</span>
          </div>
          <span className="text-[11px] text-[var(--muted-color)]">
            Federation check: Verified by Qatar Football Association
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--inset-bg)] border border-[var(--border-color)]">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${coach.profileCompleteness}%` }}
          />
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Photo Placeholder, Bio & Identity (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            {/* Photo Placeholder */}
            <div className="aspect-square bg-[var(--inset-bg)] border border-[var(--border-color)] flex flex-col items-center justify-center p-6 text-center space-y-2 relative">
              <div className="w-20 h-20 bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center font-heading text-2xl font-bold text-[var(--accent-text)]">
                TM
              </div>
              <div>
                <span className="text-xs font-mono text-[var(--muted-color)] block">PHOTO VERIFIED</span>
                <span className="text-[10px] text-[var(--muted-color)]">Biometric ID Match</span>
              </div>
              <div className="absolute top-3 right-3">
                <VerifiedBadge name={coach.name} details={coach.verificationDetails} />
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-1">
              <h2 className="font-heading text-xl text-[var(--heading-color)]">
                {coach.name}
              </h2>
              <p className="text-xs text-[var(--accent-text)] font-medium">
                {coach.headline}
              </p>
              <div className="text-xs text-[var(--muted-color)] pt-1">
                {coach.location}
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="space-y-2 text-xs border-t border-[var(--border-color)] pt-3">
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Target Age Groups</span>
                <span className="font-mono font-bold text-[var(--heading-color)]">Ages 7–9, 10–12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Primary Sport</span>
                <span className="font-semibold text-[var(--heading-color)]">{coach.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Languages</span>
                <span className="text-[var(--heading-color)]">{coach.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-color)]">Private Rate</span>
                <span className="font-mono text-emerald-500 font-bold">from QAR {coach.pricePerSessionQar} (Sample)</span>
              </div>
            </div>

            {/* Edit Profile Toggle */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="btn-action w-full text-xs justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'CLOSE EDITOR' : 'EDIT PROFILE DETAILS'}</span>
            </button>
          </div>

          {/* Preferred Roles */}
          <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
            <span className="text-xs font-mono-label text-[var(--muted-color)] block">
              PREFERRED CLUB ROLES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {coach.preferredRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs border border-[var(--border-color)] bg-[var(--inset-bg)] text-[var(--text-primary)]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Licenses, Experience, Availability (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Edit Form if toggled */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="p-5 border border-[var(--accent-red)] bg-[var(--panel-bg)] space-y-3">
              <div className="text-xs font-mono-label text-[var(--accent-text)] font-bold">
                EDIT PROFILE COPY
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  PROFESSIONAL HEADLINE
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  COACHING PHILOSOPHY & SUMMARY
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  WEEKLY AVAILABILITY WINDOW
                </label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-action text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  SAVE PROFILE CHANGES
                </button>
              </div>
            </form>
          )}

          {/* Bio Box */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
            <h3 className="font-heading text-sm text-[var(--heading-color)]">
              Coaching Philosophy & Overview
            </h3>
            <p className="text-xs text-[var(--muted-color)] leading-relaxed">
              {coach.bio}
            </p>
          </div>

          {/* Licenses & Certificates List with Status */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                Accredited Coaching Licenses & Safeguarding Credentials
              </h3>
              <span className="text-[10px] font-mono text-[var(--muted-color)]">
                Federation Registry Verified
              </span>
            </div>

            <div className="space-y-2">
              {coach.licenses.map((lic, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">{lic.title}</div>
                    <div className="text-[11px] text-[var(--muted-color)]">
                      Issued by {lic.issuer} · Class of {lic.year}
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono-label border ${
                        lic.status === 'Verified'
                          ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
                          : 'border-amber-500/40 text-amber-500 bg-amber-500/10'
                      }`}
                    >
                      {lic.status === 'Verified' ? '✓ VERIFIED' : 'PENDING AUDIT'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[var(--accent-red)]" />
                Club Coaching Experience Timeline
              </h3>
              <StatusChip status="Sample" size="sm" />
            </div>

            <div className="space-y-4">
              {coach.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-5 border-l-2 border-[var(--border-color)] space-y-1">
                  <div className="w-2.5 h-2.5 bg-[var(--accent-red)] absolute -left-[6px] top-1" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[var(--heading-color)]">{exp.role}</span>
                    <span className="font-mono text-[11px] text-[var(--muted-color)]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[var(--accent-text)]">{exp.organization}</div>
                  <p className="text-xs text-[var(--muted-color)] leading-relaxed pt-0.5">
                    {exp.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Block */}
          <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="text-xs font-mono-label text-[var(--muted-color)] block">WEEKLY AVAILABILITY</span>
                <span className="text-xs font-semibold text-[var(--heading-color)]">{coach.availability}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFlowStep('B2')}
              className="btn-action text-xs"
            >
              BROWSE VACANCIES (B2)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
