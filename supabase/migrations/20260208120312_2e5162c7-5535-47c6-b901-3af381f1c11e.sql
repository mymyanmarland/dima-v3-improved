
-- 1. Remove admin access from SELECT on user_api_keys (admins should NOT see other users' API keys)
DROP POLICY IF EXISTS "Users can view own api key" ON public.user_api_keys;
CREATE POLICY "Users can view own api key"
  ON public.user_api_keys
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2. Remove admin access from UPDATE on user_api_keys  
DROP POLICY IF EXISTS "Users can update own api key" ON public.user_api_keys;
CREATE POLICY "Users can update own api key"
  ON public.user_api_keys
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. Remove admin access from DELETE on user_api_keys
DROP POLICY IF EXISTS "Users can delete own api key" ON public.user_api_keys;
CREATE POLICY "Users can delete own api key"
  ON public.user_api_keys
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Create a safe view that masks the API key (shows only last 4 chars)
CREATE OR REPLACE VIEW public.user_api_keys_safe
WITH (security_invoker = on) AS
  SELECT 
    id,
    user_id,
    provider,
    CASE 
      WHEN length(api_key) > 4 THEN '••••••••' || right(api_key, 4)
      ELSE '••••••••'
    END AS masked_key,
    created_at,
    updated_at
  FROM public.user_api_keys;
