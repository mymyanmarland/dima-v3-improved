-- Block direct UPDATE on usage_logs (audit trail integrity)
CREATE POLICY "No direct update on usage logs"
ON public.usage_logs
FOR UPDATE
USING (false);

-- Block direct DELETE on user_settings
CREATE POLICY "No direct delete on user settings"
ON public.user_settings
FOR DELETE
USING (false);