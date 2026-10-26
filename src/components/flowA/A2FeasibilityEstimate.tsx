import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, ThermometerSun, Zap, Wind, Users, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const A2FeasibilityEstimate: React.FC = () => {
  const { facilityBrief, setFlowStep } = useApp();
  const [activeTab, setActiveTab] = useState<'build' | 'staffing' | 'specs'>('build');

  // Multiplier based on tier
  const tierMultiplier = facilityBrief.qualityTier === 'Elite' ? 1.35 : facilityBrief.qualityTier === 'Premium' ? 1.15 : 1.0;

  // Build Cost Lines
  const buildCostItems = [
    {
      category: 'Surfacing & Civil Works',
      item: 'FIFA Quality Pro Artificial Turf Pitch (50mm + Shock Pad + Organic Infill)',
      qty: `${facilityBrief.pitches5aSide} pitch`,
      lowQar: Math.round(780000 * facilityBrief.pitches5aSide * tierMultiplier),
      highQar: Math.round(920000 * facilityBrief.pitches5aSide * tierMultiplier),
      heatMitigation: 'Heat-limiting infill reduces surface temperature by up to 15°C'
    },
    {
      category: 'Aquatics Engineering',
      item: 'Olympic Pool (50m, 10-Lane) with High-Capacity Active Chilling System',
      qty: `${facilityBrief.olympicPools} pool`,
      lowQar: Math.round(3800000 * facilityBrief.olympicPools * tierMultiplier),
      highQar: Math.round(4600000 * facilityBrief.olympicPools * tierMultiplier),
      heatMitigation: 'Industrial heat-exchange chillers maintain FINA 25°C-28°C standards'
    },
    {
      category: 'Aquatics Engineering',
      item: 'Youth 25m Training Pool Filtration & UV Water Treatment',
      qty: `${facilityBrief.smallerPools} pool`,
      lowQar: Math.round(1400000 * facilityBrief.smallerPools * tierMultiplier),
      highQar: Math.round(1800000 * facilityBrief.smallerPools * tierMultiplier),
      heatMitigation: 'Automated salinity balancing and rapid turnover filtration'
    },
    {
      category: 'Lighting Systems',
      item: 'High-Mast LED Floodlighting (750 Lux, Anti-Glare Optics, IP66 Dust/Moisture Rated)',
      qty: 'Turnkey',
      lowQar: Math.round(340000 * tierMultiplier),
      highQar: Math.round(480000 * tierMultiplier),
      heatMitigation: 'Passive heat sinks rated for continuous operation at 55°C ambient'
    },
    {
      category: 'Perimeter & Ball Catch',
      item: 'Heavy-Duty UV-Treated Polypropylene Perimeter Netting (6m Height, High Wind-Load)',
      qty: 'Perimeter',
      lowQar: Math.round(110000 * tierMultiplier),
      highQar: Math.round(160000 * tierMultiplier),
      heatMitigation: 'UV grade 8 protection resists thermal embrittlement and sun degradation'
    },
    {
      category: 'Spectator Amenities',
      item: 'Modular Grandstand Seating (500 Seats) with Cantilever Tensile Shade Fabric',
      qty: '500 seats',
      lowQar: Math.round(290000 * tierMultiplier),
      highQar: Math.round(380000 * tierMultiplier),
      heatMitigation: 'UV-inhibited polyolefin copolymer seats with 95% UV blockage canopy'
    }
  ];

  const totalBuildLow = buildCostItems.reduce((acc, curr) => acc + curr.lowQar, 0);
  const totalBuildHigh = buildCostItems.reduce((acc, curr) => acc + curr.highQar, 0);

  // Staffing Plan Lines
  const staffingItems = [
    { role: 'Facility Operations Director', count: 1, monthlyQar: 32000, annualTotalQar: 384000, req: '10+ yrs sports venue leadership' },
    { role: 'Head Sports Turf & Grounds Specialist', count: 1, monthlyQar: 18000, annualTotalQar: 216000, req: 'FIFA synthetic certification' },
    { role: 'Senior Aquatics Plant & HVAC Engineer', count: 2, monthlyQar: 16000, annualTotalQar: 384000, req: 'Pool chilling & filtration specialist' },
    { role: 'Certified Lifeguards (Dual Shift)', count: 4, monthlyQar: 7500, annualTotalQar: 360000, req: 'RLSS / Qatar Red Crescent certified' },
    { role: 'Duty Operations Supervisors', count: 2, monthlyQar: 9000, annualTotalQar: 216000, req: 'Facility access & safeguarding' }
  ];

  const totalStaffingAnnual = staffingItems.reduce((acc, curr) => acc + curr.annualTotalQar, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>FLOW A</span>
            <span>/</span>
            <span>B2B FACILITY PLANNING</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">A2 FEASIBILITY ESTIMATE</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Feasibility Estimate & Technical Specifications
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Engineered cost modeling calibrated for Doha climatic parameters and federation quality benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Illustrative estimate, not a quotation" />
          <StatusChip status="Sample" />
        </div>
      </div>

      {/* High-Level Financial KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-1">
          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">INDICATIVE BUILD CAPEX RANGE</span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--heading-color)] tabular-nums">
            QAR {totalBuildLow.toLocaleString()} – {totalBuildHigh.toLocaleString()}
          </div>
          <span className="text-[11px] text-[var(--muted-color)] block">Turnkey engineering, civil base & installation (Sample)</span>
        </div>

        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-1">
          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">ANNUAL OPERATIONAL STAFFING</span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-500 tabular-nums">
            QAR {totalStaffingAnnual.toLocaleString()} / year
          </div>
          <span className="text-[11px] text-[var(--muted-color)] block">10 Technical FTEs based on Doha market compensation (Sample)</span>
        </div>

        <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-1">
          <span className="text-[10px] font-mono-label text-[var(--muted-color)]">SELECTED TIER & ENVIRONMENT</span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--accent-text)]">
            {facilityBrief.qualityTier.toUpperCase()} · DOHA HEAT
          </div>
          <span className="text-[11px] text-[var(--muted-color)] block">UV-stabilised + Active pool chilling protocols active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border border-[var(--border-color)] bg-[var(--panel-bg)]">
        <div className="flex border-b border-[var(--border-color)] bg-[var(--inset-bg)]">
          <button
            type="button"
            onClick={() => setActiveTab('build')}
            className={`px-5 py-3 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
              activeTab === 'build'
                ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>01. BUILD COST RANGES (QAR)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('staffing')}
            className={`px-5 py-3 text-xs font-mono-label cursor-pointer transition-colors border-r border-[var(--border-color)] flex items-center gap-2 ${
              activeTab === 'staffing'
                ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>02. STAFFING & OPEX PLAN</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-3 text-xs font-mono-label cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'specs'
                ? 'bg-[var(--panel-bg)] text-[var(--heading-color)] border-b-2 border-b-[var(--accent-red)] font-bold'
                : 'text-[var(--muted-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            <ThermometerSun className="w-3.5 h-3.5" />
            <span>03. DOHA-HEAT SPECIFICATIONS</span>
          </button>
        </div>

        {/* Tab 1: Build Cost */}
        {activeTab === 'build' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-[var(--muted-color)]">
              <span>All figures are indicative estimates calculated for Doha, Qatar construction conditions.</span>
              <span className="font-mono text-[11px]">CURRENCY: QAR (SAMPLE)</span>
            </div>

            <div className="overflow-x-auto border border-[var(--border-color)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[10px] font-mono-label text-[var(--muted-color)]">
                    <th className="p-3">SCOPE ITEM & DESCRIPTION</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">QTY / EXTENT</th>
                    <th className="p-3 text-right">LOW ESTIMATE (QAR)</th>
                    <th className="p-3 text-right">HIGH ESTIMATE (QAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {buildCostItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[var(--inset-bg)] transition-colors">
                      <td className="p-3">
                        <div className="font-semibold text-[var(--heading-color)]">{item.item}</div>
                        <div className="text-[11px] text-[var(--muted-color)] flex items-center gap-1 mt-0.5">
                          <ThermometerSun className="w-3 h-3 text-[var(--accent-red)] shrink-0" />
                          <span>{item.heatMitigation}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[var(--muted-color)]">{item.category}</td>
                      <td className="p-3 font-mono text-[11px] text-[var(--text-primary)]">{item.qty}</td>
                      <td className="p-3 text-right font-mono font-bold text-[var(--heading-color)] tabular-nums">
                        {item.lowQar.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[var(--heading-color)] tabular-nums">
                        {item.highQar.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[var(--inset-bg)] font-bold border-t-2 border-[var(--border-color)]">
                    <td className="p-3 text-xs font-mono-label" colSpan={3}>
                      TOTAL INDICATIVE BUILD RANGE (SAMPLE)
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-[var(--accent-text)] tabular-nums">
                      QAR {totalBuildLow.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-[var(--accent-text)] tabular-nums">
                      QAR {totalBuildHigh.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Assumptions Panel */}
            <div className="p-4 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-2">
              <span className="font-mono-label text-[10px] text-[var(--muted-color)] block">
                ENGINEERING ASSUMPTIONS & PARAMETERS
              </span>
              <ul className="text-xs text-[var(--muted-color)] space-y-1 list-disc list-inside">
                <li>Civil laser grading assumes standard geotechnical load-bearing capacity without deep piling.</li>
                <li>Grid power connection: 415V 3-phase connection assumed within 200m of plot boundary.</li>
                <li>Importation tariffs and clearance via Hamad Port accounted under Standard GCC customs rules.</li>
                <li>Execution schedule: 16–22 weeks from tender award to federation sign-off.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Staffing Plan */}
        {activeTab === 'staffing' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-[var(--muted-color)]">
              <span>Operational headcount recommended for peak-load sports and aquatics facility compliance.</span>
              <span className="font-mono text-[11px]">10 POSITIONS TOTAL</span>
            </div>

            <div className="overflow-x-auto border border-[var(--border-color)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--inset-bg)] border-b border-[var(--border-color)] text-[10px] font-mono-label text-[var(--muted-color)]">
                    <th className="p-3">KEY TECHNICAL ROLE</th>
                    <th className="p-3">HEADCOUNT</th>
                    <th className="p-3">MANDATORY CREDENTIALS</th>
                    <th className="p-3 text-right">MONTHLY / HEAD (QAR)</th>
                    <th className="p-3 text-right">ANNUAL TOTAL (QAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {staffingItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[var(--inset-bg)] transition-colors">
                      <td className="p-3 font-semibold text-[var(--heading-color)]">{item.role}</td>
                      <td className="p-3 font-mono text-[11px] text-[var(--text-primary)]">{item.count} FTE</td>
                      <td className="p-3 text-[11px] text-[var(--muted-color)]">{item.req}</td>
                      <td className="p-3 text-right font-mono text-[var(--text-primary)] tabular-nums">
                        {item.monthlyQar.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-500 tabular-nums">
                        {item.annualTotalQar.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[var(--inset-bg)] font-bold border-t-2 border-[var(--border-color)]">
                    <td className="p-3 text-xs font-mono-label" colSpan={4}>
                      ANNUAL TECHNICAL OPEX (SAMPLE)
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-emerald-500 tabular-nums">
                      QAR {totalStaffingAnnual.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Doha-Heat Specifications */}
        {activeTab === 'specs' && (
          <div className="p-5 space-y-4">
            <div className="border border-[var(--border-color)] p-4 bg-[var(--inset-bg)]">
              <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--accent-text)] mb-1">
                <ThermometerSun className="w-4 h-4" />
                <span>STATE OF QATAR CLIMATIC DURABILITY CODES</span>
              </div>
              <p className="text-xs text-[var(--muted-color)] leading-relaxed">
                Outdoor sporting infrastructure in Doha requires specialized polymers, heat-limiting infill, and active water chilling to endure summer surface temperatures exceeding 60°C and relentless ultraviolet exposure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Turf */}
              <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Artificial Turf & Infill
                  </h4>
                  <StatusChip status="FIFA Pro" size="sm" />
                </div>
                <ul className="text-xs text-[var(--muted-color)] space-y-1.5">
                  <li>• <strong className="text-[var(--text-primary)]">Polymer:</strong> UV-stabilised virgin polyethylene monofilament (8,000+ hours UV accelerated test).</li>
                  <li>• <strong className="text-[var(--text-primary)]">Infill:</strong> Coated organic/TPE heat-limiting infill engineered to lower surface temperatures by 12–15°C compared to standard SBR rubber crumb.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Underlayment:</strong> Closed-cell cross-linked polyethylene shock pad with horizontal drainage channels.</li>
                </ul>
              </div>

              {/* Pool Chilling */}
              <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Aquatics Chilling & UV Plant
                  </h4>
                  <StatusChip status="FINA Code" size="sm" />
                </div>
                <ul className="text-xs text-[var(--muted-color)] space-y-1.5">
                  <li>• <strong className="text-[var(--text-primary)]">Chiller Capacity:</strong> Titanium coaxial heat-exchange chillers calibrated to extract 280 kW thermal load during peak 49°C midday.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Filtration:</strong> Multi-layer high-rate sand filtration with regenerative ozone & medium-pressure UV sanitization.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Water Balance:</strong> Automated temperature regulation fixed at 26.5°C ± 0.5°C.</li>
                </ul>
              </div>

              {/* Lighting */}
              <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Floodlighting (IP66 Dust/Marine)
                  </h4>
                  <StatusChip status="750 Lux" size="sm" />
                </div>
                <ul className="text-xs text-[var(--muted-color)] space-y-1.5">
                  <li>• <strong className="text-[var(--text-primary)]">Enclosure:</strong> Marine-grade die-cast aluminium with anti-corrosion powder coating.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Thermal Management:</strong> Heavy convective fins rated for continuous lumen maintenance at 55°C ambient.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Optical Cut-Off:</strong> Anti-glare asymmetric distribution minimizing light spill.</li>
                </ul>
              </div>

              {/* Nets & Seating */}
              <div className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm text-[var(--heading-color)] flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-blue-400" />
                    Perimeter Nets & Shaded Seating
                  </h4>
                  <StatusChip status="UV Tier 8" size="sm" />
                </div>
                <ul className="text-xs text-[var(--muted-color)] space-y-1.5">
                  <li>• <strong className="text-[var(--text-primary)]">Ball Catch Nets:</strong> High-tenacity braided knotless polypropylene treated with carbon UV stabilizers.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Wind Load:</strong> Designed for Doha Shamal winds up to 120 km/h with quick-release safety points.</li>
                  <li>• <strong className="text-[var(--text-primary)]">Grandstand:</strong> Heavy-gauge galvanized steel frame with HDPE architectural shade membrane.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-[var(--border-color)] bg-[var(--panel-bg)]">
        <button
          type="button"
          onClick={() => setFlowStep('A1')}
          className="btn-action w-full sm:w-auto gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>EDIT FACILITY BRIEF</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFlowStep('A3')}
            className="btn-primary w-full sm:w-auto gap-2 py-2.5 px-6"
          >
            <span>PROCEED TO TENDER PACKAGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
