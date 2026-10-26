import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  POSITIONS_BY_PROFESSIONAL_TYPE,
  SPORTS,
  FACILITY_TYPES,
  ORGANIZATION_TYPES,
  APPAREL_AND_EQUIPMENT,
  SPORTS_RELATED_SERVICES,
  ATHLETIC_HEALTH_SERVICES,
  ProfessionalType
} from '../../data/registrationTaxonomy.ts';
import { getString } from '../../data/registrationStrings.ts';
import { FileText, Upload, Plus, X, Tag } from 'lucide-react';

interface R5Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R5YourService: React.FC<R5Props> = ({ errors, onClearError }) => {
  const { registrationDraft, updateRegistrationDraft } = useApp();
  const isProfessional = registrationDraft.listingType === 'Sports Professional';

  // Sport search filter
  const [sportSearch, setSportSearch] = useState('');
  const [showSportDropdown, setShowSportDropdown] = useState(false);

  // Service tool tag input
  const [newTool, setNewTool] = useState('');

  const filteredSports = SPORTS.filter((s) =>
    s.toLowerCase().includes(sportSearch.toLowerCase())
  );

  // Professional positions derived strictly from R2 selection
  const profType = (registrationDraft.professionalType as ProfessionalType) || 'Coaching-Training';
  const availablePositions = POSITIONS_BY_PROFESSIONAL_TYPE[profType] || POSITIONS_BY_PROFESSIONAL_TYPE['Coaching-Training'];

  // Corporation taxonomy lookup
  const corpType = registrationDraft.corporationType;

  // Determine first dropdown options
  let primaryOptions: string[] = [];
  let secondaryOptions: string[] = [];

  if (corpType === 'Sports Facilities') {
    primaryOptions = Object.keys(FACILITY_TYPES.options);
    if (registrationDraft.primaryCategory && FACILITY_TYPES.options[registrationDraft.primaryCategory]) {
      secondaryOptions = FACILITY_TYPES.options[registrationDraft.primaryCategory];
    }
  } else if (corpType === 'Sports organizations') {
    primaryOptions = Object.keys(ORGANIZATION_TYPES.options);
    if (registrationDraft.primaryCategory && ORGANIZATION_TYPES.options[registrationDraft.primaryCategory]) {
      secondaryOptions = ORGANIZATION_TYPES.options[registrationDraft.primaryCategory];
    }
  } else if (corpType === 'Sports Apparel and Equipment') {
    primaryOptions = Object.keys(APPAREL_AND_EQUIPMENT.options);
    if (registrationDraft.primaryCategory && APPAREL_AND_EQUIPMENT.options[registrationDraft.primaryCategory]) {
      secondaryOptions = APPAREL_AND_EQUIPMENT.options[registrationDraft.primaryCategory];
    }
  } else if (corpType === 'Sports-related Services') {
    primaryOptions = Object.keys(SPORTS_RELATED_SERVICES.options);
    if (registrationDraft.primaryCategory && SPORTS_RELATED_SERVICES.options[registrationDraft.primaryCategory]) {
      secondaryOptions = SPORTS_RELATED_SERVICES.options[registrationDraft.primaryCategory];
    }
  } else if (corpType === 'Athletic Health Services') {
    primaryOptions = ATHLETIC_HEALTH_SERVICES;
  }

  const handleAddTool = () => {
    if (!newTool.trim()) return;
    if (!registrationDraft.serviceTools.includes(newTool.trim())) {
      updateRegistrationDraft({
        serviceTools: [...registrationDraft.serviceTools, newTool.trim()]
      });
    }
    setNewTool('');
  };

  const handleRemoveTool = (tool: string) => {
    updateRegistrationDraft({
      serviceTools: registrationDraft.serviceTools.filter((t) => t !== tool)
    });
  };

  const handleAttachSampleCv = () => {
    const sampleFileName = `${registrationDraft.firstName || 'Candidate'}_${registrationDraft.lastName || 'Profile'}_Dossier.pdf`;
    updateRegistrationDraft({ cvFileName: sampleFileName });
    onClearError('cvFileName');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r5.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r5.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {isProfessional ? (
          <>
            {/* Position Select (Filtered by R2 Type) */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r5.position')} ({profType}) *
              </label>
              <select
                value={registrationDraft.position}
                onChange={(e) => {
                  updateRegistrationDraft({ position: e.target.value });
                  onClearError('position');
                }}
                className="input-field w-full min-h-[44px] text-xs"
              >
                <option value="">-- Choose Position --</option>
                {availablePositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.position}
                </p>
              )}
            </div>

            {/* Sport Searchable Select */}
            <div className="relative">
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r5.sport')} *
              </label>
              <input
                type="text"
                value={registrationDraft.sport}
                onFocus={() => setShowSportDropdown(true)}
                onChange={(e) => {
                  setSportSearch(e.target.value);
                  updateRegistrationDraft({ sport: e.target.value });
                  onClearError('sport');
                  setShowSportDropdown(true);
                }}
                placeholder="Type to filter sports..."
                className="input-field w-full min-h-[44px] text-xs"
              />
              {showSportDropdown && (
                <div className="absolute top-full start-0 end-0 z-30 max-h-48 overflow-y-auto border border-[var(--border-color)] bg-[var(--panel-bg)] shadow-none mt-1">
                  {filteredSports.slice(0, 20).map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => {
                        updateRegistrationDraft({ sport });
                        setShowSportDropdown(false);
                        onClearError('sport');
                      }}
                      className="w-full text-start p-2.5 text-xs hover:bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[var(--text-primary)] cursor-pointer"
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              )}
              {errors.sport && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.sport}
                </p>
              )}
            </div>

