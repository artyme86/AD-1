/**
 * Athlete Directory - Verified Registry & Marketplace Sample Data
 * Standardized sample records for 3 suppliers, 4 vacancies, 5 coaches, 6 session slots.
 */

export interface VerificationDetails {
  crNumber?: string;
  verifiedDate: string;
  authority: string;
  accreditations: string[];
  safeguardingClearance: string;
  idChecked?: string;
  licenseNumber?: string;
  licenseChecked?: string;
  policeClearance?: string;
  safeguarding?: string;
  firstAid?: string;
}

export interface SupplierBid {
  priceQar: number;
  product: string;
  deliveryWeeks: number;
  warrantyYears: number;
  tag: 'Lowest price' | 'Fastest delivery' | 'Longest warranty' | 'Standard';
  notes: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  location: string;
  category: string;
  verified: boolean;
  verificationDetails: VerificationDetails;
  bid: SupplierBid;
}

export interface Vacancy {
  id: string;
  club: string;
  title: string;
  sport: string;
  ageGroup: string;
  contractType: string;
  location: string;
  startDate: string;
  minLicense: string;
  minExperienceYears: number;
  languages: string[];
  salarySample: string;
  publishedDate: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string;
  bannerUrl?: string;
  clubLogoColor?: string;
  criteriaMatch?: {
    license: boolean;
    ageGroup: boolean;
    location: boolean;
  };
}

export interface LicenseItem {
  title: string;
  issuer: string;
  status: 'Verified' | 'Pending';
  year: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  details: string;
}

export interface Coach {
  id: string;
  name: string;
  headline: string;
  sport: string;
  ageGroups: string[];
  location: string;
  sessionFormats: string[];
  pricePerSessionQar: number;
  profileCompleteness: number;
  verified: boolean;
  verificationDetails: VerificationDetails;
  licenses: LicenseItem[];
  experience: ExperienceItem[];
  languages: string[];
  availability: string;
  preferredRoles: string[];
  bio: string;
  avatarUrl?: string;
  reviewCount: number;
  emptyReviewNote: string;
  criteriaMatch?: {
    license: boolean;
    ageGroup: boolean;
    location: boolean;
  };
}

export interface SessionSlot {
  id: string;
  day: string;
  time: string;
  location: string;
  surface: string;
  isAvailable: boolean;
}

/**
 * placeholder until real manual-case data replaces them
 */
export const ILLUSTRATIVE_RATES = {
  pitch5aSide: { lowQar: 800000, highQar: 1200000 },
  olympicPool: { lowQar: 14000000, highQar: 19000000 },
  smallerPool: { lowQar: 3500000, highQar: 5000000 },
  contractingAndPM: { lowQar: 1500000, highQar: 2200000 }
};

export interface FacilityAsset {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  specs: string[];
}

