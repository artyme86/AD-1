import React, { useState } from 'react';
import { Building, MapPin, Layers, Users, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';
import { FACILITY_ASSETS } from '../../data/sampleData.ts';

export const A1FacilityBrief: React.FC = () => {
  const { facilityBrief, updateFacilityBrief, setFlowStep } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ownerTypes: ('Club' | 'Academy' | 'Developer' | 'Hotel or resort')[] = [
    'Club',
    'Academy',
    'Developer',
    'Hotel or resort'
  ];

  const qualityTiers: { id: 'Standard' | 'Premium' | 'Elite'; label: string; desc: string }[] = [
    { id: 'Standard', label: 'Standard', desc: 'Regional sports league compliance' },
    { id: 'Premium', label: 'Premium', desc: 'FIFA Quality & GCC heat mitigation' },
    { id: 'Elite', label: 'Elite', desc: 'Olympic & international broadcast standard' }
  ];

  const handleGenerateEstimate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFlowStep('A2');
    }, 450);
  };

  // Live calculations for summary
  const totalFacilities =
    facilityBrief.pitches5aSide +
    facilityBrief.olympicPools +
    facilityBrief.smallerPools +
    facilityBrief.indoorHalls;

  const estimatedFootprintSqm =
    facilityBrief.pitches5aSide * 950 +
    facilityBrief.olympicPools * 2200 +
    facilityBrief.smallerPools * 750 +
    facilityBrief.indoorHalls * 1600;

  return (
    <div className="space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>BUSINESS PORTAL</span>
            <span>/</span>
            <span>PLAN A FACILITY</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A1 BRIEF</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Sports Facility Feasibility Brief
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Define facility scope, technical specifications, and location conditions to compute illustrative build and staffing estimates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Illustrative estimate, not a quotation" />
        </div>
      </div>

      {/* Main Grid: Form Left, Live Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Owner Type */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-3">
            <label className="block text-xs font-mono-label text-[var(--muted-color)]">
              01. OWNER / DEVELOPER TYPE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ownerTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateFacilityBrief({ ownerType: type })}
                  className={`btn-action text-xs text-center justify-center py-2.5 ${
                    facilityBrief.ownerType === type
                      ? 'border-[var(--accent-red)] text-[var(--heading-color)] bg-[var(--inset-bg)] font-bold'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Facility Components Steppers */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
              <label className="block text-xs font-mono-label text-[var(--muted-color)]">
                02. FACILITY COMPONENTS & QUANTITIES
              </label>
              <span className="text-[11px] font-mono text-[var(--muted-color)]">
                {totalFacilities} units selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 5-a-side pitch */}
              <div className="p-3.5 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={FACILITY_ASSETS.pitches5aSide.imageUrl}
                    alt="5-a-side pitch"
                    className="w-12 h-12 object-cover border border-[var(--border-color)] shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">5-a-side Pitches</div>
                    <div className="text-[11px] text-[var(--muted-color)]">Artificial turf & netting</div>
                  </div>
                </div>
                <div className="flex items-center border border-[var(--border-color)] bg-[var(--panel-bg)] shrink-0">
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ pitches5aSide: Math.max(0, facilityBrief.pitches5aSide - 1) })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Decrease 5-a-side pitch count"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold">{facilityBrief.pitches5aSide}</span>
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ pitches5aSide: facilityBrief.pitches5aSide + 1 })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Increase 5-a-side pitch count"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Olympic Pool */}
              <div className="p-3.5 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={FACILITY_ASSETS.olympicPools.imageUrl}
                    alt="Olympic Pool"
                    className="w-12 h-12 object-cover border border-[var(--border-color)] shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">Olympic Pool (50m)</div>
                    <div className="text-[11px] text-[var(--muted-color)]">10 competition lanes</div>
                  </div>
                </div>
                <div className="flex items-center border border-[var(--border-color)] bg-[var(--panel-bg)] shrink-0">
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ olympicPools: Math.max(0, facilityBrief.olympicPools - 1) })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Decrease Olympic pool count"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold">{facilityBrief.olympicPools}</span>
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ olympicPools: facilityBrief.olympicPools + 1 })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Increase Olympic pool count"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Smaller Pool */}
              <div className="p-3.5 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={FACILITY_ASSETS.smallerPools.imageUrl}
                    alt="Training Pool"
                    className="w-12 h-12 object-cover border border-[var(--border-color)] shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">Training Pool (25m)</div>
                    <div className="text-[11px] text-[var(--muted-color)]">Warm-up & youth swimming</div>
                  </div>
                </div>
                <div className="flex items-center border border-[var(--border-color)] bg-[var(--panel-bg)] shrink-0">
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ smallerPools: Math.max(0, facilityBrief.smallerPools - 1) })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Decrease training pool count"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold">{facilityBrief.smallerPools}</span>
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ smallerPools: facilityBrief.smallerPools + 1 })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Increase training pool count"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Indoor Hall */}
              <div className="p-3.5 border border-[var(--border-color)] bg-[var(--inset-bg)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={FACILITY_ASSETS.indoorHalls.imageUrl}
                    alt="Indoor Multi-Sport Hall"
                    className="w-12 h-12 object-cover border border-[var(--border-color)] shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[var(--heading-color)]">Indoor Multi-Sport Hall</div>
                    <div className="text-[11px] text-[var(--muted-color)]">Basketball, handball, futsal</div>
                  </div>
                </div>
                <div className="flex items-center border border-[var(--border-color)] bg-[var(--panel-bg)] shrink-0">
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ indoorHalls: Math.max(0, facilityBrief.indoorHalls - 1) })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Decrease indoor hall count"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold">{facilityBrief.indoorHalls}</span>
                  <button
                    type="button"
                    onClick={() => updateFacilityBrief({ indoorHalls: facilityBrief.indoorHalls + 1 })}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--inset-bg)] text-[var(--text-primary)] font-mono"
                    aria-label="Increase indoor hall count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Quality Tier */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                  03. PROJECT LOCATION
                </label>
                <input
                  type="text"
                  value={facilityBrief.location}
                  onChange={(e) => updateFacilityBrief({ location: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] font-medium"
                />
                <span className="block text-[11px] text-[var(--muted-color)] mt-1">
                  Applies Doha extreme summer heat conditions and high UV index.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  04. QUALITY & CERTIFICATION TIER
                </label>
                <div className="space-y-1.5">
                  {qualityTiers.map((tier) => (
                    <label
                      key={tier.id}
                      className={`flex items-start gap-2.5 p-2 border cursor-pointer transition-colors ${
                        facilityBrief.qualityTier === tier.id
                          ? 'border-[var(--accent-red)] bg-[var(--inset-bg)]'
                          : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="qualityTier"
                        checked={facilityBrief.qualityTier === tier.id}
                        onChange={() => updateFacilityBrief({ qualityTier: tier.id })}
                        className="mt-0.5 accent-[var(--accent-red)]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[var(--heading-color)]">{tier.label}</div>
                        <div className="text-[10px] text-[var(--muted-color)]">{tier.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Staffing Plan Checkbox */}
            <div className="pt-3 border-t border-[var(--border-color)]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={facilityBrief.includeStaffingPlan}
                  onChange={(e) => updateFacilityBrief({ includeStaffingPlan: e.target.checked })}
                  className="w-4 h-4 mt-0.5 accent-[var(--accent-red)]"
                />
                <div>
                  <span className="text-xs font-bold text-[var(--heading-color)] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[var(--muted-color)]" />
                    Include Technical Staffing & Operational Headcount Plan
                  </span>
                  <span className="block text-[11px] text-[var(--muted-color)] mt-0.5">
                    Generates recommended technical roles (Head Groundskeeper, Aquatics Plant Technicians, Lifeguards, Operations Lead) with QAR market compensation bands.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Live Summary Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-2">
                <Building className="w-4 h-4 text-[var(--accent-red)]" />
                Live Scope Summary
              </h3>
              <StatusChip status="Sample" size="sm" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Owner Entity</span>
                <span className="font-bold text-[var(--heading-color)]">{facilityBrief.ownerType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Location</span>
                <span className="font-mono text-[var(--heading-color)]">{facilityBrief.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Specification Tier</span>
                <span className="font-bold text-[var(--accent-text)]">{facilityBrief.qualityTier}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Total Facilities</span>
                <span className="font-mono text-[var(--heading-color)] tabular-nums">{totalFacilities} zones</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Est. Plot Footprint</span>
                <span className="font-mono text-[var(--heading-color)] tabular-nums">{estimatedFootprintSqm.toLocaleString()} m²</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Staffing Computation</span>
                <span className="font-mono text-[var(--heading-color)]">
                  {facilityBrief.includeStaffingPlan ? 'Included (7 Roles)' : 'Excluded'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono-label text-[var(--muted-color)]">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                CLIMATIC HEAT INCLUSIONS
              </div>
              <p className="text-[11px] text-[var(--muted-color)] leading-relaxed">
                Brief automatically incorporates UV-stabilised artificial turf infill, active pool heat-exchange chillers, and IP66 marine-grade floodlighting.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerateEstimate}
              disabled={isSubmitting || totalFacilities === 0}
              className="btn-primary w-full justify-center gap-2 text-xs py-3"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                  <span>COMPUTING RANGES...</span>
                </>
              ) : (
                <>
                  <span>GENERATE FEASIBILITY ESTIMATE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[var(--muted-color)]">
              Transitions to full Capex, Opex and engineering breakdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
