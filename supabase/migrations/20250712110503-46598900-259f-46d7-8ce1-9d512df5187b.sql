-- Create table for Instagram reels
CREATE TABLE public.instagram_reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  embed_code TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view Instagram reels" 
ON public.instagram_reels 
FOR SELECT 
USING (true);

-- Create policies for management (you can restrict this later)
CREATE POLICY "Anyone can manage Instagram reels" 
ON public.instagram_reels 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_instagram_reels_updated_at
BEFORE UPDATE ON public.instagram_reels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for ordering
CREATE INDEX idx_instagram_reels_display_order ON public.instagram_reels(display_order, created_at);

-- Insert some sample data
INSERT INTO public.instagram_reels (title, instagram_url, is_featured, display_order) VALUES
('Amazing Glitch Effect', 'https://www.instagram.com/reel/sample1', true, 1),
('Digital Art Revolution', 'https://www.instagram.com/reel/sample2', true, 2),
('Creative Process', 'https://www.instagram.com/reel/sample3', false, 3);