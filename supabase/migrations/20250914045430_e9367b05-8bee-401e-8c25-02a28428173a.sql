-- Create talents table for talent registration
CREATE TABLE public.talents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('editor', 'marketer', 'account_manager', 'designer', 'strategist')),
  specialty TEXT NOT NULL,
  rate_per_hour DECIMAL(10,2),
  bio TEXT,
  portfolio_url TEXT,
  skills TEXT[],
  experience_years INTEGER,
  availability TEXT CHECK (availability IN ('available', 'busy', 'unavailable')),
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversion_links table for tracking
CREATE TABLE public.conversion_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  original_url TEXT NOT NULL,
  tracking_code TEXT NOT NULL UNIQUE,
  short_url TEXT NOT NULL UNIQUE,
  creator_id UUID,
  agency_id UUID,
  commission_rate DECIMAL(5,2) DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create commission_requests table
CREATE TABLE public.commission_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(12,2),
  commission_rate DECIMAL(5,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  assigned_talent_id UUID REFERENCES public.talents(id),
  progress INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create link_clicks table for detailed tracking
CREATE TABLE public.link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID NOT NULL REFERENCES public.conversion_links(id) CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for displaying talents and basic info)
CREATE POLICY "Talents are viewable by everyone" 
ON public.talents 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert talent profiles" 
ON public.talents 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Conversion links viewable by everyone" 
ON public.conversion_links 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create conversion links" 
ON public.conversion_links 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Commission requests viewable by everyone" 
ON public.commission_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create commission requests" 
ON public.commission_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Link clicks viewable by everyone" 
ON public.link_clicks 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert link clicks" 
ON public.link_clicks 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_talents_updated_at
    BEFORE UPDATE ON public.talents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversion_links_updated_at
    BEFORE UPDATE ON public.conversion_links
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_commission_requests_updated_at
    BEFORE UPDATE ON public.commission_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.talents (name, email, role, specialty, rate_per_hour, bio, skills, experience_years, availability, rating, reviews_count, avatar_url) VALUES
('Sarah Johnson', 'sarah@example.com', 'editor', 'Video Editing & Motion Graphics', 75.00, 'Professional video editor with 5+ years experience in social media content creation.', ARRAY['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve'], 5, 'available', 4.8, 23, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'),
('Mike Chen', 'mike@example.com', 'marketer', 'Social Media Marketing', 85.00, 'Digital marketing specialist focused on influencer campaigns and brand partnerships.', ARRAY['Facebook Ads', 'Instagram Marketing', 'Analytics'], 7, 'available', 4.9, 31, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'),
('Emma Rodriguez', 'emma@example.com', 'account_manager', 'Client Relations & Project Management', 90.00, 'Experienced account manager specializing in creator economy and brand collaborations.', ARRAY['Project Management', 'Client Relations', 'Strategy'], 6, 'busy', 4.7, 18, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'),
('Alex Thompson', 'alex@example.com', 'designer', 'Brand Design & Creative Direction', 95.00, 'Creative director with expertise in brand identity and digital design for creators.', ARRAY['Adobe Creative Suite', 'Figma', 'Brand Strategy'], 8, 'available', 4.9, 27, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400');