import { User, AgencyClient, Campaign, TalentMember, ContentTask } from '@/types/auth';

// Export the mock data and functions individually for better tree-shaking

const USER_PROFILES = {
  creator: {
    id: '1',
    name: 'Alex "Apex" Miller',
    handle: '@ApexMiller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    brand: {
      name: "Apex Gaming Gear",
      product: "Stealth Pro Mousepad",
      metrics: { unitsSold: 12530, revenue: 375900, profitMargin: 0.35 },
      inventory: { stock: 2500, status: "Low" }
    }
  },
  agency: {
    id: '2',
    name: 'Nexus Media Group',
    handle: 'Agency Account',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center&auto=format'
  },
  business: {
    id: '3',
    name: 'Synth Co.',
    handle: 'Brand Partner',
    avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center&auto=format'
  }
};

export const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin': {
    username: 'admin',
    password: 'admin',
    role: 'creator', // Default role, will be overridden
    ...USER_PROFILES.creator
  }
};

export const AGENCY_CLIENTS: AgencyClient[] = [
  {
    id: 1,
    name: 'Alex "Apex" Miller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    totalFollowers: 46600000,
    monthlyRevenue: 82000,
    activeCampaigns: 2,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Ben "Digital Nomad" Carter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    totalFollowers: 5200000,
    monthlyRevenue: 25000,
    activeCampaigns: 1,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Chloe "Style Maven" Davis',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b7022?w=100&h=100&fit=crop&crop=face&auto=format',
    totalFollowers: 12300000,
    monthlyRevenue: 45000,
    activeCampaigns: 3,
    status: 'Onboarding'
  }
];

export const BUSINESS_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'SynthWave Earbuds Launch',
    creator: 'Alex "Apex" Miller',
    budget: 50000,
    spend: 35000,
    roi: 2.5,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Summer Collection Showcase',
    creator: 'Chloe "Style Maven" Davis',
    budget: 75000,
    spend: 75000,
    roi: 3.1,
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Productivity Suite Promo',
    creator: 'Ben "Digital Nomad" Carter',
    budget: 25000,
    spend: 10000,
    roi: 1.8,
    status: 'Active'
  }
];

export const TALENT_NETWORK: TalentMember[] = [
  {
    id: 1,
    name: 'Alex Costa',
    role: 'editor',
    specialty: 'Viral Video Editor',
    rate: '$150/hr',
    rating: 5,
    reviews: 120,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    bio: 'Expert in fast-paced, high-retention editing for YouTube and TikTok. Specializes in gaming content.'
  },
  {
    id: 2,
    name: 'Jenna Martinez',
    role: 'manager',
    specialty: 'Brand Deal Negotiation',
    rate: '15% of deals',
    rating: 5,
    reviews: 45,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b7022?w=100&h=100&fit=crop&crop=face&auto=format',
    bio: 'Proven track record of securing six-figure brand deals with top-tier companies.'
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    role: 'designer',
    specialty: 'Brand Identity & Graphics',
    rate: '$200/hr',
    rating: 4.9,
    reviews: 89,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    bio: 'Creates stunning visual identities and graphics that convert. Gaming and tech specialist.'
  }
];

export const CONTENT_PIPELINE: Record<string, ContentTask[]> = {
  'idea': [
    { id: 'task-1', title: 'Video: "I Survived 24 Hours in a Smart House"', status: 'idea' }
  ],
  'scripting': [
    { id: 'task-2', title: 'Video: "Building the Ultimate Gaming Setup"', status: 'scripting' }
  ],
  'filming': [
    { id: 'task-3', title: 'Video: "Testing $10 vs $1000 Gaming Peripherals"', status: 'filming' }
  ],
  'editing': [
    { id: 'task-4', title: 'Video: "Building a PC with only Wish.com parts"', status: 'editing' }
  ],
  'published': [
    { id: 'task-5', title: 'Video: "My Honest Review of the New Meta Quest"', status: 'published' }
  ]
};

export function authenticateUser(username: string, password: string, role: string): User | null {
  const user = MOCK_USERS[username];
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    const profile = USER_PROFILES[role as keyof typeof USER_PROFILES];
    return {
      ...userWithoutPassword,
      ...profile,
      role: role as any,
      username
    };
  }
  return null;
}