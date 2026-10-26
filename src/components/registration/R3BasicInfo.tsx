import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { COUNTRIES, NATIONALITIES, GENDERS } from '../../data/registrationTaxonomy.ts';
import { getString } from '../../data/registrationStrings.ts';
import { Shield, Info, Check } from 'lucide-react';

interface R3Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R3BasicInfo: React.FC<R3Props> = ({ errors, onClearError }) => {
  const { registrationDraft, updateRegistrationDraft } = useApp();
  const isProfessional = registrationDraft.listingType === 'Sports Professional';

  const [countrySearch, setCountrySearch] = useState('');
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredNationalities = NATIONALITIES.filter((n) =>
    n.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r3.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r3.subtitle')}
        </p>
      </div>

      {/* Privacy Notice Box */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-start gap-3">
        <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-[var(--heading-color)] block">
            Verified Demographic Controls
          </span>
          <p className="text-[var(--muted-color)] leading-relaxed">
            {getString('reg.r3.privacyNote')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {isProfessional ? (
          <>
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r3.firstName')} *
                </label>
                <input
                  type="text"
                  value={registrationDraft.firstName}
                  onChange={(e) => {
                    updateRegistrationDraft({ firstName: e.target.value });
                    onClearError('firstName');
                  }}
                  placeholder={getString('reg.r3.firstNamePlaceholder')}
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {errors.firstName && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r3.lastName')} *
                </label>
                <input
                  type="text"
                  value={registrationDraft.lastName}
                  onChange={(e) => {
                    updateRegistrationDraft({ lastName: e.target.value });
                    onClearError('lastName');
                  }}
                  placeholder={getString('reg.r3.lastNamePlaceholder')}
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {errors.lastName && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Country & Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Country */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono-label text-[var(--heading-color)] font-bold">
                    {getString('reg.r3.country')} *
                  </label>
                  <span className="text-[10px] font-mono text-[var(--muted-color)] border border-[var(--border-color)] px-1.5 py-0.5 bg-[var(--inset-bg)]">
                    {getString('reg.r3.optionalPublicBadge')}
                  </span>
                </div>
                <input
                  type="text"
                  value={registrationDraft.country}
                  onFocus={() => setShowCountryDropdown(true)}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    updateRegistrationDraft({ country: e.target.value });
                    onClearError('country');
                    setShowCountryDropdown(true);
                  }}
                  placeholder="Type to search country..."
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {showCountryDropdown && (
                  <div className="absolute top-full start-0 end-0 z-30 max-h-48 overflow-y-auto border border-[var(--border-color)] bg-[var(--panel-bg)] shadow-none mt-1">
                    {filteredCountries.slice(0, 15).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          updateRegistrationDraft({ country: c });
                          setShowCountryDropdown(false);
                          onClearError('country');
                        }}
                        className="w-full text-start p-2.5 text-xs hover:bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[var(--text-primary)] cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
                {errors.country && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Nationality */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono-label text-[var(--heading-color)] font-bold">
                    {getString('reg.r3.nationality')} *
                  </label>
                  <span className="text-[10px] font-mono text-[var(--muted-color)] border border-[var(--border-color)] px-1.5 py-0.5 bg-[var(--inset-bg)]">
                    {getString('reg.r3.optionalPublicBadge')}
                  </span>
                </div>
                <input
                  type="text"
                  value={registrationDraft.nationality}
                  onFocus={() => setShowNationalityDropdown(true)}
                  onChange={(e) => {
                    setNationalitySearch(e.target.value);
                    updateRegistrationDraft({ nationality: e.target.value });
                    onClearError('nationality');
                    setShowNationalityDropdown(true);
                  }}
                  placeholder="Type to search nationality..."
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {showNationalityDropdown && (
                  <div className="absolute top-full start-0 end-0 z-30 max-h-48 overflow-y-auto border border-[var(--border-color)] bg-[var(--panel-bg)] shadow-none mt-1">
                    {filteredNationalities.slice(0, 15).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          updateRegistrationDraft({ nationality: n });
                          setShowNationalityDropdown(false);
                          onClearError('nationality');
                        }}
                        className="w-full text-start p-2.5 text-xs hover:bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[var(--text-primary)] cursor-pointer"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
                {errors.nationality && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono-label text-[var(--heading-color)] font-bold">
                  {getString('reg.r3.gender')} (Optional)
                </label>
                <span className="text-[10px] font-mono text-[var(--muted-color)] border border-[var(--border-color)] px-1.5 py-0.5 bg-[var(--inset-bg)]">
                  {getString('reg.r3.optionalPublicBadge')}
                </span>
              </div>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateRegistrationDraft({ gender: g })}
                    className={`btn-action text-xs min-h-[44px] px-4 flex-1 justify-center ${
                      registrationDraft.gender === g
                        ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                        : 'text-[var(--muted-color)]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r3.bio')} *
              </label>
              <textarea
                rows={4}
                value={registrationDraft.bio}
                onChange={(e) => {
                  updateRegistrationDraft({ bio: e.target.value });
                  onClearError('bio');
                }}
                placeholder={getString('reg.r3.bioPlaceholder')}
                className="input-field w-full text-xs p-3 leading-relaxed"
              />
              {errors.bio && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.bio}
                </p>
              )}
            </div>

            {/* Privacy Checkbox */}
            <label className="flex items-center gap-2.5 pt-2 cursor-pointer text-xs text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={registrationDraft.hideDemographicsOnPublicProfile}
                onChange={(e) =>
                  updateRegistrationDraft({
                    hideDemographicsOnPublicProfile: e.target.checked
                  })
                }
                className="w-4 h-4 rounded-none accent-[var(--accent-red)]"
              />
              <span>{getString('reg.r3.hideDemographicsCheckbox')}</span>
            </label>
          </>
        ) : (
          <>
            {/* Corporation Title */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r3.corpTitle')} *
              </label>
              <input
                type="text"
                value={registrationDraft.corporationTitle}
                onChange={(e) => {
                  updateRegistrationDraft({ corporationTitle: e.target.value });
                  onClearError('corporationTitle');
                }}
                placeholder={getString('reg.r3.corpTitlePlaceholder')}
                className="input-field w-full min-h-[44px] text-xs"
              />
              {errors.corporationTitle && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.corporationTitle}
                </p>
              )}
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r3.tagline')} *
              </label>
              <input
                type="text"
                value={registrationDraft.tagline}
                onChange={(e) => {
                  updateRegistrationDraft({ tagline: e.target.value });
                  onClearError('tagline');
                }}
                placeholder={getString('reg.r3.taglinePlaceholder')}
                className="input-field w-full min-h-[44px] text-xs"
              />
              {errors.tagline && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.tagline}
                </p>
              )}
            </div>

            {/* Country & Registered City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r3.country')} *
                </label>
                <input
                  type="text"
                  value={registrationDraft.country}
                  onFocus={() => setShowCountryDropdown(true)}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    updateRegistrationDraft({ country: e.target.value });
                    onClearError('country');
                    setShowCountryDropdown(true);
                  }}
                  placeholder="Search country..."
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {showCountryDropdown && (
                  <div className="absolute top-full start-0 end-0 z-30 max-h-48 overflow-y-auto border border-[var(--border-color)] bg-[var(--panel-bg)] shadow-none mt-1">
                    {filteredCountries.slice(0, 15).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          updateRegistrationDraft({ country: c });
                          setShowCountryDropdown(false);
                          onClearError('country');
                        }}
                        className="w-full text-start p-2.5 text-xs hover:bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[var(--text-primary)] cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
                {errors.country && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.country}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                  {getString('reg.r3.registeredCity')} *
                </label>
                <input
                  type="text"
                  value={registrationDraft.registeredCity}
                  onChange={(e) => {
                    updateRegistrationDraft({ registeredCity: e.target.value });
                    onClearError('registeredCity');
                  }}
                  placeholder={getString('reg.r3.registeredCityPlaceholder')}
                  className="input-field w-full min-h-[44px] text-xs"
                />
                {errors.registeredCity && (
                  <p className="text-[11px] font-mono text-amber-500 mt-1">
                    {errors.registeredCity}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
                {getString('reg.r3.corpDescription')} *
              </label>
              <textarea
                rows={4}
                value={registrationDraft.description}
                onChange={(e) => {
                  updateRegistrationDraft({ description: e.target.value });
                  onClearError('description');
                }}
                placeholder={getString('reg.r3.corpDescriptionPlaceholder')}
                className="input-field w-full text-xs p-3 leading-relaxed"
              />
              {errors.description && (
                <p className="text-[11px] font-mono text-amber-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
