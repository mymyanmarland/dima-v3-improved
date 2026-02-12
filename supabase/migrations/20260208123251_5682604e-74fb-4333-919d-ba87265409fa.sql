
-- Drop the safe view - no longer needed since API key management 
-- is handled entirely through the manage-api-key edge function
DROP VIEW IF EXISTS public.user_api_keys_safe;
