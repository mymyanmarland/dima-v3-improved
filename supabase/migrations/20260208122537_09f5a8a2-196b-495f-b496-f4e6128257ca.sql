
-- Lock down direct client access to user_api_keys table
-- All operations now go through the manage-api-key edge function (service role)

-- Remove existing permissive policies
DROP POLICY IF EXISTS "Users can view own api key" ON public.user_api_keys;
DROP POLICY IF EXISTS "Users can insert own api key" ON public.user_api_keys;
DROP POLICY IF EXISTS "Users can update own api key" ON public.user_api_keys;
DROP POLICY IF EXISTS "Users can delete own api key" ON public.user_api_keys;

-- Deny all direct client access - force through edge function
CREATE POLICY "No direct select on api keys"
  ON public.user_api_keys FOR SELECT
  USING (false);

CREATE POLICY "No direct insert on api keys"
  ON public.user_api_keys FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No direct update on api keys"
  ON public.user_api_keys FOR UPDATE
  USING (false);

CREATE POLICY "No direct delete on api keys"
  ON public.user_api_keys FOR DELETE
  USING (false);
