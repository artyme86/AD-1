/**
 * Registration Taxonomy Data for Athlete Directory
 * Cleaned and standardized for international & Qatar sports ecosystem.
 */

export interface FacilityTypeOption {
  label: string;
  required: boolean;
  options: Record<string, string[]>;
}

export interface OrganizationTypeOption {
  label: string;
  required: boolean;
  options: Record<string, string[]>;
}

export interface ApparelAndEquipmentOption {
  label: string;
  required: boolean;
  options: Record<string, string[]>;
}

export interface SportsRelatedServicesOption {
  label: string;
  required: boolean;
  options: Record<string, string[]>;
}

export const LISTING_TYPES = [
  'Sports Professional',
  'Sports Corporation'
] as const;

export type ListingType = (typeof LISTING_TYPES)[number];

export const PROFESSIONAL_TYPES = [
  'Coaching-Training',
  'Athletic Health Specialists',
  'Sports Media Specialists',
  'Sports Management'
] as const;

export type ProfessionalType = (typeof PROFESSIONAL_TYPES)[number];

export const POSITIONS_BY_PROFESSIONAL_TYPE: Record<ProfessionalType, string[]> = {
  'Coaching-Training': [
    'Athletic Coach',
    'Team Sports Coach',
    'Individual Sports Coach',
    'Performance Coach',
    'Athletic Trainer',
    'Performance Enhancement Specialist',
    'Sports Medicine Specialists',
    'Rehabilitation Specialists',
    'Athletic Performance Analyst',
    'Biomechanists',
    'Sport Scientists',
    'Sport Psychologists',
    'Data Analysts',
    'Other'
  ],
  'Athletic Health Specialists': [
    'Orthopedic Surgeon',
    'Joint replacement surgeon',
    'Sports medicine surgeon',
    'Arthroscopic surgeon',
    'Trauma surgeon',
    'Physical Therapist',
    'Orthopedic physical therapist',
    'Pediatric physical therapist',
    'Geriatric physical therapist',
    'Neurological physical therapist',
    "Women's health physical therapist",
    'Hand therapist',
    'Vestibular therapist',
    'Cardiac rehab physical therapist',
    'Athletic Trainer',
    'Rehabilitation athletic trainer',
    'Performance enhancement athletic trainer',
    'Emergency care athletic trainer',
    'Sports Nutritionist',
    'Sports dietitian',
    'Performance nutritionist',
    'Clinical sports dietitian',
    'Sports Psychologist',
    'Sports performance psychologist',
    'Clinical sports psychologist',
    'Rehabilitation sports psychologist',
    'Sports Massage Therapist',
    'Sports injury massage therapist',
    'Performance enhancement massage therapist',
    'Relaxation and stress reduction massage therapist',
    'Medical massage therapist',
    'Sports Chiropractor',
    'Sports Acupuncturist',
    'Sports Optometrist',
    'Sports Podiatrist',
    'Other'
  ],
  'Sports Media Specialists': [
    'Sports Broadcaster',
    'Play-by-play announcer',
    'Color commentator',
    'Sideline reporter',
    'Studio host',
    'Radio host',
    'Podcast host',
    'Sports Journalist',
    'Print journalist',
    'Television journalist',
    'Radio journalist',
    'Online journalist',
    'Feature writer',
    'Columnist',
    'Investigative reporter',
    'Sports photographer',
    'Sports videographer',
    'Graphic designer',
    'Sports Marketing and Public Relations Specialist',
    'Brand manager',
    'Sponsorship sales',
    'Event coordinator',
    'Social media manager',
    'Media relations specialist',
    'Marketing research specialist',
    'Crisis communication specialist',
    'Sports Data Analyst',
    'Data scientist',
    'Data analyst',
    'Data engineer',
    'Predictive modeler',
    'Data visualization specialist',
    'Sports Digital Media Specialist',
    'Other'
  ],
  'Sports Management': [
    'Athletic Director',
    'High School Athletic Director',
    'College Athletic Director',
    'Professional Sports Team Athletic Director',
    'Recreational facility Athletic Director',
    'Sports Agent',
    'Certified contract advisor',
    'Agent for professional athlete',
    'Agent for amateur athlete',
    'Sports marketing agent',
    'Sports Publicist-Corporate publicist',
    'Sports Publicist-Celebrity publicist',
    'Sports publicist',
    'Sports Event Manager',
    'Professional sports event manager',
    'College sports event manager',
    'High school sports event manager',
    'Amateur sports event manager',
    'Corporate sports event manager',
    'Special event manager',
    'Sports Facility Manager',
    'Arena manager',
    'Stadium manager',
    'Recreational facility manager',
    'Sports club manager',
    'Sports Marketer-Product manager',
    'Sports Marketer-Sponsorship manager',
    'Sports Marketer-Event marketer',
    'Sports Marketer-Digital marketer',
    'Sports market researcher',
    'Referee, Umpire, and Official',
    'Sports Administrator-Sports Club',
    'Sports Administrator-Sports Federation',
    'Sports Administrator-League',
    'Other'
  ]
};