export const FACILITY_ASSETS: Record<string, FacilityAsset> = {
  pitches5aSide: {
    id: 'pitches5aSide',
    name: '5-a-side Pitch (FIFA Quality Pro)',
    subtitle: 'Synthetic turf system with shockpad & infill',
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80',
    specs: ['50mm Monofilament turf', '15mm Prefabricated shockpad', '4m Perimeter containment netting', '300 Lux LED sports floodlighting']
  },
  olympicPools: {
    id: 'olympicPools',
    name: 'Olympic 50m Competition Pool',
    subtitle: 'World Aquatics 10-lane competition tank',
    imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=600&q=80',
    specs: ['50m × 25m × 2.0m depth', '10 Competition lanes with anti-wave ropes', 'Omega timing touchpads & starting blocks', 'Commercial sand filtration & heat pumps']
  },
  smallerPools: {
    id: 'smallerPools',
    name: '25m Warm-up / Training Pool',
    subtitle: 'Short-course swimming & training tank',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c224?auto=format&fit=crop&w=600&q=80',
    specs: ['25m × 12.5m × 1.4m depth', '5 Dedicated training lanes', 'Pediatric learn-to-swim entry zone', 'Constant temperature control (28°C)']
  },
  indoorHalls: {
    id: 'indoorHalls',
    name: 'Multi-Sport Indoor Arena',
    subtitle: 'Area-elastic timber sprung flooring',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    specs: ['Point-elastic sprung maple floor', 'FIBA / BWF multi-court line markings', 'Acoustic wall attenuation panels', 'HVAC climate control for desert conditions']
  }
};

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    name: "Northgate Sports Infrastructure (Sample)",
    contactPerson: "Nasser Al-Hajri",
    location: "Doha, Qatar",
    category: "Sports Surfaces & Civil Works",
    verified: true,
    verificationDetails: {
      crNumber: "CR-782914-QA",
      verifiedDate: "14 Jan 2024",
      authority: "Ministry of Commerce & Industry Qatar",
      accreditations: ["installer qualification, to be stated by the bidder", "ISO 9001:2015", "Technical Facility Approved"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 840000,
      product: "Pro Turf (Sample)",
      deliveryWeeks: 6,
      warrantyYears: 8,
      tag: "Lowest price",
      notes: "Includes silica sand, laser grading, shock pad underlayment, and heat-limiting infill designed to reduce surface heat; supplier to document performance."
    }
  },
  {
    id: "sup-2",
    name: "Meridian Turf Systems (Sample)",
    contactPerson: "Fahad Al-Kuwari",
    location: "Lusail, Qatar",
    category: "Synthetic Surfaces & Arena Engineering",
    verified: true,
    verificationDetails: {
      crNumber: "CR-920183-QA",
      verifiedDate: "03 Mar 2024",
      authority: "Ministry of Commerce & Industry Qatar",
      accreditations: ["relevant international quality certification, to be stated by the bidder", "ESTC European Synthetic Turf Council", "ISO 14001:2015"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 920000,
      product: "DesertCool Turf 55 (Sample)",
      deliveryWeeks: 4,
      warrantyYears: 10,
      tag: "Fastest delivery",
      notes: "Patented yarn extrusion suited to Doha summer conditions. 4-week expedited port transit."
    }
  },
  {
    id: "sup-3",
    name: "Summit Arena Solutions (Sample)",
    contactPerson: "Marcus Vance",
    location: "Doha, Qatar",
    category: "Turnkey Stadium & Sports Architecture",
    verified: true,
    verificationDetails: {
      crNumber: "CR-615029-QA",
      verifiedDate: "28 Nov 2023",
      authority: "Qatar Commerce Licensing Authority",
      accreditations: ["Accredited Sports Contractor", "SAPCA Certified", "ISO 45001 Safety"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 960000,
      product: "MaxDur Ultra Turf 60 (Sample)",
      deliveryWeeks: 8,
      warrantyYears: 12,
      tag: "Longest warranty",
      notes: "12-year manufacturer warranty with annual fiber pull-test and infill rejuvenation audits."
    }
  }
];

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: "vac-1",
    club: "Harbor City FC Youth Academy (Sample)",
    title: "Head Youth Football Coach (U11/U12)",
    sport: "Football",
    ageGroup: "10–12",
    contractType: "Full-time",
    location: "Doha, Qatar",
    startDate: "15 Aug 2026",
    minLicense: "AFC/UEFA 'B' License (as recognised by the hiring club)",
    minExperienceYears: 4,
    languages: ["Arabic", "English"],
    salarySample: "QAR 22,000 - 28,000 / month (Sample)",
    publishedDate: "2 days ago",
    bannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    clubLogoColor: "#E50000",
    requirements: [
      "Valid AFC/UEFA 'B' or equivalent national governing body license, as recognised by the hiring club",
      "Minimum 4 years coaching players aged 9–12 in an accredited academy",
      "Demonstrated knowledge of technical ball mastery and positional play fundamentals",
      "Clear background check & valid First Aid/SafeSport credentials"
    ],
    responsibilities: [
      "Plan and lead 4 weekly training sessions and weekend league matches",
      "Conduct bi-monthly player progress assessments with parents and academy director",
      "Coordinate with sports science team on workload management and warm-ups"
    ],
    benefits: "Competitive monthly salary, housing allowance, private health insurance, annual return flights.",
    criteriaMatch: { license: true, ageGroup: true, location: true }
  },
  {
    id: "vac-2",
    club: "Falcon Rovers Development (Sample)",
    title: "Junior Academy Coach (U8/U9)",
    sport: "Football",
    ageGroup: "7–9",
    contractType: "Part-time",
    location: "Doha, Qatar",
    startDate: "01 Sep 2026",
    minLicense: "AFC 'C' or Grassroots Leader (as recognised by the hiring club)",
    minExperienceYears: 2,
    languages: ["Arabic", "English"],
    salarySample: "QAR 8,000 - 12,000 / month (Sample)",
    publishedDate: "5 days ago",
    bannerUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
    clubLogoColor: "#0284C7",
    requirements: [
      "AFC 'C' or UEFA 'C' license, as recognised by the hiring club",
      "Experience developing motor skills and fun-focused football sessions for ages 6–9",
      "Child safeguarding clearance"
    ],
    responsibilities: [
      "Lead afternoon grassroots sessions (3 days/week)",
      "Engage parents on holistic child athletic progression"
    ],
    benefits: "Uniform kit package, coaching education sponsorship, performance bonus.",
    criteriaMatch: { license: true, ageGroup: true, location: true }
  },
  {
    id: "vac-3",
    club: "Regional Racquet Academy (Sample)",
    title: "Youth Performance Tennis Coach",
    sport: "Tennis",
    ageGroup: "10–12",
    contractType: "Full-time",
    location: "Khalifa Tennis Complex, Doha",
    startDate: "01 Oct 2026",
    minLicense: "ITF Level 2 / PTR Professional (as recognised by the hiring club)",
    minExperienceYears: 3,
    languages: ["English"],
    salarySample: "QAR 18,000 - 24,000 / month (Sample)",
    publishedDate: "1 week ago",
    bannerUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    clubLogoColor: "#D97706",
    requirements: [
      "ITF Level 2 or equivalent national governing body license, as recognised by the hiring club",
      "Tournament junior travel coaching experience"
    ],
    responsibilities: [
      "Develop stroke mechanics, match play strategy, and tournament scheduling"
    ],
    benefits: "Court allowance, international tournament travel per diem, medical insurance.",
    criteriaMatch: { license: false, ageGroup: true, location: true }
  },
  {
    id: "vac-4",
    club: "Coastal Aquatics Academy (Sample)",
    title: "Junior Competitive Swimming Coach",
    sport: "Swimming",
    ageGroup: "7–12",
    contractType: "Full-time",
    location: "Aspire Zone, Doha",
    startDate: "15 Sep 2026",
    minLicense: "World Aquatics Level 2 / ASCA 3 (as recognised by the hiring club)",
    minExperienceYears: 5,
    languages: ["English", "Arabic"],
    salarySample: "QAR 20,000 - 26,000 / month (Sample)",
    publishedDate: "3 days ago",
    bannerUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80",
    clubLogoColor: "#059669",
    requirements: [
      "World Aquatics Level 2 coach certification, as recognised by the hiring club",
      "Lifeguard certification and pediatric CPR"
    ],
    responsibilities: [
      "Lead age-group swim squad training, stroke analysis, and meet entries"
    ],
    benefits: "Aspire campus facilities pass, annual relocation allowance, family medical cover.",
    criteriaMatch: { license: false, ageGroup: true, location: true }
  }
];

