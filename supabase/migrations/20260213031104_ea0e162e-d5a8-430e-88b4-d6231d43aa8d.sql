-- Re-create the trigger that was missing
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users who don't have profiles
INSERT INTO public.profiles (user_id, display_name)
SELECT id, COALESCE(raw_user_meta_data->>'display_name', split_part(email, '@', 1))
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.profiles)
ON CONFLICT DO NOTHING;

-- Backfill user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'user'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_roles)
ON CONFLICT DO NOTHING;

-- Backfill user_settings
INSERT INTO public.user_settings (user_id)
SELECT id
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_settings)
ON CONFLICT DO NOTHING;