// Sports list: "Soccer" merged into "Football", no concert/convention venues
export const SPORTS: string[] = [
  'Aerobic and Cardio',
  'All Sports',
  'Archery',
  'Australian Football',
  'Auto Racing',
  'Badminton',
  'Ballooning',
  'Barre',
  'Baseball',
  'Basketball',
  'Beach Volleyball',
  'Biathlon',
  'Billiards',
  'Boating',
  'Bobsleigh',
  'Bocce Ball',
  'Bodybuilding',
  'Boomerang',
  'Bowling',
  'Bowling Ten Pin',
  'Boxing',
  'Bull Fighting',
  'Caber Toss',
  'Canoeing',
  'Cheerleading',
  'Cricket',
  'Croquet',
  'Cross Country Running',
  'Cross Country Skiing',
  'CrossFit',
  'Curling',
  'Cycling',
  'Dance',
  'Dance Squad',
  'Darts',
  'Discus',
  'Diving',
  'DodgeBall',
  'Dog Sledding',
  'Drone Racing',
  'Equestrian',
  'Esports',
  'Fencing',
  'Field Hockey',
  'Figure Skating',
  'Fishing',
  'Fitness Training',
  'Floorball',
  'Football',
  'Frisbee',
  'Futsal',
  'Gaelic Football',
  'Go Karting',
  'Golf',
  'Gymnastics',
  'Hammer Throw',
  'Handball',
  'Hang Gliding',
  'High Jump',
  'Hiking',
  'Horse Back Riding',
  'Hunting',
  'Hurdling',
  'Hurling',
  'Ice Hockey',
  'Ice Skating',
  'Inline Hockey',
  'Inline Skating',
  'Jai Alai',
  'Javelin',
  'Jet Skiing',
  'Jiu Jitsu',
  'Jogging',
  'Judo',
  'Karate',
  'Kayaking',
  'Kendo',
  'Kick Boxing',
  'Kickball',
  'Kickboxing',
  'Kite Flying',
  'Kung Fu',
  'Lacrosse',
  'Lawn Bowling',
  'Long Jump',
  'Luge',
  'Lumberjack Sports',
  'Martial Arts',
  'Mental Preparation',
  'MMA',
  'Motor Cycle Racing',
  'Motor Sports',
  'Mountain Biking',
  'Mountaineering',
  'Netball',
  'Nutrition',
  'Orienteering',
  'Paddle Ball',
  'Paintball',
  'Paragliding',
  'Pentathlon',
  'Pep Squad',
  'Personal Training',
  'Physical Therapy',
  'Pickleball',
  'Pilates',
  'Ping Pong',
  'Poker',
  'Pole Vaulting',
  'Polo',
  'Powerlifting',
  'Professional Wrestling',
  'Racewalking',
  'Racquetball',
  'Rock Climbing',
  'Rodeo',
  'Roller derby',
  'Roller Hockey',
  'Roller Skating',
  'Roping',
  'Rounders',
  'Rowing',
  'Rugby',
  'Running',
  'Sailing',
  'Scuba Diving',
  'Shinty',
  'Shooting',
  'Shot Put',
  'Shuffleboard',
  'Skateboarding',
  'Skeet Shooting',
  'Skeleton',
  'Ski Jumping',
  'Skiing',
  'Skydiving',
  'Snooker',
  'Snorkling',
  'Snow Boarding',
  'Softball',
  'Speed skating',
  'Speed Training',
  'Spinning',
  'Squash',
  'Strongman',
  'Sumo Wrestling',
  'Surfing',
  'Swimming',
  'Synchronized Swimming',
  'Table Tennis',
  'Tae Kwon Do',
  'Tai Chi',
  'Target Shooting',
  'Tennis',
  'Tobogganing',
  'Track and Field',
  'Trampolining',
  'Triathlon',
  'Volleyball',
  'Wakeboarding',
  'Water Aerobics',
  'Water Polo',
  'Water Skiing',
  'Weight Training',
  'Weightlifting',
  'White Water Rafting',
  'Wrestling',
  'Yacht Racing',
  'Yoga',
  'Other'
];