            {/* Specialty Free Text */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r5.specialty')}
              </label>
              <input
                type="text"
                value={registrationDraft.specialty}
                onChange={(e) => updateRegistrationDraft({ specialty: e.target.value })}
                placeholder={getString('reg.r5.specialtyPlaceholder')}
                className="input-field w-full min-h-[44px] text-xs"
              />
            </div>

            {/* CV / Dossier Upload (Sample only) */}
            <div className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-3">
              <label className="block text-xs font-mono-label text-[var(--heading-color)] font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent-red)]" />
                <span>{getString('reg.r5.cvUpload')}</span>
              </label>

              {registrationDraft.cvFileName ? (
                <div className="p-3 border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-between text-xs font-mono text-[var(--heading-color)]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>{registrationDraft.cvFileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateRegistrationDraft({ cvFileName: '' })}
                    className="text-[var(--muted-color)] hover:text-[var(--accent-red)] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-[var(--muted-color)]">
                    Attach a CV or accredited dossier document for compliance auditing.
                  </span>
                  <button
                    type="button"
                    onClick={handleAttachSampleCv}
                    className="btn-action text-xs min-h-[44px] px-4 gap-2 whitespace-nowrap"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{getString('reg.r5.uploadSampleBtn')}</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Corporation Cascading Selects */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {corpType}: Primary Classification *
              </label>
              <select
                value={registrationDraft.primaryCategory}
                onChange={(e) => {
                  updateRegistrationDraft({
                    primaryCategory: e.target.value,
                    secondaryCategory: '',
                    customCategory: ''
                  });
                  onClearError('primaryCategory');
                }}
                className="input-field w-full min-h-[44px] text-xs"
              >
                <option value="">-- Choose Category --</option>
                {primaryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.primaryCategory && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.primaryCategory}
                </p>
              )}
            </div>

            {/* Secondary Select if applicable */}
            {secondaryOptions.length > 0 && (
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r5.discipline')} *
                </label>
                <select
                  value={registrationDraft.secondaryCategory}
                  onChange={(e) => {
                    updateRegistrationDraft({ secondaryCategory: e.target.value });
                    onClearError('secondaryCategory');
                  }}
                  className="input-field w-full min-h-[44px] text-xs"
                >
                  <option value="">-- Choose Specific Discipline / System --</option>
                  {secondaryOptions.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.secondaryCategory && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.secondaryCategory}
                  </p>
                )}
              </div>
            )}

            {/* Custom Category if "Other" selected */}
            {(registrationDraft.primaryCategory === 'Other' ||
              registrationDraft.secondaryCategory === 'Other') && (
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r5.customCategory')} *
                </label>
                <input
                  type="text"
                  value={registrationDraft.customCategory}
                  onChange={(e) => updateRegistrationDraft({ customCategory: e.target.value })}
                  placeholder="Specify custom facility or service..."
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            )}

            {/* Service Tools Free-text Tag Input */}
            <div className="pt-3 border-t border-[var(--border-color)] space-y-3">
              <label className="block text-xs font-mono-label text-[var(--heading-color)] font-bold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                <span>{getString('reg.r5.serviceTools')}</span>
              </label>

              {/* Tag chips */}
              {registrationDraft.serviceTools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {registrationDraft.serviceTools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[var(--border-color)] bg-[var(--inset-bg)] text-[var(--heading-color)]"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(tool)}
                        className="text-[var(--muted-color)] hover:text-[var(--accent-red)] cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Input for tag */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTool();
                    }
                  }}
                  placeholder={getString('reg.r5.serviceToolsPlaceholder')}
                  className="input-field flex-1 min-h-[44px] text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddTool}
                  disabled={!newTool.trim()}
                  className="btn-action min-h-[44px] text-xs px-4 gap-1 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TOOL</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
