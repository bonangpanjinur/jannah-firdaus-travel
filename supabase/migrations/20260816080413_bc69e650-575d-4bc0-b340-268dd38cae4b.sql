GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT SELECT ON public.packages TO anon;
GRANT ALL ON public.packages TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.package_images TO authenticated;
GRANT SELECT ON public.package_images TO anon;
GRANT ALL ON public.package_images TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.package_itinerary TO authenticated;
GRANT SELECT ON public.package_itinerary TO anon;
GRANT ALL ON public.package_itinerary TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT SELECT ON public.gallery TO anon;
GRANT ALL ON public.gallery TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT INSERT ON public.contact_messages TO anon;
GRANT ALL ON public.contact_messages TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT INSERT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO service_role;