export const COUNTRIES: string[] = [
  'Qatar',
  'Saudi Arabia',
  'United Arab Emirates',
  'Kuwait',
  'Bahrain',
  'Oman',
  'United Kingdom',
  'France',
  'Germany',
  'Spain',
  'Italy',
  'Netherlands',
  'Australia',
  'United States',
  'Canada',
  'Japan',
  'South Korea',
  'Singapore',
  'South Africa',
  'Brazil',
  'Argentina',
  'Morocco',
  'Egypt',
  'Tunisia',
  'Algeria',
  'Jordan',
  'Lebanon',
  'Turkey',
  'India',
  'Pakistan',
  'Afghanistan',
  'Albania',
  'Andorra',
  'Angola',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Bangladesh',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Chile',
  'China',
  'Colombia',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'Georgia',
  'Ghana',
  'Greece',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'Indonesia',
  'Iraq',
  'Ireland',
  'Kenya',
  'Malaysia',
  'Mexico',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Senegal',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Ukraine',
  'Uruguay',
  'Uzbekistan',
  'Vietnam',
  'Other'
];

export const NATIONALITIES: string[] = [
  'Qatari',
  'Saudi',
  'Emirati',
  'Kuwaiti',
  'Bahraini',
  'Omani',
  'British',
  'French',
  'German',
  'Spanish',
  'Italian',
  'Dutch',
  'Australian',
  'American',
  'Canadian',
  'Japanese',
  'South Korean',
  'Singaporean',
  'South African',
  'Brazilian',
  'Argentine',
  'Moroccan',
  'Egyptian',
  'Tunisian',
  'Algerian',
  'Jordanian',
  'Lebanese',
  'Turkish',
  'Indian',
  'Pakistani',
  'Austrian',
  'Belgian',
  'Croatian',
  'Czech',
  'Danish',
  'Finnish',
  'Greek',
  'Hungarian',
  'Irish',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Serbian',
  'Swedish',
  'Swiss',
  'Ukrainian',
  'Other'
];

export const GENDERS = ['Male', 'Female', 'Prefer not to say'] as const;

export const CORPORATION_TYPES = [
  'Athletic Health Services',
  'Sports Facilities',
  'Sports organizations',
  'Sports Apparel and Equipment',
  'Sports-related Services'
] as const;

export type CorporationType = (typeof CORPORATION_TYPES)[number];

export const ATHLETIC_HEALTH_SERVICES: string[] = [
  'Sports Medicine Clinics (e.g. orthopedic clinics, sports rehabilitation centers)',
  'Physical Therapy Clinics (e.g. physical therapy centers, rehabilitation clinics)',
  'Rehabilitation Centers (e.g. sports injury rehabilitation centers, post-surgery rehabilitation centers)',
  'Sports Performance Training Centers (e.g. strength and conditioning centers, speed and agility training centers)',
  'Sports Psychology Services (e.g. sports performance counseling, mental health counseling)',
  'Sports Nutrition Services (e.g. sports dietitians, sports nutrition consultants, sports supplements providers)',
  'Sports Massage Therapy Services (e.g. sports massage therapy centers, mobile sports massage therapists)',
  'Sports Chiropractic Services (e.g. sports chiropractic clinics, mobile sports chiropractors)',
  'Sports Acupuncture Services (e.g. sports acupuncture clinics, mobile sports acupuncturists)',
  'Sports Orthopedic Services (e.g. sports orthopedic clinics, mobile sports orthopedic surgeons)',
  'Sports Optometry Services (e.g. sports vision clinics, sports vision therapists)',
  'Sports podiatry services (e.g. sports podiatry clinics, sports podiatrists)',
  'Sports Dental Services (e.g. sports dentistry clinics, sports dentists)',
  'Sports Concussion Management Services (e.g. sports concussion clinics, sports concussion management experts)',
  'Sports Physical Therapy Services (e.g. sports physical therapy clinics, sports physical therapists)',
  'Sports Cardiology Services (e.g. sports cardiology clinics, sports cardiologists)',
  'Other'
];

