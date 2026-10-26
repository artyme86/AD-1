import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { getString } from '../../data/registrationStrings.ts';
import { TermsModal } from './TermsModal.tsx';
import {
  ShieldCheck,
  User,
  Building2,
  CheckCircle2,
  Edit2,
  Image,
  Upload,
  Plus,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';

interface R8Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R8ReviewAndSubmit: React.FC<R8Props> = ({ errors, onClearError }) => {
  const { registrationDraft, updateRegistrationDraft, setRegistrationStep, submitRegistration } = useApp();
  const isProfessional = registrationDraft.listingType === 'Sports Professional';

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>('avatar-1');

  // Sample avatar badges / logos without external host dependence
  const sampleProfessionalAvatars = [
    { id: 'avatar-1', label: 'Badge Alpha (Initials)', initials: `${registrationDraft.firstName?.[0] || 'T'}${registrationDraft.lastName?.[0] || 'M'}` },
    { id: 'avatar-2', label: 'Badge Gold (Sports Specialist)', initials: 'SP' },
    { id: 'avatar-3', label: 'Badge Emerald (Accredited Coach)', initials: 'AC' }
  ];

  const sampleCorporateLogos = [
    { id: 'logo-1', label: 'Corporate Insignia', initials: `${registrationDraft.corporationTitle?.slice(0, 2).toUpperCase() || 'QA'}` },
    { id: 'logo-2', label: 'Facility Seal', initials: 'FS' },
    { id: 'logo-3', label: 'Enterprise Crest', initials: 'EC' }
  ];

  const handleSelectSampleAvatar = (id: string, initials: string) => {
    setSelectedAvatarId(id);
    updateRegistrationDraft({ profilePictureUrl: initials });
    onClearError('profilePictureUrl');
  };

  const handleAddSampleGallery = () => {
    const nextIdx = registrationDraft.galleryImages.length + 1;
    updateRegistrationDraft({
      galleryImages: [...registrationDraft.galleryImages, `Sample_Facility_Photo_${nextIdx}.jpg`]
    });
  };

  const handleRemoveGallery = (idx: number) => {
    updateRegistrationDraft({
      galleryImages: registrationDraft.galleryImages.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r8.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r8.subtitle')}
        </p>
      </div>

      {/* Profile Picture / Logo Section */}
      <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-mono-label text-[var(--heading-color)] font-bold">
              {getString('reg.r8.profileImage')}
            </label>
            <p className="text-xs text-[var(--muted-color)]">
              {getString('reg.r8.profileImageNotice')}
            </p>
          </div>
          {registrationDraft.profilePictureUrl && (
            <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Selected
            </span>
          )}
        </div>

        {/* Sample selector tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(isProfessional ? sampleProfessionalAvatars : sampleCorporateLogos).map((badge) => {
            const isSelected = selectedAvatarId === badge.id || registrationDraft.profilePictureUrl === badge.initials;
            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => handleSelectSampleAvatar(badge.id, badge.initials)}
                className={`border p-3 flex items-center gap-3 cursor-pointer text-start transition-all min-h-[44px] ${
                  isSelected
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] ring-1 ring-[var(--accent-red)]'
                    : 'border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="w-10 h-10 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-center font-heading font-bold text-sm text-[var(--accent-text)] shrink-0">
                  {badge.initials}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-[var(--heading-color)] truncate">
                    {badge.label}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--muted-color)]">
                    Official Insignia
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {errors.profilePictureUrl && (
          <p className="text-[11px] font-mono text-amber-500 mt-1">
            {errors.profilePictureUrl}
          </p>
        )}

        {/* Optional Gallery Images */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-label text-[var(--muted-color)]">
              {getString('reg.r8.gallery')}
            </span>
            <button
              type="button"
              onClick={handleAddSampleGallery}
              className="btn-action text-xs py-1.5 px-3 gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{getString('reg.r8.addSampleGalleryPhoto')}</span>
            </button>
          </div>

          {registrationDraft.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {registrationDraft.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="p-2 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between text-[11px] font-mono"
                >
                  <span className="truncate text-[var(--muted-color)]">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(i)}
                    className="text-[var(--muted-color)] hover:text-[var(--accent-red)] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[var(--muted-color)] italic">
              No gallery images attached. You can add action photos or facility pictures anytime later.
            </p>
          )}
        </div>
      </div>

      {/* Review Summary Grouped by Section */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-[var(--heading-color)]">
          {getString('reg.r8.reviewSummary')}
        </h3>

        {/* Section 1: Listing & Type */}
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-mono-label text-[var(--muted-color)]">01. LISTING & CLASSIFICATION</span>
            <button
              type="button"
              onClick={() => setRegistrationStep(1)}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[var(--muted-color)] block text-[10px] font-mono">LISTING TYPE</span>
              <span className="font-bold text-[var(--heading-color)]">{registrationDraft.listingType || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-[var(--muted-color)] block text-[10px] font-mono">CATEGORY / FIELD</span>
              <span className="font-bold text-[var(--heading-color)]">
                {isProfessional ? registrationDraft.professionalType : registrationDraft.corporationType || 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Basic Info */}
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-mono-label text-[var(--muted-color)]">02. BASIC INFORMATION</span>
            <button
              type="button"
              onClick={() => setRegistrationStep(3)}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          {isProfessional ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">NAME</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {registrationDraft.firstName} {registrationDraft.lastName}
                </span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">COUNTRY / NATIONALITY</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {registrationDraft.country} · {registrationDraft.nationality}
                </span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">GENDER</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {registrationDraft.gender || 'Not specified'}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="sm:col-span-2">
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">CORPORATION TITLE</span>
                <span className="font-bold text-[var(--heading-color)]">{registrationDraft.corporationTitle}</span>
                <span className="block text-[11px] text-[var(--muted-color)]">{registrationDraft.tagline}</span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">REGISTERED CITY</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {registrationDraft.registeredCity}, {registrationDraft.country}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Contact & Areas */}
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-mono-label text-[var(--muted-color)]">03. CONTACT & SERVING AREAS</span>
            <button
              type="button"
              onClick={() => setRegistrationStep(4)}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div>
              <span className="text-[var(--muted-color)] block text-[10px] font-mono">EMAIL</span>
              <span className="font-mono text-[var(--heading-color)]">{registrationDraft.email}</span>
            </div>
            <div>
              <span className="text-[var(--muted-color)] block text-[10px] font-mono">PHONE</span>
              <span className="font-mono text-[var(--heading-color)]">{registrationDraft.phone}</span>
            </div>
            <div>
              <span className="text-[var(--muted-color)] block text-[10px] font-mono">SERVING REGIONS</span>
              <span className="text-[var(--heading-color)] font-medium">
                {registrationDraft.locationServingAreas.join(', ') || 'Doha Central'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Service & Discipline */}
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-mono-label text-[var(--muted-color)]">04. SERVICE & METHOD</span>
            <button
              type="button"
              onClick={() => setRegistrationStep(5)}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          {isProfessional ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">POSITION</span>
                <span className="font-bold text-[var(--heading-color)]">{registrationDraft.position}</span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">SPORT</span>
                <span className="font-bold text-[var(--heading-color)]">{registrationDraft.sport}</span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">SPECIALTY</span>
                <span className="text-[var(--heading-color)]">{registrationDraft.specialty || 'Generalist'}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">FACILITY / SYSTEM CATEGORY</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {registrationDraft.primaryCategory}
                  {registrationDraft.secondaryCategory ? ` · ${registrationDraft.secondaryCategory}` : ''}
                </span>
              </div>
              <div>
                <span className="text-[var(--muted-color)] block text-[10px] font-mono">SERVICE TOOLS</span>
                <span className="text-[var(--heading-color)]">
                  {registrationDraft.serviceTools.join(', ') || 'Standard equipment'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Credentials & Experience */}
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
            <span className="font-mono-label text-[var(--muted-color)]">05. CREDENTIALS & AUDIT QUEUE</span>
            <button
              type="button"
              onClick={() => setRegistrationStep(7)}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="pt-1 space-y-1">
            <div className="text-[var(--heading-color)] font-medium">
              • {registrationDraft.certifications.length} Certification(s) / License(s) submitted
            </div>
            {isProfessional && (
              <>
                <div className="text-[var(--heading-color)] font-medium">
                  • {registrationDraft.degrees.length} Academic Degree(s) submitted
                </div>
                <div className="text-[var(--heading-color)] font-medium">
                  • {registrationDraft.workExperience.length} Career role(s) logged
                </div>
              </>
            )}
            <div className="text-[var(--heading-color)] font-medium">
              • {registrationDraft.awards.length} Award(s) and milestone(s) attached
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Terms & Conditions Checkbox */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-3">
        <label className="flex items-start gap-3 cursor-pointer text-xs text-[var(--heading-color)]">
          <input
            type="checkbox"
            checked={registrationDraft.agreeTerms}
            onChange={(e) => {
              updateRegistrationDraft({ agreeTerms: e.target.checked });
              onClearError('agreeTerms');
            }}
            className="w-5 h-5 rounded-none accent-[var(--accent-red)] shrink-0 mt-0.5 min-h-[20px]"
          />
          <span className="leading-relaxed">
            {getString('reg.r8.termsCheckbox')}{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsTermsModalOpen(true);
              }}
              className="text-[var(--accent-text)] underline font-bold hover:text-[var(--heading-color)] cursor-pointer ml-1 inline-block"
            >
              ({getString('reg.r8.viewTerms')})
            </button>
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-[11px] font-mono text-amber-500">
            {errors.agreeTerms}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={submitRegistration}
          disabled={!registrationDraft.agreeTerms}
          className="btn-primary w-full min-h-[48px] text-xs font-mono-label py-3 gap-2 justify-center disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{getString('reg.r8.submitButton')}</span>
        </button>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};