export const INITIAL_COACHES: Coach[] = [
  {
    id: "coach-1",
    name: "Coach Tariq Mansour (Sample)",
    headline: "Youth football coach, ages 7–12",
    sport: "Football",
    ageGroups: ["7–9", "10–12"],
    location: "Doha Central, Qatar",
    sessionFormats: ["In person"],
    pricePerSessionQar: 280,
    profileCompleteness: 92,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar National ID verified",
      licenseNumber: "QFA/AFC-B-2022-8819",
      licenseChecked: "AFC 'B' License (as recognised by the hiring club, valid through 2027)",
      policeClearance: "Good Conduct Certificate (Ministry of Interior Qatar, Jan 2026)",
      safeguarding: "SafeSport International Child Protection in Athletics (Level 2)",
      firstAid: "Qatar Red Crescent Pediatric First Aid & AED (Expires Nov 2027)",
      authority: "National Football Association & Ministry of Youth and Sports",
      verifiedDate: "12 Jan 2024",
      accreditations: ["AFC 'B' License", "Grassroots Diploma", "SafeSport Certified"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "AFC / QFA 'B' License", issuer: "Qatar Football Association", status: "Verified", year: "2022" },
      { title: "UEFA Grassroots Coaching Diploma", issuer: "The FA (UK)", status: "Verified", year: "2020" },
      { title: "SafeSport Child Protection & Safeguarding", issuer: "SafeSport International", status: "Verified", year: "2024" },
      { title: "Pediatric First Aid & CPR", issuer: "Qatar Red Crescent", status: "Verified", year: "2024" },
      { title: "AFC Youth Specialist Diploma", issuer: "AFC", status: "Pending", year: "2026" }
    ],
    experience: [
      { period: "2021 – Present", role: "Lead U11 Coach", organization: "Falcon Rovers Youth Academy (Sample)", details: "Coaching technical mastery and match tactical awareness for 24 elite junior players." },
      { period: "2018 – 2021", role: "Junior Grassroots Coordinator", organization: "Qatar Sports Club (Sample)", details: "Designed grassroots curriculum for ages 6–10; increased academy retention by 35%." }
    ],
    languages: ["Arabic (Native)", "English (Fluent)"],
    availability: "Weekdays 15:30 – 19:30, Saturdays 08:30 – 13:00",
    preferredRoles: ["Head Youth Coach", "Private Technical Specialist"],
    bio: "Dedicated youth development coach with over eight years specializing in technical foundations, spatial cognition, and character building for young footballers aged 7 to 12. Committed to safe, positive, and structured athletic growth.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    reviewCount: 0,
    emptyReviewNote: "No reviews yet. Reviews appear after completed sessions",
    criteriaMatch: { license: true, ageGroup: true, location: true }
  },
  {
    id: "coach-2",
    name: "Coach Zaid Al-Bader (Sample)",
    headline: "Youth football specialist & agility trainer",
    sport: "Football",
    ageGroups: ["7–9", "10–12"],
    location: "The Pearl & West Bay, Doha",
    sessionFormats: ["In person", "Online"],
    pricePerSessionQar: 250,
    profileCompleteness: 88,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar National ID verified",
      licenseNumber: "QFA/AFC-C-2023-4102",
      licenseChecked: "AFC 'C' License & Grassroots Leader (as recognised by the hiring club)",
      policeClearance: "Ministry of Interior Qatar Clearance (Feb 2026)",
      safeguarding: "Child Safeguarding in Sport Certified",
      firstAid: "Valid Red Crescent First Aid",
      authority: "Qatar Football Association",
      verifiedDate: "04 Feb 2024",
      accreditations: ["AFC 'C' License", "Youth Grassroots Certificate", "SafeSport Certified"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "AFC 'C' License", issuer: "QFA", status: "Verified", year: "2023" },
      { title: "Youth Grassroots Certificate", issuer: "National Association", status: "Verified", year: "2021" },
      { title: "Child Safeguarding in Sport", issuer: "SafeSport", status: "Verified", year: "2024" }
    ],
    experience: [
      { period: "2022 – Present", role: "Junior Skills Coach", organization: "Harbor City Foundation (Sample)", details: "1-on-1 dribbling, first touch, and speed agility drills." }
    ],
    languages: ["Arabic", "English", "French"],
    availability: "Sundays, Tuesdays, Thursdays, Saturdays",
    preferredRoles: ["Private Skills Coach", "Grassroots Instructor"],
    bio: "Energetic and patient coach focused on boosting young players' dribbling, footwork, balance, and game confidence through fun, repetitive drills.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    reviewCount: 0,
    emptyReviewNote: "No reviews yet. Reviews appear after completed sessions",
    criteriaMatch: { license: true, ageGroup: true, location: true }
  },
  {
    id: "coach-3",
    name: "Coach Karim Benali (Sample)",
    headline: "Senior Youth Academy Coach & Tactical Specialist",
    sport: "Football",
    ageGroups: ["10–12", "13–16"],
    location: "West District, Doha",
    sessionFormats: ["In person"],
    pricePerSessionQar: 320,
    profileCompleteness: 95,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar Residence Permit verified",
      licenseNumber: "UEFA-A-2019-092",
      licenseChecked: "UEFA 'A' Youth License (as recognised by the hiring club)",
      policeClearance: "Interpol & Qatar MOI verified",
      safeguarding: "Advanced Child Protection Certificate",
      firstAid: "Sports Trauma & First Aid Level 3",
      authority: "National Football Association & QFA",
      verifiedDate: "19 Nov 2023",
      accreditations: ["UEFA 'A' Youth", "UEFA GK 'B'", "IOC Safeguarding"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "UEFA 'A' Youth License", issuer: "National Football Association", status: "Verified", year: "2019" },
      { title: "UEFA Goalkeeping B", issuer: "National Football Association", status: "Verified", year: "2021" },
      { title: "Advanced Safeguarding in Youth Sport", issuer: "UNICEF / IOC", status: "Verified", year: "2023" }
    ],
    experience: [
      { period: "2020 – Present", role: "Head of U12 Academy", organization: "Northgate SC (Sample)", details: "Overarching technical curriculum design and match analysis." }
    ],
    languages: ["French (Native)", "Arabic", "English"],
    availability: "Monday – Thursday afternoons",
    preferredRoles: ["Head Youth Coach", "Technical Director"],
    bio: "Over 12 years in European and Gulf professional academies developing tactical IQ, decision making under pressure, and elite habits.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    reviewCount: 0,
    emptyReviewNote: "No reviews yet. Reviews appear after completed sessions",
    criteriaMatch: { license: true, ageGroup: true, location: true }
  },
  {
    id: "coach-4",
    name: "Coach Elena Rostova (Sample)",
    headline: "Youth Competitive Swimming & Stroke Technique Coach",
    sport: "Swimming",
    ageGroups: ["7–9", "10–12"],
    location: "Lusail & Aspire Zone, Doha",
    sessionFormats: ["In person"],
    pricePerSessionQar: 300,
    profileCompleteness: 90,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar Residence Permit verified",
      licenseNumber: "WA-L2-2021-331",
      licenseChecked: "World Aquatics Level 2 Coach (as recognised by the hiring club)",
      policeClearance: "Ministry of Interior Qatar Clearance (Dec 2025)",
      safeguarding: "Child Safeguarding in Aquatics Certified",
      firstAid: "Lifeguard & CPR Specialist",
      authority: "World Aquatics & Qatar Swimming Association",
      verifiedDate: "10 Oct 2023",
      accreditations: ["World Aquatics L2", "RLSS Lifeguard", "Pediatric First Aid"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "World Aquatics Level 2 Swimming Coach", issuer: "World Aquatics", status: "Verified", year: "2021" },
      { title: "Royal Life Saving Society Pool Lifeguard", issuer: "RLSS", status: "Verified", year: "2023" }
    ],
    experience: [
      { period: "2019 – Present", role: "Age-Group Swim Coach", organization: "Doha Sharks Swim Club (Sample)", details: "Freestyle breathing mechanics, turn efficiency, and race prep." }
    ],
    languages: ["English", "Russian"],
    availability: "Tuesdays, Thursdays, Fridays, Saturdays",
    preferredRoles: ["Private Swim Instructor", "Age-Group Coach"],
    bio: "Former national swimmer specializing in teaching correct biomechanics, water confidence, and competitive endurance for youth.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    reviewCount: 0,
    emptyReviewNote: "No reviews yet. Reviews appear after completed sessions",
    criteriaMatch: { license: false, ageGroup: true, location: true }
  },
  {
    id: "coach-5",
    name: "Coach David O'Connor (Sample)",
    headline: "Junior Tennis Development Coach (Ages 7–12)",
    sport: "Tennis",
    ageGroups: ["7–9", "10–12"],
    location: "West Bay & Education City, Doha",
    sessionFormats: ["In person"],
    pricePerSessionQar: 290,
    profileCompleteness: 86,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar Residence Permit verified",
      licenseNumber: "ITF-2-2022-772",
      licenseChecked: "ITF Level 2 Performance Coach (as recognised by the hiring club)",
      policeClearance: "Qatar MOI Clearance (Nov 2025)",
      safeguarding: "LTA Child Protection & Safeguarding",
      firstAid: "CPR & AED Certified",
      authority: "International Tennis Board & QTF",
      verifiedDate: "18 Aug 2023",
      accreditations: ["ITF Level 2", "PTR Professional", "Child Protection LTA"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "ITF Level 2 Coach", issuer: "International Tennis Board", status: "Verified", year: "2022" },
      { title: "PTR Professional Junior Development", issuer: "PTR", status: "Verified", year: "2021" }
    ],
    experience: [
      { period: "2022 – Present", role: "Junior Head Pro", organization: "Oasis Tennis Club Doha (Sample)", details: "Red/Orange/Green ball progressions and tournament preparation." }
    ],
    languages: ["English"],
    availability: "Mondays, Wednesdays, Saturdays",
    preferredRoles: ["Private Tennis Coach", "Academy Lead"],
    bio: "Specialized in progressive ball and court sizes for young juniors to develop smooth stroke mechanics and court movement.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    reviewCount: 0,
    emptyReviewNote: "No reviews yet. Reviews appear after completed sessions",
    criteriaMatch: { license: false, ageGroup: true, location: true }
  }
];

