export type UserRole = 'creator' | 'agency' | 'business' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  handle: string;
  avatar: string;
  role: UserRole;
  brand?: {
    name: string;
    product: string;
    metrics: {
      unitsSold: number;
      revenue: number;
      profitMargin: number;
    };
    inventory: {
      stock: number;
      status: string;
    };
  };
}

export interface AgencyClient {
  id: number;
  name: string;
  avatar: string;
  totalFollowers: number;
  monthlyRevenue: number;
  activeCampaigns: number;
  status: 'Active' | 'Onboarding' | 'Inactive';
}

export interface Campaign {
  id: number;
  name: string;
  creator: string;
  budget: number;
  spend: number;
  roi: number;
  status: 'Active' | 'Completed' | 'Paused';
}

export interface TalentMember {
  id: number;
  name: string;
  role: 'editor' | 'manager' | 'designer' | 'strategist';
  specialty: string;
  rate: string;
  rating: number;
  reviews: number;
  avatar: string;
  bio: string;
}

export interface ContentTask {
  id: string;
  title: string;
  status: 'idea' | 'scripting' | 'filming' | 'editing' | 'published';
}