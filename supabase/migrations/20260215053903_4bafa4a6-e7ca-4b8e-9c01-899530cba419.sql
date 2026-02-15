
-- Add ban/access control columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_banned boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS banned_until timestamp with time zone,
ADD COLUMN IF NOT EXISTS access_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS ban_reason text;