export const INITIAL_SESSION_SLOTS: SessionSlot[] = [
  {
    id: "slot-1",
    day: "Tuesday",
    time: "16:30 – 17:30",
    location: "Pitch 2, Falcon Sports Grounds, Doha",
    surface: "Certified Synthetic Turf (Sample)",
    isAvailable: true
  },
  {
    id: "slot-2",
    day: "Tuesday",
    time: "17:45 – 18:45",
    location: "Pitch 2, Falcon Sports Grounds, Doha",
    surface: "Certified Synthetic Turf (Sample)",
    isAvailable: true
  },
  {
    id: "slot-3",
    day: "Thursday",
    time: "16:30 – 17:30",
    location: "Pitch 1, Qatar Sports Club, Doha",
    surface: "Natural Grass & Agility Grid",
    isAvailable: true
  },
  {
    id: "slot-4",
    day: "Thursday",
    time: "17:45 – 18:45",
    location: "Pitch 1, Qatar Sports Club, Doha",
    surface: "Natural Grass & Agility Grid",
    isAvailable: true
  },
  {
    id: "slot-5",
    day: "Saturday",
    time: "09:00 – 10:00",
    location: "Aspire Outdoor Turf 3, Aspire Zone",
    surface: "Certified Synthetic Turf (Shaded, Sample)",
    isAvailable: true
  },
  {
    id: "slot-6",
    day: "Saturday",
    time: "10:15 – 11:15",
    location: "Aspire Outdoor Turf 3, Aspire Zone",
    surface: "Certified Synthetic Turf (Shaded, Sample)",
    isAvailable: true
  }
];
