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

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    name: "Al Rayyan Sports Infrastructure (Sample)",
    contactPerson: "Nasser Al-Hajri",
    location: "Doha, Qatar",
    category: "Sports Surfaces & Civil Works",
    verified: true,
    verificationDetails: {
      crNumber: "CR-782914-QA",
      verifiedDate: "14 Jan 2024",
      authority: "Ministry of Commerce & Industry Qatar",
      accreditations: ["FIFA Licenced Turf Installer", "ISO 9001:2015", "QFA Facility Approved"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 840000,
      product: "FIFA Pro Turf DX-50",
      deliveryWeeks: 6,
      warrantyYears: 8,
      tag: "Lowest price",
      notes: "Includes silica sand & TPE organic heat-limiting infill, laser grading, shock pad underlayment."
    }
  },
  {
    id: "sup-2",
    name: "Gulf Turf & Arenas W.L.L. (Sample)",
    contactPerson: "Fahad Al-Kuwari",
    location: "Lusail, Qatar",
    category: "Synthetic Surfaces & Arena Engineering",
    verified: true,
    verificationDetails: {
      crNumber: "CR-920183-QA",
      verifiedDate: "03 Mar 2024",
      authority: "Ministry of Commerce & Industry Qatar",
      accreditations: ["FIFA Quality Pro Provider", "ESTC European Synthetic Turf Council", "ISO 14001:2015"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 920000,
      product: "DesertCool Hybrid Turf 55",
      deliveryWeeks: 4,
      warrantyYears: 10,
      tag: "Fastest delivery",
      notes: "Patented yarn extrusion designed for GCC extreme UV and 50°C summer conditions. 4-week expedited port transit."
    }
  },
  {
    id: "sup-3",
    name: "Apex Stadium Solutions (Sample)",
    contactPerson: "Marcus Vance",
    location: "Doha, Qatar",
    category: "Turnkey Stadium & Sports Architecture",
    verified: true,
    verificationDetails: {
      crNumber: "CR-615029-QA",
      verifiedDate: "28 Nov 2023",
      authority: "Qatar Financial Centre Authority",
      accreditations: ["FIFA Recommended Contractor", "SAPCA Certified", "ISO 45001 Safety"],
      safeguardingClearance: "Verified by Qatar Sports Authority"
    },
    bid: {
      priceQar: 960000,
      product: "MaxDur UltraCool 60 Mono",
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
    club: "Al Sadd SC Youth Academy (Sample)",
    title: "Head Youth Football Coach (U11/U12)",
    sport: "Football",
    ageGroup: "10–12",
    contractType: "Full-time",
    location: "Doha, Qatar",
    startDate: "15 Aug 2026",
    minLicense: "AFC/UEFA 'B' License",
    minExperienceYears: 4,
    languages: ["Arabic", "English"],
    salarySample: "QAR 22,000 - 28,000 / month (Sample)",
    publishedDate: "2 days ago",
    requirements: [
      "Valid AFC/UEFA 'B' or equivalent federation license",
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
    club: "Al Duhail SC Development (Sample)",
    title: "Junior Academy Coach (U8/U9)",
    sport: "Football",
    ageGroup: "7–9",
    contractType: "Part-time",
    location: "Doha, Qatar",
    startDate: "01 Sep 2026",
    minLicense: "AFC 'C' or Grassroots Leader",
    minExperienceYears: 2,
    languages: ["Arabic", "English"],
    salarySample: "QAR 8,000 - 12,000 / month (Sample)",
    publishedDate: "5 days ago",
    requirements: [
      "AFC 'C' or UEFA 'C' license",
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
    club: "Qatar Tennis & Squash Federation Academy (Sample)",
    title: "Youth Performance Tennis Coach",
    sport: "Tennis",
    ageGroup: "10–12",
    contractType: "Full-time",
    location: "Khalifa Tennis Complex, Doha",
    startDate: "01 Oct 2026",
    minLicense: "ITF Level 2 / PTR Professional",
    minExperienceYears: 3,
    languages: ["English"],
    salarySample: "QAR 18,000 - 24,000 / month (Sample)",
    publishedDate: "1 week ago",
    requirements: [
      "ITF Level 2 or equivalent national tennis federation license",
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
    club: "Hamad Aquatics Academy (Sample)",
    title: "Junior Competitive Swimming Coach",
    sport: "Swimming",
    ageGroup: "7–12",
    contractType: "Full-time",
    location: "Aspire Zone, Doha",
    startDate: "15 Sep 2026",
    minLicense: "World Aquatics Level 2 / ASCA 3",
    minExperienceYears: 5,
    languages: ["English", "Arabic"],
    salarySample: "QAR 20,000 - 26,000 / month (Sample)",
    publishedDate: "3 days ago",
    requirements: [
      "World Aquatics Level 2 coach certification",
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
      licenseChecked: "AFC 'B' License (QFA registry valid through 2027)",
      policeClearance: "Good Conduct Certificate (Ministry of Interior Qatar, Jan 2026)",
      safeguarding: "SafeSport International Child Protection in Athletics (Level 2)",
      firstAid: "Qatar Red Crescent Pediatric First Aid & AED (Expires Nov 2027)",
      authority: "Qatar Football Association & Ministry of Youth and Sports",
      verifiedDate: "12 Jan 2024",
      accreditations: ["AFC 'B' License", "UEFA Grassroots Diploma", "SafeSport Certified"],
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
      { period: "2021 – Present", role: "Lead U11 Coach", organization: "Al Duhail SC Youth Academy (Sample)", details: "Coaching technical mastery and match tactical awareness for 24 elite junior players." },
      { period: "2018 – 2021", role: "Junior Grassroots Coordinator", organization: "Qatar Sports Club (Sample)", details: "Designed grassroots curriculum for ages 6–10; increased academy retention by 35%." }
    ],
    languages: ["Arabic (Native)", "English (Fluent)"],
    availability: "Weekdays 15:30 – 19:30, Saturdays 08:30 – 13:00",
    preferredRoles: ["Head Youth Coach", "Private Technical Specialist"],
    bio: "Dedicated youth development coach with 8+ years specializing in technical foundations, spatial cognition, and character building for young footballers aged 7 to 12. Committed to safe, positive, and structured athletic growth.",
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
      licenseChecked: "AFC 'C' License & FIFA Grassroots",
      policeClearance: "Ministry of Interior Qatar Clearance (Feb 2026)",
      safeguarding: "Child Safeguarding in Sport Certified",
      firstAid: "Valid Red Crescent First Aid",
      authority: "Qatar Football Association",
      verifiedDate: "04 Feb 2024",
      accreditations: ["AFC 'C' License", "FIFA Grassroots", "SafeSport Certified"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "AFC 'C' License", issuer: "QFA", status: "Verified", year: "2023" },
      { title: "FIFA Youth Grassroots Certificate", issuer: "FIFA", status: "Verified", year: "2021" },
      { title: "Child Safeguarding in Sport", issuer: "SafeSport", status: "Verified", year: "2024" }
    ],
    experience: [
      { period: "2022 – Present", role: "Junior Skills Coach", organization: "Al Sadd Foundation (Sample)", details: "1-on-1 dribbling, first touch, and speed agility drills." }
    ],
    languages: ["Arabic", "English", "French"],
    availability: "Sundays, Tuesdays, Thursdays, Saturdays",
    preferredRoles: ["Private Skills Coach", "Grassroots Instructor"],
    bio: "Energetic and patient coach focused on boosting young players' dribbling, footwork, balance, and game confidence through fun, repetitive drills.",
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
    location: "Al Rayyan, Qatar",
    sessionFormats: ["In person"],
    pricePerSessionQar: 320,
    profileCompleteness: 95,
    verified: true,
    verificationDetails: {
      idChecked: "Qatar Residence Permit verified",
      licenseNumber: "UEFA-A-2019-092",
      licenseChecked: "UEFA 'A' Youth License verified by FFF & QFA",
      policeClearance: "Interpol & Qatar MOI verified",
      safeguarding: "Advanced Child Protection Certificate",
      firstAid: "Sports Trauma & First Aid Level 3",
      authority: "French Football Federation & QFA",
      verifiedDate: "19 Nov 2023",
      accreditations: ["UEFA 'A' Youth", "UEFA GK 'B'", "IOC Safeguarding"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "UEFA 'A' Youth License", issuer: "French Football Federation", status: "Verified", year: "2019" },
      { title: "UEFA Goalkeeping B", issuer: "FFF", status: "Verified", year: "2021" },
      { title: "Advanced Safeguarding in Youth Sport", issuer: "UNICEF / IOC", status: "Verified", year: "2023" }
    ],
    experience: [
      { period: "2020 – Present", role: "Head of U12 Academy", organization: "Al Rayyan SC (Sample)", details: "Overarching technical curriculum design and match analysis." }
    ],
    languages: ["French (Native)", "Arabic", "English"],
    availability: "Monday – Thursday afternoons",
    preferredRoles: ["Head Youth Coach", "Technical Director"],
    bio: "Over 12 years in European and Gulf professional academies developing tactical IQ, decision making under pressure, and elite habits.",
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
      licenseChecked: "World Aquatics Level 2 Coach verified",
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
      licenseChecked: "ITF Level 2 Performance Coach",
      policeClearance: "Qatar MOI Clearance (Nov 2025)",
      safeguarding: "LTA Child Protection & Safeguarding",
      firstAid: "CPR & AED Certified",
      authority: "International Tennis Federation & QTF",
      verifiedDate: "18 Aug 2023",
      accreditations: ["ITF Level 2", "PTR Professional", "Child Protection LTA"],
      safeguardingClearance: "Child Protection Clearance Active"
    },
    licenses: [
      { title: "ITF Level 2 Coach", issuer: "International Tennis Federation", status: "Verified", year: "2022" },
      { title: "PTR Professional Junior Development", issuer: "PTR", status: "Verified", year: "2021" }
    ],
    experience: [
      { period: "2022 – Present", role: "Junior Head Pro", organization: "Oasis Tennis Club Doha (Sample)", details: "Red/Orange/Green ball progressions and tournament preparation." }
    ],
    languages: ["English"],
    availability: "Mondays, Wednesdays, Saturdays",
    preferredRoles: ["Private Tennis Coach", "Academy Lead"],
    bio: "Specialized in progressive ball and court sizes for young juniors to develop smooth stroke mechanics and court movement.",
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
    location: "Pitch 2, Al Duhail Grounds, Doha",
    surface: "FIFA Pro Synthetic Turf",
    isAvailable: true
  },
  {
    id: "slot-2",
    day: "Tuesday",
    time: "17:45 – 18:45",
    location: "Pitch 2, Al Duhail Grounds, Doha",
    surface: "FIFA Pro Synthetic Turf",
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
    surface: "FIFA Pro Synthetic Turf (Shaded)",
    isAvailable: true
  },
  {
    id: "slot-6",
    day: "Saturday",
    time: "10:15 – 11:15",
    location: "Aspire Outdoor Turf 3, Aspire Zone",
    surface: "FIFA Pro Synthetic Turf (Shaded)",
    isAvailable: true
  }
];