// Cleaned facility types: "Concert Venues" and "Convention Centers" replaced with "Events and exhibition venues"
export const FACILITY_TYPES: FacilityTypeOption = {
  label: 'Select your facility type',
  required: true,
  options: {
    'Athletic Fields and Courts': [
      'Football (Grass, Artificial Turf)',
      'Baseball',
      'Basketball',
      'Ice Hockey',
      'Volleyball',
      'Athletics (track and field, cross country)',
      'Events and exhibition venues',
      'Other'
    ],
    'Sports Arenas and Stadiums': [
      'Football Stadiums',
      'Baseball / Cricket',
      'Basketball Arenas',
      'Rugby',
      'Lacrosse',
      'Field Hockey',
      'Tennis Arenas',
      'Volleyball Courts',
      'Athletics (track and field, cross country)',
      'Golf Courses',
      'Horseback Riding & Equestrian',
      'Other'
    ],
    'Training Centers and Gyms': [
      'Strength and Conditioning',
      'Cardio Training',
      'Martial Arts (Judo, Karate, Taekwondo, Wrestling)',
      'Gymnastics (Artistic gymnastics, rhythmic gymnastics, trampoline, acrobatic gymnastics)',
      'Dance (Ballet, Jazz, Tap, Hip-Hop)',
      'Yoga',
      'Pilates',
      'CrossFit',
      'Boxing',
      'Kickboxing',
      'MMA',
      'Other'
    ],
    'Indoor and Outdoor Sports Complexes': [
      'Swimming (indoor and outdoor pools)',
      'Diving (indoor and outdoor diving boards and platforms)',
      'Ice Skating (indoor and outdoor ice rinks)',
      'Roller Skating (indoor and outdoor roller rinks)',
      'Skateboarding (indoor and outdoor skateparks)',
      'BMX (indoor and outdoor BMX parks)',
      'Rock Climbing (indoor and outdoor climbing walls)',
      'Paintball (indoor and outdoor paintball fields)',
      'Trampoline park (indoor and outdoor trampoline parks)',
      'Adventure sports (indoor and outdoor high ropes courses, zip lines, obstacle courses)',
      'Other'
    ],
    Other: ['General Multi-Use Facility', 'Other']
  }
};

// Cleaned organization types: US-only leagues dropped, IAAF replaced by World Athletics, international quality specifications
export const ORGANIZATION_TYPES: OrganizationTypeOption = {
  label: 'Select your Sports Organization Type',
  required: true,
  options: {
    'Professional Sports Leagues': [
      'Football (Premier League, La Liga, Serie A, Ligue 1, Bundesliga, Regional Leagues)',
      'Rugby (Premiership Rugby, Top 14, Super Rugby)',
      'Cricket (IPL, Big Bash League, County Cricket, PSL)',
      'Tennis (ATP, WTA Tours)',
      'Golf (European Tour, Asian Tour)',
      'Horse Racing (International Cups)',
      'Other'
    ],
    'National and International Sports Federations': [
      'Football (UEFA, AFC, CAF, CONMEBOL)',
      'Basketball (FIBA)',
      'Ice Hockey (IIHF)',
      'Rugby (World Rugby)',
      'Cricket (ICC)',
      'Tennis (ITF)',
      'Athletics (World Athletics)',
      'Aquatics (World Aquatics)',
      'Olympic and Paralympic (IOC, IPC)',
      'Other'
    ],
    'Sports Governing Bodies': [
      'Football (National Football Associations)',
      'Basketball (National Basketball Federations)',
      'Rugby (National Rugby Unions)',
      'Cricket (National Cricket Boards)',
      'Tennis (National Tennis Associations)',
      'Athletics (National Athletics Federations)',
      'Other'
    ],
    'Sports Event Organizers': [
      'Olympic Games Organizers',
      'World Championships Committees',
      'Continental Games Organizers',
      'Tour de France',
      'Wimbledon & Grand Slam Tournaments',
      'World Athletics Championships',
      'World Aquatics Championships',
      'Other'
    ],
    'Sports Non-Profit Organizations': [
      'Special Olympics',
      'Paralympics',
      'Youth Sports Programs & Foundations',
      'Other'
    ],
    Other: ['National Sports Committee', 'Sports Charity', 'Other']
  }
};

