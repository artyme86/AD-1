/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// User identity and authentication account.
export interface Account {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Institutional entity such as a club, facility developer, supplier, academy, federation, or research center.
export interface Organization {
  id: string;
  name: string;
  category: 'club' | 'developer' | 'supplier' | 'academy' | 'federation' | 'university' | 'corporate';
  commercialRegistrationNumber?: string;
  location: string;
  verified: boolean;
  createdAt: string;
}

// Associative entity linking an Account to an Organization with an assigned administrative or operational role.
export interface Membership {
  id: string;
  accountId: string;
  organizationId: string;
  role: 'owner' | 'admin' | 'manager' | 'procurement' | 'member';
  joinedAt: string;
}

// Public practitioner, coach, or organizational profile containing professional bio and verification details.
export interface Profile {
  id: string;
  accountId: string;
  displayName: string;
  title: string;
  bio?: string;
  avatarUrl?: string;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
}

// Verified accreditation, coaching license, police clearance, or safeguarding certificate with audit status.
export interface Credential {
  id: string;
  profileId: string;
  type: string;
  issuer: string;
  credentialNumber?: string;
  issuedDate?: string;
  expiryDate?: string;
  status: 'pending' | 'verified' | 'expired';
}

// Bookable offering, facility rental slot, clinic, or specialized coaching service catalog entry.
export interface Service {
  id: string;
  providerId: string;
  providerType: 'organization' | 'profile';
  title: string;
  description: string;
  category: string;
  priceQar?: number;
  durationMinutes?: number;
  location: string;
}

// Unified demand-side record for tenders, vacancies, coaching sessions, academic studies, or testing requests.
export interface Request {
  id: string;
  type: 'tender' | 'vacancy' | 'session' | 'study' | 'testing';
  creatorId: string;
  creatorType: 'account' | 'organization';
  title: string;
  requirements: string[];
  deadline?: string;
  status: 'draft' | 'open' | 'under_review' | 'awarded' | 'closed' | 'cancelled';
  createdAt: string;
}

// Supply-side fulfillment proposal or application linked directly to a single Request.
export interface Response {
  id: string;
  requestId: string;
  respondentId: string;
  respondentType: 'account' | 'organization';
  type: 'bid' | 'application' | 'acceptance' | 'quote' | 'offer';
  status: 'submitted' | 'shortlisted' | 'accepted' | 'declined' | 'withdrawn';
  priceQar?: number;
  details?: Record<string, unknown>;
  submittedAt: string;
}

// Binding engagement linking an awarded Request to its accepted Response with step-by-step lifecycle status.
export interface Agreement {
  id: string;
  requestId: string;
  responseId: string;
  status: 'draft' | 'pending_signatures' | 'active' | 'in_progress' | 'completed' | 'terminated';
  stepStatus: string;
  effectiveDate: string;
  completionDate?: string;
}

// Minimal youth or affiliated athlete record linked to a primary guardian Account.
export interface Dependent {
  id: string;
  guardianAccountId: string;
  fullName: string;
  dateOfBirth?: string;
  ageYears?: number;
  sport: string;
  skillLevel?: string;
}

// Repeatable registration form data models
export interface SocialLinkEntry {
  id: string;
  platform: string;
  url: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface DegreeEntry {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  graduationYear: string;
  description: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuingBody: string;
  year: string;
  certificateFileName?: string;
  status: 'Pending verification' | 'Verified';
}

export interface AwardEntry {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface AccomplishmentEntry {
  id: string;
  year: string;
  description: string;
}

export interface WorkExperienceEntry {
  id: string;
  title: string;
  companyOrClub: string;
  currentlyWorkingHere: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

// Registration Draft State across the 8-step wizard
export interface RegistrationDraft {
  step: number;
  listingType: 'Sports Professional' | 'Sports Corporation' | '';
  // R2
  professionalType: string;
  corporationType: string;
  // R3
  firstName: string;
  lastName: string;
  country: string;
  nationality: string;
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';
  bio: string;
  hideDemographicsOnPublicProfile: boolean;
  corporationTitle: string;
  tagline: string;
  description: string;
  registeredCity: string;
  // R4
  email: string;
  phone: string;
  whatsapp: string;
  whatsappSameAsPhone: boolean;
  website: string;
  locationServingAreas: string[];
  socialLinks: SocialLinkEntry[];
  // R5
  position: string;
  sport: string;
  specialty: string;
  cvFileName: string;
  primaryCategory: string;
  secondaryCategory: string;
  customCategory: string;
  serviceTools: string[];
  // R6
  athleteSkillLevels: string[];
  ageGroups: string[];
  genderServed: 'Any' | 'Male' | 'Female';
  deliveryFormats: string[];
  languages: LanguageEntry[];
  // R7
  degrees: DegreeEntry[];
  certifications: CertificationEntry[];
  awards: AwardEntry[];
  accomplishments: AccomplishmentEntry[];
  workExperience: WorkExperienceEntry[];
  // R8
  profilePictureUrl: string;
  galleryImages: string[];
  agreeTerms: boolean;
}

// Initial pristine registration draft state
export const INITIAL_REGISTRATION_DRAFT: RegistrationDraft = {
  step: 1,
  listingType: '',
  professionalType: '',
  corporationType: '',
  firstName: '',
  lastName: '',
  country: 'Qatar',
  nationality: 'Qatari',
  gender: '',
  bio: '',
  hideDemographicsOnPublicProfile: false,
  corporationTitle: '',
  tagline: '',
  description: '',
  registeredCity: 'Doha',
  email: '',
  phone: '',
  whatsapp: '',
  whatsappSameAsPhone: true,
  website: '',
  locationServingAreas: ['Doha Central'],
  socialLinks: [],
  position: '',
  sport: 'Football',
  specialty: '',
  cvFileName: '',
  primaryCategory: '',
  secondaryCategory: '',
  customCategory: '',
  serviceTools: [],
  athleteSkillLevels: ['All Levels'],
  ageGroups: ['All Ages'],
  genderServed: 'Any',
  deliveryFormats: ['In-Person Private'],
  languages: [{ id: 'lang-1', language: 'Arabic', proficiency: 'Native' }, { id: 'lang-2', language: 'English', proficiency: 'Fluent' }],
  degrees: [],
  certifications: [],
  awards: [],
  accomplishments: [],
  workExperience: [],
  profilePictureUrl: '',
  galleryImages: [],
  agreeTerms: false
};

