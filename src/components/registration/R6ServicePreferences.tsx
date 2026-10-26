import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { SERVICE_PREFERENCES } from '../../data/registrationTaxonomy.ts';
import { getString } from '../../data/registrationStrings.ts';
import { Plus, Trash2, Languages, Users, Layers } from 'lucide-react';

interface R6Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R6ServicePreferences: React.FC<R6Props> = () => {
  const { registrationDraft, updateRegistrationDraft } = useApp();

  const [newLangName, setNewLangName] = useState('');
  const [newProficiency, setNewProficiency] = useState<'Basic' | 'Conversational' | 'Fluent' | 'Native'>('Fluent');

  const toggleSkillLevel = (level: string) => {
    const exists = registrationDraft.athleteSkillLevels.includes(level);
    const updated = exists
      ? registrationDraft.athleteSkillLevels.filter((l) => l !== level)
      : [...registrationDraft.athleteSkillLevels, level];
    updateRegistrationDraft({ athleteSkillLevels: updated });
  };

  const toggleAgeGroup = (age: string) => {
    const exists = registrationDraft.ageGroups.includes(age);
    const updated = exists
      ? registrationDraft.ageGroups.filter((a) => a !== age)
      : [...registrationDraft.ageGroups, age];
    updateRegistrationDraft({ ageGroups: updated });
  };

  const toggleDeliveryFormat = (format: string) => {
    const exists = registrationDraft.deliveryFormats.includes(format);
    const updated = exists
      ? registrationDraft.deliveryFormats.filter((f) => f !== format)
      : [...registrationDraft.deliveryFormats, format];
    updateRegistrationDraft({ deliveryFormats: updated });
  };

  const handleAddLanguage = () => {
    if (!newLangName.trim()) return;
    const newEntry = {
      id: `lang-${Date.now()}`,
      language: newLangName.trim(),
      proficiency: newProficiency
    };
    updateRegistrationDraft({
      languages: [...registrationDraft.languages, newEntry]
    });
    setNewLangName('');
  };

  const handleRemoveLanguage = (id: string) => {
    updateRegistrationDraft({
      languages: registrationDraft.languages.filter((l) => l.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r6.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r6.subtitle')}
        </p>
      </div>

      <div className="space-y-5">
        {/* Athlete Skill Levels Multi-select */}
        <div>
          <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-2 font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            <span>{getString('reg.r6.athleteSkillLevel')}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_PREFERENCES.athleteSkillLevel.map((lvl) => {
              const isSelected = registrationDraft.athleteSkillLevels.includes(lvl);
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => toggleSkillLevel(lvl)}
                  className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                      : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)] bg-[var(--panel-bg)]'
                  }`}
                >
                  {isSelected ? '✓ ' : ''}{lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Age Groups Multi-select */}
        <div>
          <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-2 font-bold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            <span>{getString('reg.r6.ageGroups')}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_PREFERENCES.ageGroups.map((age) => {
              const isSelected = registrationDraft.ageGroups.includes(age);
              return (
                <button
                  key={age}
                  type="button"
                  onClick={() => toggleAgeGroup(age)}
                  className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                      : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)] bg-[var(--panel-bg)]'
                  }`}
                >
                  {isSelected ? '✓ ' : ''}{age}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender Served Radio */}
        <div>
          <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-2 font-bold">
            {getString('reg.r6.genderServed')}
          </label>
          <div className="flex gap-2">
            {SERVICE_PREFERENCES.servicesOfferedToGender.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateRegistrationDraft({ genderServed: g })}
                className={`btn-action text-xs min-h-[44px] px-4 flex-1 justify-center ${
                  registrationDraft.genderServed === g
                    ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                    : 'text-[var(--muted-color)]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Formats */}
        <div>
          <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-2 font-bold">
            {getString('reg.r6.deliveryFormats')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SERVICE_PREFERENCES.deliveryFormats.map((df) => {
              const isSelected = registrationDraft.deliveryFormats.includes(df);
              return (
                <button
                  key={df}
                  type="button"
                  onClick={() => toggleDeliveryFormat(df)}
                  className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer text-start transition-colors ${
                    isSelected
                      ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                      : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)] bg-[var(--panel-bg)]'
                  }`}
                >
                  {isSelected ? '✓ ' : ''}{df}
                </button>
              );
            })}
          </div>
        </div>

        {/* Languages Repeatable List */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
          <label className="block text-xs font-mono-label text-[var(--heading-color)] font-bold flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[var(--accent-red)]" />
            <span>{getString('reg.r6.languages')}</span>
          </label>

          {/* Existing languages */}
          {registrationDraft.languages.length > 0 && (
            <div className="space-y-2">
              {registrationDraft.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="p-3 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--heading-color)]">{lang.language}</span>
                    <span className="text-[10px] font-mono text-[var(--muted-color)] border border-[var(--border-color)] px-1.5 py-0.5 bg-[var(--panel-bg)]">
                      {lang.proficiency}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(lang.id)}
                    className="text-[var(--muted-color)] hover:text-[var(--accent-red)] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add language row */}
          <div className="p-3 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={newLangName}
              onChange={(e) => setNewLangName(e.target.value)}
              placeholder="e.g. Arabic, English, French..."
              className="input-field text-xs min-h-[44px] flex-1"
            />
            <select
              value={newProficiency}
              onChange={(e) => setNewProficiency(e.target.value as any)}
              className="input-field text-xs min-h-[44px] sm:w-44"
            >
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Conversational">Conversational</option>
              <option value="Basic">Basic</option>
            </select>
            <button
              type="button"
              onClick={handleAddLanguage}
              disabled={!newLangName.trim()}
              className="btn-action text-xs min-h-[44px] px-4 gap-1.5 justify-center disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{getString('reg.r6.addLanguage')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
