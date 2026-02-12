-- Allow users to view their own API keys
DROP POLICY IF EXISTS "No direct select on api keys" ON public.user_api_keys;
CREATE POLICY "Users can view own api keys"
  ON public.user_api_keys
  FOR SELECT
  USING (auth.uid() = user_id);