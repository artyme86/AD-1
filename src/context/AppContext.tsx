/**
 * AppContext: Unified reactive state for Athlete Directory Prototype
 * Ensures cross-persona data sync (tenders sent in A3 appear in A4, vacancies posted in B4 appear in B2, session requests in C4 appear in C6).
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Supplier,
  Vacancy,
  Coach,
  SessionSlot,
  INITIAL_SUPPLIERS,
  INITIAL_VACANCIES,
  INITIAL_COACHES,
  INITIAL_SESSION_SLOTS
} from '../data/sampleData.ts';

export type Persona = 'Club' | 'Supplier' | 'Coach' | 'Parent';
export type RoleType = 'Client' | 'Provider';
export type FlowId = 'A' | 'B' | 'C';
export type ViewportMode = 'responsive' | 'mobile390';
export type PortalType = 'business' | 'individual' | 'academic' | 'athlete' | null;
export type BusinessMode = 'buying' | 'selling';

export interface FacilityBrief {
  ownerType: 'Club' | 'Academy' | 'Developer' | 'Hotel or resort';
  pitches5aSide: number;
  olympicPools: number;
  smallerPools: number;
  indoorHalls: number;
  location: string;
  qualityTier: 'Standard' | 'Premium' | 'Elite';
  includeStaffingPlan: boolean;
}

export interface SupplierRequestItem {
  id: string;
  title: string;
  category: string;
  facility: string;
  location: string;
  tier: string;
  deadlineDays: number;
  status: 'New' | 'Bid sent' | 'Declined';
  specs: string[];
  submittedBid?: {
    priceQar: number;
    product: string;
    deliveryWeeks: number;
    warrantyYears: number;
    notes: string;
  };
}

export interface TenderBid {
  id: string;
  requestId: string;
  supplierId: string;
  priceQar: number;
  product: string;
  deliveryWeeks: number;
  warrantyYears: number;
  notes: string;
  source: 'live' | 'simulated';
  submittedAt: string;
}

export interface CoachApplication {
  id: string;
  vacancyId: string;
  coachId: string;
  status: 'Applied' | 'Shortlisted' | 'Interview requested' | 'Offer (Planned)';
  note: string;
  appliedDate: string;
}

export interface SessionRequest {
  id: string;
  coachId: string;
  slotId: string;
  slotDay: string;
  slotTime: string;
  slotLocation: string;
  childFirstName: string;
  childAge: number;
  childLevel: string;
  goal: string;
  message: string;
  parentName: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'New time proposed';
  proposedNewTime?: string;
  createdAt: string;
}

interface AppContextType {
  // Portal & Mode
  portal: PortalType;
  setPortal: (portal: PortalType) => void;
  mode: BusinessMode;
  setMode: (mode: BusinessMode) => void;
  resetDemoData: () => void;

  // Theme & Layout
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  persona: Persona;
  setPersona: (persona: Persona) => void;
  role: RoleType;
  activeFlow: FlowId;
  setActiveFlow: (flow: FlowId) => void;
  flowStep: string;
  setFlowStep: (step: string) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;

  // Facility & Tender State
  facilityBrief: FacilityBrief;
  updateFacilityBrief: (updates: Partial<FacilityBrief>) => void;
  isTenderSent: boolean;
  bidDeadlineDays: 7 | 14 | 21;
  setBidDeadlineDays: (days: 7 | 14 | 21) => void;
  sendTender: () => void;
  tenderPackages: SupplierRequestItem[];
  bids: TenderBid[];
  selectedPackageForComparison: string;
  setSelectedPackageForComparison: (pkgId: string) => void;
  simulateSupplierBids: (requestId: string) => void;
  suppliers: Supplier[];
  awardedSupplierId: string | null;
  awardSupplier: (supplierId: string) => void;
  awardStage: 'Awarded' | 'Agreement' | 'Shipping' | 'After-sales';
  setAwardStage: (stage: 'Awarded' | 'Agreement' | 'Shipping' | 'After-sales') => void;
  supplierRequests: SupplierRequestItem[];
  submitSupplierBid: (requestId: string, bidData: { priceQar: number; product: string; deliveryWeeks: number; warrantyYears: number; notes: string }) => void;
  declineSupplierRequest: (requestId: string) => void;

  // Coaching & Vacancies State
  coaches: Coach[];
  updateCoachProfile: (coachId: string, updates: Partial<Coach>) => void;
  vacancies: Vacancy[];
  publishVacancy: (newVacancy: Omit<Vacancy, 'id' | 'publishedDate'>) => void;
  selectedVacancyId: string;
  setSelectedVacancyId: (id: string) => void;
  applications: CoachApplication[];
  applyToVacancy: (vacancyId: string, coachId: string, note: string) => void;
  shortlistedCoachIds: string[];
  toggleShortlistCoach: (coachId: string) => void;
  comparedCoachIds: string[];
  toggleCompareCoach: (coachId: string) => void;
  selectedCoachForView: string;
  setSelectedCoachForView: (coachId: string) => void;
  requestInterview: (vacancyId: string, coachId: string) => void;

  // Private Coaching & Booking State
  parentSearch: {
    sport: string;
    childAge: number;
    childLevel: string;
    location: string;
    sessionFormat: string;
    availableDay: string;
  };
  setParentSearch: React.Dispatch<React.SetStateAction<{
    sport: string;
    childAge: number;
    childLevel: string;
    location: string;
    sessionFormat: string;
    availableDay: string;
  }>>;
  sessionSlots: SessionSlot[];
  toggleSlotAvailability: (slotId: string) => void;
  sessionRequests: SessionRequest[];
  sendSessionRequest: (data: Omit<SessionRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateSessionRequestStatus: (requestId: string, status: 'Pending' | 'Accepted' | 'Declined' | 'New time proposed', proposedNewTime?: string) => void;

  // Verification modal popover state
  verifiedModalData: {
    title: string;
    details: Record<string, any>;
    isOpen: boolean;
  } | null;
  openVerifiedModal: (title: string, details: Record<string, any>) => void;
  closeVerifiedModal: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper function to build packages based on facility brief
export function generatePackagesFromBrief(brief: FacilityBrief, deadlineDays: number): SupplierRequestItem[] {
  const pkgs: SupplierRequestItem[] = [];

  if (brief.pitches5aSide > 0) {
    pkgs.push(
      {
        id: 'pkg-turf',
        title: 'Premium artificial turf pitch package',
        category: 'Sports Surfaces & Civil Works',
        facility: `${brief.ownerType} Facility (Sample)`,
        location: brief.location,
        tier: brief.qualityTier,
        deadlineDays,
        status: 'New',
        specs: [
          'UV-stabilised polyethylene monofilament 50mm pile height',
          'heat-limiting infill designed to reduce surface heat; supplier to document performance',
          'Shock pad elastic layer with laser-levelled crushed stone sub-base',
          'relevant international quality certification, to be stated by the bidder',
          'UV warranty period to be stated by the bidder'
        ]
      },
      {
        id: 'pkg-light',
        title: 'High-mast LED floodlighting package',
        category: 'Electrical & Optics',
        facility: `${brief.ownerType} Facility (Sample)`,
        location: brief.location,
        tier: brief.qualityTier,
        deadlineDays,
        status: 'New',
        specs: [
          'IP66 dust-sealed sports field floodlights',
          '750 lux sports field coverage with anti-glare cut-off',
          'Passive heat dissipation rated for continuous summer operation'
        ]
      },
      {
        id: 'pkg-nets',
        title: 'Perimeter ball catch netting package',
        category: 'Safety & Enclosures',
        facility: `${brief.ownerType} Facility (Sample)`,
        location: brief.location,
        tier: brief.qualityTier,
        deadlineDays,
        status: 'New',
        specs: [
          '6m height perimeter containment netting',
          'High-tenacity UV-stabilized knotless polypropylene',
          'Engineered for regional wind-load conditions'
        ]
      },
      {
        id: 'pkg-seats',
        title: 'Spectator seating and shading package',
        category: 'Architectural Tensile',
        facility: `${brief.ownerType} Facility (Sample)`,
        location: brief.location,
        tier: brief.qualityTier,
        deadlineDays,
        status: 'New',
        specs: [
          'Modular spectator grandstand seating (500 seats)',
          'UV-inhibited polyolefin copolymer seats',
          'Architectural tensioned shade canopy structure'
        ]
      }
    );
  }

  if (brief.olympicPools > 0) {
    pkgs.push({
      id: 'pkg-olympic',
      title: 'Olympic pool package',
      category: 'Heavy Aquatics Engineering',
      facility: `${brief.ownerType} Facility (Sample)`,
      location: brief.location,
      tier: brief.qualityTier,
      deadlineDays,
      status: 'New',
      specs: [
        'Olympic 50m pool equipment and basin fittings',
        'High-capacity active heat-exchange water chilling plant',
        'Multi-layer high-rate sand filtration with regenerative ozone treatment',
        'Fittings to be confirmed against the current World Aquatics facility requirements'
      ]
    });
  }

  if (brief.smallerPools > 0) {
    pkgs.push({
      id: 'pkg-training-pool',
      title: 'Training pool package',
      category: 'Aquatics Engineering',
      facility: `${brief.ownerType} Facility (Sample)`,
      location: brief.location,
      tier: brief.qualityTier,
      deadlineDays,
      status: 'New',
      specs: [
        '25m training pool hydraulic pump package',
        'Automated water sanitation and filtration system',
        'Dedicated temperature balancing circulation'
      ]
    });
  }

  if (brief.indoorHalls > 0) {
    pkgs.push({
      id: 'pkg-indoor-hall',
      title: 'Indoor hall package',
      category: 'Indoor Sports Facilities',
      facility: `${brief.ownerType} Facility (Sample)`,
      location: brief.location,
      tier: brief.qualityTier,
      deadlineDays,
      status: 'New',
      specs: [
        'Multi-sport sprung wooden or polyurethane surface',
        'Acoustic wall panelling and integrated scoring console',
        'Indoor environmental temperature control integration'
      ]
    });
  }

  return pkgs;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [portal, setPortalState] = useState<PortalType>(null);
  const [mode, setModeState] = useState<BusinessMode>('buying');
  const [persona, setPersonaState] = useState<Persona>('Club');
  const [activeFlow, setActiveFlowState] = useState<FlowId>('A');
  const [flowStep, setFlowStep] = useState<string>('A1');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setPortal = (newPortal: PortalType) => {
    setPortalState(newPortal);
    if (newPortal === 'business') {
      if (mode === 'selling') {
        setPersonaState('Supplier');
        setActiveFlowState('A');
        setFlowStep('A4');
      } else {
        setPersonaState('Club');
        setActiveFlowState('A');
        setFlowStep('A1');
      }
    } else if (newPortal === 'individual') {
      setPersonaState('Coach');
      setActiveFlowState('B');
      setFlowStep('B1');
    } else if (newPortal === 'athlete') {
      setPersonaState('Parent');
      setActiveFlowState('C');
      setFlowStep('C1');
    }
  };

  const setMode = (newMode: BusinessMode) => {
    setModeState(newMode);
    if (newMode === 'buying') {
      setPersonaState('Club');
      setActiveFlowState('A');
      setFlowStep('A1');
    } else {
      setPersonaState('Supplier');
      setActiveFlowState('A');
      setFlowStep('A4');
    }
  };

  // Verification Modal
  const [verifiedModalData, setVerifiedModalData] = useState<{
    title: string;
    details: Record<string, any>;
    isOpen: boolean;
  } | null>(null);

  const openVerifiedModal = (title: string, details: Record<string, any>) => {
    setVerifiedModalData({ title, details, isOpen: true });
  };

  const closeVerifiedModal = () => {
    setVerifiedModalData(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Determine Role based on Persona
  const role: RoleType = (persona === 'Club' || persona === 'Parent') ? 'Client' : 'Provider';

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Handle Persona Switching and sync default Portal, Flow & Step
  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    if (newPersona === 'Club') {
      setPortalState('business');
      setModeState('buying');
      setActiveFlowState('A');
      setFlowStep('A1');
    } else if (newPersona === 'Supplier') {
      setPortalState('business');
      setModeState('selling');
      setActiveFlowState('A');
      setFlowStep('A4');
    } else if (newPersona === 'Coach') {
      setPortalState('individual');
      setActiveFlowState('B');
      setFlowStep('B1');
    } else if (newPersona === 'Parent') {
      setPortalState('athlete');
      setActiveFlowState('C');
      setFlowStep('C1');
    }
    showToast(`Switched persona to ${newPersona} (${(newPersona === 'Club' || newPersona === 'Parent') ? 'Client' : 'Provider'})`);
  };

  // Handle Flow Switching
  const setActiveFlow = (flow: FlowId) => {
    setActiveFlowState(flow);
    if (flow === 'A') {
      if (persona === 'Supplier') {
        setFlowStep('A4');
      } else {
        setFlowStep('A1');
      }
    } else if (flow === 'B') {
      if (persona === 'Coach') {
        setFlowStep('B1');
      } else {
        setFlowStep('B5');
      }
    } else if (flow === 'C') {
      if (persona === 'Coach') {
        setFlowStep('C6');
      } else {
        setFlowStep('C1');
      }
    }
  };

  // Facility State
  const [facilityBrief, setFacilityBrief] = useState<FacilityBrief>({
    ownerType: 'Club',
    pitches5aSide: 1,
    olympicPools: 1,
    smallerPools: 1,
    indoorHalls: 0,
    location: 'Doha, Qatar',
    qualityTier: 'Premium',
    includeStaffingPlan: true
  });

  const updateFacilityBrief = (updates: Partial<FacilityBrief>) => {
    setFacilityBrief((prev) => ({ ...prev, ...updates }));
  };

  const [isTenderSent, setIsTenderSent] = useState<boolean>(false);
  const [bidDeadlineDays, setBidDeadlineDays] = useState<7 | 14 | 21>(14);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [awardedSupplierId, setAwardedSupplierId] = useState<string | null>(null);
  const [awardStage, setAwardStage] = useState<'Awarded' | 'Agreement' | 'Shipping' | 'After-sales'>('Awarded');

  // Bids array: starts empty! Bids come from actions only.
  const [bids, setBids] = useState<TenderBid[]>([]);

  // Generated tender packages from brief
  const tenderPackages = generatePackagesFromBrief(facilityBrief, bidDeadlineDays);

  const [selectedPackageForComparison, setSelectedPackageForComparison] = useState<string>('pkg-turf');

  // Supplier requests initially generated or synced
  const [supplierRequests, setSupplierRequests] = useState<SupplierRequestItem[]>([]);

  const sendTender = () => {
    setIsTenderSent(true);
    const pkgs = generatePackagesFromBrief(facilityBrief, bidDeadlineDays);
    setSupplierRequests(pkgs);
    if (pkgs.length > 0 && !pkgs.some((p) => p.id === selectedPackageForComparison)) {
      setSelectedPackageForComparison(pkgs[0].id);
    }
    showToast('Tender published to verified suppliers.');
  };

  const submitSupplierBid = (
    requestId: string,
    bidData: { priceQar: number; product: string; deliveryWeeks: number; warrantyYears: number; notes: string }
  ) => {
    // Add live bid
    const newBid: TenderBid = {
      id: `bid-live-${Date.now()}`,
      requestId,
      supplierId: suppliers[0].id,
      priceQar: bidData.priceQar,
      product: bidData.product,
      deliveryWeeks: bidData.deliveryWeeks,
      warrantyYears: bidData.warrantyYears,
      notes: bidData.notes,
      source: 'live',
      submittedAt: 'Just now'
    };

    setBids((prev) => [newBid, ...prev.filter((b) => !(b.requestId === requestId && b.supplierId === suppliers[0].id))]);

    setSupplierRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Bid sent', submittedBid: bidData } : r))
    );

    showToast('Bid submitted to client.');
  };

  const simulateSupplierBids = (requestId: string) => {
    const simBid1: TenderBid = {
      id: `bid-sim-1-${Date.now()}`,
      requestId,
      supplierId: suppliers[1].id,
      priceQar: 920000,
      product: 'DesertCool Turf 55 (Sample)',
      deliveryWeeks: 4,
      warrantyYears: 10,
      notes: 'Patented yarn extrusion suited to Doha summer conditions. 4-week expedited port transit.',
      source: 'simulated',
      submittedAt: 'Simulated'
    };

    const simBid2: TenderBid = {
      id: `bid-sim-2-${Date.now()}`,
      requestId,
      supplierId: suppliers[2].id,
      priceQar: 960000,
      product: 'MaxDur Ultra Turf 60 (Sample)',
      deliveryWeeks: 8,
      warrantyYears: 12,
      notes: '12-year manufacturer warranty with annual fiber pull-test and infill rejuvenation audits.',
      source: 'simulated',
      submittedAt: 'Simulated'
    };

    setBids((prev) => [
      ...prev.filter((b) => b.requestId !== requestId || b.source !== 'simulated'),
      simBid1,
      simBid2
    ]);

    showToast('Two simulated bids added for evaluation.');
  };

  const declineSupplierRequest = (requestId: string) => {
    setSupplierRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Declined' } : r))
    );
    showToast('Request archived as declined.');
  };

  const awardSupplier = (supplierId: string) => {
    setAwardedSupplierId(supplierId);
    setAwardStage('Awarded');
    showToast(`Tender officially awarded to ${suppliers.find((s) => s.id === supplierId)?.name || 'selected supplier'}.`);
  };

  // Coaching & Vacancies State
  const [coaches, setCoaches] = useState<Coach[]>(INITIAL_COACHES);
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('vac-1');
  const [applications, setApplications] = useState<CoachApplication[]>([
    {
      id: 'app-sample-1',
      vacancyId: 'vac-1',
      coachId: 'coach-1',
      status: 'Shortlisted',
      note: 'I hold an active AFC/QFA B license with 5 years leading U11/U12 developmental programs.',
      appliedDate: 'Yesterday'
    }
  ]);
  const [shortlistedCoachIds, setShortlistedCoachIds] = useState<string[]>(['coach-1', 'coach-2']);
  const [comparedCoachIds, setComparedCoachIds] = useState<string[]>(['coach-1', 'coach-2']);
  const [selectedCoachForView, setSelectedCoachForView] = useState<string>('coach-1');

  const updateCoachProfile = (coachId: string, updates: Partial<Coach>) => {
    setCoaches((prev) =>
      prev.map((c) => (c.id === coachId ? { ...c, ...updates } : c))
    );
    showToast('Coach profile updated successfully.');
  };

  const publishVacancy = (newVac: Omit<Vacancy, 'id' | 'publishedDate'>) => {
    const id = `vac-${Date.now()}`;
    const fullVacancy: Vacancy = {
      ...newVac,
      id,
      publishedDate: 'Just now',
      criteriaMatch: {
        license: true,
        ageGroup: true,
        location: true
      }
    };
    setVacancies((prev) => [fullVacancy, ...prev]);
    showToast(`Vacancy "${newVac.title}" published and listed in coach opportunities.`);
  };

  const applyToVacancy = (vacancyId: string, coachId: string, note: string) => {
    const newApp: CoachApplication = {
      id: `app-${Date.now()}`,
      vacancyId,
      coachId,
      status: 'Applied',
      note: note || 'Applied using verified profile credentials.',
      appliedDate: 'Just now'
    };
    setApplications((prev) => [newApp, ...prev.filter((a) => !(a.vacancyId === vacancyId && a.coachId === coachId))]);
    showToast('Application submitted with verified coach profile.');
  };

  const toggleShortlistCoach = (coachId: string) => {
    setShortlistedCoachIds((prev) => {
      const exists = prev.includes(coachId);
      const next = exists ? prev.filter((id) => id !== coachId) : [...prev, coachId];
      showToast(exists ? 'Removed coach from shortlist' : 'Added coach to shortlist');
      return next;
    });
  };

  const toggleCompareCoach = (coachId: string) => {
    setComparedCoachIds((prev) => {
      if (prev.includes(coachId)) {
        return prev.filter((id) => id !== coachId);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 coaches can be compared simultaneously.');
        return prev;
      }
      return [...prev, coachId];
    });
  };

  const requestInterview = (vacancyId: string, coachId: string) => {
    setApplications((prev) => {
      const existing = prev.find((a) => a.coachId === coachId && a.vacancyId === vacancyId);
      if (existing) {
        return prev.map((a) => (a.id === existing.id ? { ...a, status: 'Interview requested' } : a));
      }
      return [
        {
          id: `app-${Date.now()}`,
          vacancyId,
          coachId,
          status: 'Interview requested',
          note: 'Club initiated interview request.',
          appliedDate: 'Today'
        },
        ...prev
      ];
    });
    showToast('Interview request sent to coach. Stepper updated.');
  };

  // Private Coaching & Booking State
  const [parentSearch, setParentSearch] = useState({
    sport: 'Football',
    childAge: 9,
    childLevel: 'Intermediate',
    location: 'Doha Central, Qatar',
    sessionFormat: 'In person',
    availableDay: 'All'
  });

  const [sessionSlots, setSessionSlots] = useState<SessionSlot[]>(INITIAL_SESSION_SLOTS);

  const toggleSlotAvailability = (slotId: string) => {
    setSessionSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([
    {
      id: 'req-session-1',
      coachId: 'coach-1',
      slotId: 'slot-1',
      slotDay: 'Tuesday',
      slotTime: '16:30 – 17:30',
      slotLocation: 'Pitch 2, Falcon Sports Grounds, Doha',
      childFirstName: 'Sami',
      childAge: 9,
      childLevel: 'Intermediate',
      goal: 'Improve 1v1 ball mastery and build game confidence.',
      message: 'Looking for a structured, encouraging private coach to refine first touch and movement.',
      parentName: 'Khalid Al-Nuaimi',
      status: 'Pending',
      createdAt: 'Today, 10:15 AM'
    }
  ]);

  const sendSessionRequest = (data: Omit<SessionRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: SessionRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'Pending',
      createdAt: 'Just now'
    };
    setSessionRequests((prev) => [newReq, ...prev]);
    showToast('Session request dispatched to coach. Direct contact shared upon acceptance.');
  };

  const updateSessionRequestStatus = (
    requestId: string,
    status: 'Pending' | 'Accepted' | 'Declined' | 'New time proposed',
    proposedNewTime?: string
  ) => {
    setSessionRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status, ...(proposedNewTime ? { proposedNewTime } : {}) }
          : r
      )
    );
    if (status === 'Accepted') {
      showToast('Session confirmed! Added to Coach weekly calendar and Parent schedule.');
    } else if (status === 'Declined') {
      showToast('Session request declined.');
    } else if (status === 'New time proposed') {
      showToast(`Alternative time (${proposedNewTime}) proposed to parent.`);
    }
  };

  // Reset demo data to initial state
  const resetDemoData = () => {
    setPortalState(null);
    setModeState('buying');
    setPersonaState('Club');
    setActiveFlowState('A');
    setFlowStep('A1');
    setViewportMode('responsive');
    setFacilityBrief({
      ownerType: 'Club',
      pitches5aSide: 1,
      olympicPools: 1,
      smallerPools: 1,
      indoorHalls: 0,
      location: 'Doha, Qatar',
      qualityTier: 'Premium',
      includeStaffingPlan: true
    });
    setIsTenderSent(false);
    setBidDeadlineDays(14);
    setBids([]);
    setSupplierRequests([]);
    setSelectedPackageForComparison('pkg-turf');
    setAwardedSupplierId(null);
    setAwardStage('Awarded');
    setCoaches(INITIAL_COACHES);
    setVacancies(INITIAL_VACANCIES);
    setSelectedVacancyId('vac-1');
    setApplications([
      {
        id: 'app-sample-1',
        vacancyId: 'vac-1',
        coachId: 'coach-1',
        status: 'Shortlisted',
        note: 'I hold an active AFC/QFA B license with 5 years leading U11/U12 developmental programs.',
        appliedDate: 'Yesterday'
      }
    ]);
    setShortlistedCoachIds(['coach-1', 'coach-2']);
    setComparedCoachIds(['coach-1', 'coach-2']);
    setSelectedCoachForView('coach-1');
    setSessionSlots(INITIAL_SESSION_SLOTS);
    setSessionRequests([
      {
        id: 'req-session-1',
        coachId: 'coach-1',
        slotId: 'slot-1',
        slotDay: 'Tuesday',
        slotTime: '16:30 – 17:30',
        slotLocation: 'Pitch 2, Falcon Sports Grounds, Doha',
        childFirstName: 'Sami',
        childAge: 9,
        childLevel: 'Intermediate',
        goal: 'Improve 1v1 ball mastery and build game confidence.',
        message: 'Looking for a structured, encouraging private coach to refine first touch and movement.',
        parentName: 'Khalid Al-Nuaimi',
        status: 'Pending',
        createdAt: 'Today, 10:15 AM'
      }
    ]);
    showToast('Demo data reset to initial state.');
  };

  // Sync HTML body class for theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
      document.body.style.backgroundColor = '#F4F5F7';
      document.body.style.color = '#1F2430';
    } else {
      root.classList.remove('theme-light');
      document.body.style.backgroundColor = '#0A0A0A';
      document.body.style.color = '#E2E2E2';
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        portal,
        setPortal,
        mode,
        setMode,
        resetDemoData,
        theme,
        setTheme,
        toggleTheme,
        persona,
        setPersona,
        role,
        activeFlow,
        setActiveFlow,
        flowStep,
        setFlowStep,
        viewportMode,
        setViewportMode,

        // Facility & Tender
        facilityBrief,
        updateFacilityBrief,
        isTenderSent,
        bidDeadlineDays,
        setBidDeadlineDays,
        sendTender,
        tenderPackages,
        bids,
        selectedPackageForComparison,
        setSelectedPackageForComparison,
        simulateSupplierBids,
        suppliers,
        awardedSupplierId,
        awardSupplier,
        awardStage,
        setAwardStage,
        supplierRequests,
        submitSupplierBid,
        declineSupplierRequest,

        // Coaching & Vacancies
        coaches,
        updateCoachProfile,
        vacancies,
        publishVacancy,
        selectedVacancyId,
        setSelectedVacancyId,
        applications,
        applyToVacancy,
        shortlistedCoachIds,
        toggleShortlistCoach,
        comparedCoachIds,
        toggleCompareCoach,
        selectedCoachForView,
        setSelectedCoachForView,
        requestInterview,

        // Private Coaching & Booking
        parentSearch,
        setParentSearch,
        sessionSlots,
        toggleSlotAvailability,
        sessionRequests,
        sendSessionRequest,
        updateSessionRequestStatus,

        // Modal
        verifiedModalData,
        openVerifiedModal,
        closeVerifiedModal,

        // Toast
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
