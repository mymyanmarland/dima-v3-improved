-- Prevent deletion of usage logs
CREATE POLICY "No direct delete on usage logs"
ON public.usage_logs
FOR DELETE
USING (false);