
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY "admin manage packages" ON public.packages;
DROP POLICY "auth read packages" ON public.packages;
CREATE POLICY "auth read packages" ON public.packages FOR SELECT TO authenticated USING (is_published OR private.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage packages" ON public.packages FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin manage itinerary" ON public.package_itinerary;
CREATE POLICY "admin manage itinerary" ON public.package_itinerary FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin manage package images" ON public.package_images;
CREATE POLICY "admin manage package images" ON public.package_images FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin manage gallery" ON public.gallery;
CREATE POLICY "admin manage gallery" ON public.gallery FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin manage settings" ON public.site_settings;
CREATE POLICY "admin manage settings" ON public.site_settings FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin read messages" ON public.contact_messages;
DROP POLICY "admin update messages" ON public.contact_messages;
DROP POLICY "admin delete messages" ON public.contact_messages;
CREATE POLICY "admin read messages" ON public.contact_messages FOR SELECT TO authenticated USING (private.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (private.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (private.has_role(auth.uid(),'admin'));

DROP POLICY "admin upload media" ON storage.objects;
DROP POLICY "admin update media" ON storage.objects;
DROP POLICY "admin delete media" ON storage.objects;
CREATE POLICY "admin upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND private.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND private.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND private.has_role(auth.uid(),'admin'));

DROP FUNCTION public.has_role(uuid, public.app_role);
