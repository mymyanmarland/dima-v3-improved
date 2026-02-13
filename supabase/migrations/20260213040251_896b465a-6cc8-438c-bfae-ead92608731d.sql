
-- Fix usage_logs: drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can view own usage" ON public.usage_logs;
DROP POLICY IF EXISTS "Users can insert own usage" ON public.usage_logs;
DROP POLICY IF EXISTS "No direct delete on usage logs" ON public.usage_logs;

CREATE POLICY "Users can view own usage"
  ON public.usage_logs FOR SELECT
  USING ((auth.uid() = user_id) OR is_admin(auth.uid()));

CREATE POLICY "Users can insert own usage"
  ON public.usage_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "No direct delete on usage logs"
  ON public.usage_logs FOR DELETE
  USING (false);

-- Fix user_api_keys: drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can view own api keys" ON public.user_api_keys;
DROP POLICY IF EXISTS "No direct delete on api keys" ON public.user_api_keys;
DROP POLICY IF EXISTS "No direct insert on api keys" ON public.user_api_keys;
DROP POLICY IF EXISTS "No direct update on api keys" ON public.user_api_keys;

CREATE POLICY "Users can view own api keys"
  ON public.user_api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "No direct delete on api keys"
  ON public.user_api_keys FOR DELETE
  USING (false);

CREATE POLICY "No direct insert on api keys"
  ON public.user_api_keys FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No direct update on api keys"
  ON public.user_api_keys FOR UPDATE
  USING (false);
