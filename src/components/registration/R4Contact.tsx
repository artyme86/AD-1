import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { SOCIAL_PLATFORMS, SERVING_REGIONS } from '../../data/registrationTaxonomy.ts';
import { getString } from '../../data/registrationStrings.ts';
import { Plus, Trash2, Globe, Link2, MapPin } from 'lucide-react';

interface R4Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R4Contact: React.FC<R4Props> = ({ errors, onClearError }) => {
  const { registrationDraft, updateRegistrationDraft } = useApp();

  const [newPlatform, setNewPlatform] = useState<string>('LinkedIn');
  const [newUrl, setNewUrl] = useState<string>('');

  const handleAddSocialLink = () => {
    if (!newUrl.trim()) return;
    const newEntry = {
      id: `soc-${Date.now()}`,
      platform: newPlatform,
      url: newUrl.trim()
    };
    updateRegistrationDraft({
      socialLinks: [...registrationDraft.socialLinks, newEntry]
    });
    setNewUrl('');
  };

  const handleRemoveSocialLink = (id: string) => {
    updateRegistrationDraft({
      socialLinks: registrationDraft.socialLinks.filter((s) => s.id !== id)
    });
  };

  const toggleRegion = (region: string) => {
    const exists = registrationDraft.locationServingAreas.includes(region);
    const updated = exists
      ? registrationDraft.locationServingAreas.filter((r) => r !== region)
      : [...registrationDraft.locationServingAreas, region];
    updateRegistrationDraft({ locationServingAreas: updated });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r4.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r4.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
              {getString('reg.r4.email')} *
            </label>
            <input
              type="email"
              value={registrationDraft.email}
              onChange={(e) => {
                updateRegistrationDraft({ email: e.target.value });
                onClearError('email');
              }}
              placeholder={getString('reg.r4.emailPlaceholder')}
              className="input-field w-full min-h-[44px] text-xs"
            />
            {errors.email && (
              <p className="text-[11px] font-mono text-amber-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
              {getString('reg.r4.phone')} *
            </label>
            <input
              type="tel"
              value={registrationDraft.phone}
              onChange={(e) => {
                const val = e.target.value;
                updateRegistrationDraft({
                  phone: val,
                  ...(registrationDraft.whatsappSameAsPhone ? { whatsapp: val } : {})
                });
                onClearError('phone');
              }}
              placeholder={getString('reg.r4.phonePlaceholder')}
              className="input-field w-full min-h-[44px] text-xs"
            />
            {errors.phone && (
              <p className="text-[11px] font-mono text-amber-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* WhatsApp & Same as phone checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
              {getString('reg.r4.whatsapp')} (Optional)
            </label>
            <input
              type="tel"
              value={registrationDraft.whatsapp}
              disabled={registrationDraft.whatsappSameAsPhone}
              onChange={(e) => updateRegistrationDraft({ whatsapp: e.target.value })}
              placeholder={getString('reg.r4.whatsappPlaceholder')}
              className="input-field w-full min-h-[44px] text-xs disabled:opacity-60"
            />
            <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-[var(--muted-color)]">
              <input
                type="checkbox"
                checked={registrationDraft.whatsappSameAsPhone}
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateRegistrationDraft({
                    whatsappSameAsPhone: checked,
                    whatsapp: checked ? registrationDraft.phone : ''
                  });
                }}
                className="w-4 h-4 rounded-none accent-[var(--accent-red)]"
              />
              <span>{getString('reg.r4.whatsappSame')}</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1.5 font-bold">
              {getString('reg.r4.website')} (Optional)
            </label>
            <input
              type="url"
              value={registrationDraft.website}
              onChange={(e) => updateRegistrationDraft({ website: e.target.value })}
              placeholder={getString('reg.r4.websitePlaceholder')}
              className="input-field w-full min-h-[44px] text-xs"
            />
          </div>
        </div>

        {/* Location & Serving Area Chips */}
        <div>
          <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-2 font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            <span>{getString('reg.r4.locationServingAreas')}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVING_REGIONS.map((region) => {
              const isSelected = registrationDraft.locationServingAreas.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                      : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)] bg-[var(--panel-bg)]'
                  }`}
                >
                  {isSelected ? '✓ ' : ''}{region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social Links Repeatable List */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
          <label className="block text-xs font-mono-label text-[var(--heading-color)] font-bold flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            <span>{getString('reg.r4.socialLinks')}</span>
          </label>

          {/* Existing social links */}
          {registrationDraft.socialLinks.length > 0 && (
            <div className="space-y-2">
              {registrationDraft.socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-mono px-2 py-0.5 border border-[var(--border-color)] bg-[var(--panel-bg)] font-bold text-[10px]">
                      {link.platform}
                    </span>
                    <span className="truncate text-[var(--muted-color)]">{link.url}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialLink(link.id)}
                    className="text-[var(--muted-color)] hover:text-[var(--accent-red)] p-1 cursor-pointer"
                    title="Remove social link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add social link inputs */}
          <div className="p-3 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="input-field text-xs min-h-[44px] sm:w-44"
            >
              {SOCIAL_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="input-field text-xs min-h-[44px] flex-1"
            />
            <button
              type="button"
              onClick={handleAddSocialLink}
              disabled={!newUrl.trim()}
              className="btn-action text-xs min-h-[44px] px-4 gap-1.5 justify-center disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{getString('reg.r4.addSocial')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
