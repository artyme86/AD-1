import React from 'react';
import { Check, Activity, HeartPulse, Video, Briefcase, Building, Layers, Trophy, ShoppingBag, Wrench } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { PROFESSIONAL_TYPES, CORPORATION_TYPES, ProfessionalType, CorporationType } from '../../data/registrationTaxonomy.ts';
import { getString } from '../../data/registrationStrings.ts';

interface R2Props {
  error?: string;
}

export const R2TypeSelect: React.FC<R2Props> = ({ error }) => {
  const { registrationDraft, updateRegistrationDraft } = useApp();
  const isProfessional = registrationDraft.listingType === 'Sports Professional';

  const professionalTypeIcons: Record<string, React.ReactNode> = {
    'Coaching-Training': <Activity className="w-5 h-5 text-emerald-500" />,
    'Athletic Health Specialists': <HeartPulse className="w-5 h-5 text-rose-500" />,
    'Sports Media Specialists': <Video className="w-5 h-5 text-blue-500" />,
    'Sports Management': <Briefcase className="w-5 h-5 text-amber-500" />
  };

  const professionalTypeDescriptions: Record<string, string> = {
    'Coaching-Training': 'Athletic coaches, performance analysts, sport scientists, biomechanists, and conditioning trainers.',
    'Athletic Health Specialists': 'Physical therapists, sports nutritionists, psychologists, orthopedic doctors, and chiropractors.',
    'Sports Media Specialists': 'Broadcasters, sports journalists, photographers, digital media producers, and data analysts.',
    'Sports Management': 'Athletic directors, sports agents, event managers, facility operators, and sports marketers.'
  };

  const corporationTypeIcons: Record<string, React.ReactNode> = {
    'Athletic Health Services': <HeartPulse className="w-5 h-5 text-rose-500" />,
    'Sports Facilities': <Building className="w-5 h-5 text-blue-500" />,
    'Sports organizations': <Trophy className="w-5 h-5 text-amber-500" />,
    'Sports Apparel and Equipment': <ShoppingBag className="w-5 h-5 text-emerald-500" />,
    'Sports-related Services': <Wrench className="w-5 h-5 text-purple-500" />
  };

  const corporationTypeDescriptions: Record<string, string> = {
    'Athletic Health Services': 'Clinics, injury rehabilitation centers, sports psychology practices, and nutrition labs.',
    'Sports Facilities': 'Stadiums, arenas, indoor/outdoor courts, training gyms, and multi-sport complexes.',
    'Sports organizations': 'Leagues, national governing bodies, federations, and major tournament organizers.',
    'Sports Apparel and Equipment': 'Manufacturers, apparel brands, footwear, protective gear, and sports technology vendors.',
    'Sports-related Services': 'Event operations, sports marketing, broadcasting houses, data intelligence, and consultancy.'
  };

  const handleSelectProfessionalType = (type: ProfessionalType) => {
    updateRegistrationDraft({
      professionalType: type,
      position: '' // Reset position when changing type
    });
  };

  const handleSelectCorporationType = (type: CorporationType) => {
    updateRegistrationDraft({
      corporationType: type,
      primaryCategory: '',
      secondaryCategory: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {isProfessional
            ? getString('reg.r2.titleProfessional')
            : getString('reg.r2.titleCorporation')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {isProfessional
            ? getString('reg.r2.subtitleProfessional')
            : getString('reg.r2.subtitleCorporation')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {isProfessional ? (
          PROFESSIONAL_TYPES.map((type) => {
            const isSelected = registrationDraft.professionalType === type;
            return (
              <div
                key={type}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectProfessionalType(type)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectProfessionalType(type)}
                className={`border p-5 cursor-pointer transition-all flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] ring-1 ring-[var(--accent-red)]'
                    : 'border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center">
                        {professionalTypeIcons[type]}
                      </div>
                      <h3 className="font-heading text-base font-bold text-[var(--heading-color)]">
                        {type}
                      </h3>
                    </div>

                    <div
                      className={`w-5 h-5 border flex items-center justify-center ${
                        isSelected
                          ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                          : 'border-[var(--border-color)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                    {professionalTypeDescriptions[type]}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          CORPORATION_TYPES.map((type) => {
            const isSelected = registrationDraft.corporationType === type;
            return (
              <div
                key={type}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectCorporationType(type)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectCorporationType(type)}
                className={`border p-5 cursor-pointer transition-all flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] ring-1 ring-[var(--accent-red)]'
                    : 'border-[var(--border-color)] bg-[var(--panel-bg)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center">
                        {corporationTypeIcons[type]}
                      </div>
                      <h3 className="font-heading text-base font-bold text-[var(--heading-color)]">
                        {type}
                      </h3>
                    </div>

                    <div
                      className={`w-5 h-5 border flex items-center justify-center ${
                        isSelected
                          ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                          : 'border-[var(--border-color)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                    {corporationTypeDescriptions[type]}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && (
        <div className="p-3 border border-amber-500/50 bg-amber-500/10 text-xs font-mono text-amber-500 flex items-center gap-2">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