export const APPAREL_AND_EQUIPMENT: ApparelAndEquipmentOption = {
  label: 'Select your apparel and equipment type',
  required: true,
  options: {
    'Athletic Apparel': [
      'Sports Clothing (Uniforms, Jerseys, Training wear)',
      'Sports Footwear (Running shoes, Cleats, Court shoes)',
      'Sports Accessories (Socks, Headbands, Timepieces)',
      'Sports Bags (Backpacks, Duffel bags, Equipment bags)',
      'Sports Eyewear (Sunglasses, Goggles, Safety glasses)',
      'Other'
    ],
    'Sports Equipment': [
      'Team Sports Equipment (Balls, Goals, Training cones)',
      'Individual Sports Equipment (Racquets, Clubs, Sticks)',
      'Outdoor Sports Equipment (Camping gear, Trekking gear)',
      'Fitness Equipment (Treadmills, Weights, Benches, Resistance units)',
      'Protective Equipment (Helmets, Pads, Mouthguards)',
      'Other'
    ],
    'Sports Technology': [
      'Wearable Technology (Heart rate monitors, GPS trackers)',
      'Sports Analytics and Data Systems (Video analysis, timing systems)',
      'Other'
    ],
    'Sports Venue and Event Equipment': [
      'Scoreboards, Timing, and Scoring Systems',
      'Lighting and Sound Systems',
      'Sports Turf and Artificial Surfaces',
      'Stadium Seating and Bleachers',
      'Sports Venue Safety and Security Systems',
      'Sports Venue Concession and Retail Equipment',
      'Other'
    ],
    Other: ['Sports Merchandising', 'Custom Hardware', 'Other']
  }
};

export const SPORTS_RELATED_SERVICES: SportsRelatedServicesOption = {
  label: 'Select your Sports-related Services',
  required: true,
  options: {
    'Sports Event Management': [
      'Event Planning',
      'Event Marketing',
      'Event Operations',
      'Ticketing and Box Office Services',
      'Venue and Facility Management',
      'Event Security and Safety',
      'Other'
    ],
    'Sports Marketing and Advertising': [
      'Sponsorship Sales',
      'Branding and Identity',
      'Digital Marketing',
      'Social Media Marketing',
      'Content Marketing',
      'Media Buying',
      'Other'
    ],
    'Sports Media and Broadcasting': [
      'Television and Radio Broadcasting',
      'Live Streaming',
      'Video Production',
      'Photography',
      'Graphic Design',
      'Motion Graphics',
      'Other'
    ],
    'Sports Data and Analytics': [
      'Data Collection',
      'Data Analysis',
      'Data Visualization',
      'Predictive Analytics',
      'Sports Intelligence',
      'Other'
    ],
    'Sports Consultancy': [
      'Sports Law',
      'Sports Business Management',
      'Sports Economics',
      'Sports Psychology',
      'Sports Performance Analysis',
      'Sports Sponsorship',
      'Other'
    ],
    Other: ['Sports Travel & Logistics', 'Catering & Hospitality', 'Other']
  }
};

export const SERVICE_PREFERENCES = {
  athleteSkillLevel: [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Professional',
    'Paralympic'
  ],
  ageGroups: [
    'All Ages',
    'Toddler (0-4)',
    'Child (5-9)',
    'Preteen (10-12)',
    'Adolescent (13-17)',
    'Collegiate (18-22)',
    'Adult',
    'Seniors'
  ],
  servicesOfferedToGender: ['Any', 'Male', 'Female'] as const,
  deliveryFormats: [
    'In-Person Group',
    'Online Group',
    'In-Person Private',
    'Online Private',
    'In-Person Team',
    'Online Team'
  ]
};

export const EDUCATION_TYPES = [
  'Degree',
  'Certification',
  'Award',
  'Accomplishment'
] as const;

export type EducationType = (typeof EDUCATION_TYPES)[number];

export const SOCIAL_PLATFORMS = [
  'LinkedIn',
  'Facebook',
  'Instagram',
  'YouTube',
  'X (Twitter)',
  'Other'
] as const;

export const SERVING_REGIONS = [
  'Doha Central',
  'West Bay & Diplomatic Area',
  'The Pearl & Lusail',
  'Al Rayyan & Education City',
  'Al Wakrah & South',
  'Al Khor & North',
  'All Qatar Regions',
  'International / Remote'
];
