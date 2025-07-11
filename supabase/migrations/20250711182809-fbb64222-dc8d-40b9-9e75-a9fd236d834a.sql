-- Create roadmap features table
CREATE TABLE public.roadmap_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  icon TEXT NOT NULL DEFAULT 'plus',
  priority TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.roadmap_features ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view features)
CREATE POLICY "Anyone can view roadmap features" 
ON public.roadmap_features 
FOR SELECT 
USING (true);

-- For now, allow anyone to manage features (you can restrict this later with authentication)
CREATE POLICY "Anyone can manage roadmap features" 
ON public.roadmap_features 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_roadmap_features_updated_at
BEFORE UPDATE ON public.roadmap_features
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial data
INSERT INTO public.roadmap_features (name, description, status, icon, priority) VALUES
('AI Code Generation', 'Advanced AI-powered code generation with natural language input', 'in-progress', 'brain', 'high'),
('Real-time Collaboration', 'Live collaborative editing with team members', 'planned', 'users', 'medium'),
('Version Control', 'Git integration with automatic version management', 'planned', 'git-branch', 'high'),
('Custom Templates', 'Create and share custom project templates', 'planned', 'layout-template', 'low'),
('Mobile App', 'Native mobile application for iOS and Android', 'planned', 'smartphone', 'medium'),
('API Integration', 'RESTful API for third-party integrations', 'done', 'plug', 'medium');