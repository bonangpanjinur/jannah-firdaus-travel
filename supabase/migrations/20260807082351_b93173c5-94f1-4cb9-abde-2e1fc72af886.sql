CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES public.packages(id) ON DELETE SET NULL,
  package_name text,
  name text NOT NULL,
  phone text NOT NULL,
  preferred_date date,
  notes text,
  status text NOT NULL DEFAULT 'baru',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can register" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth can register" ON public.registrations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin read registrations" ON public.registrations FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admin update registrations" ON public.registrations FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admin delete registrations" ON public.registrations FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER registrations_updated BEFORE UPDATE ON public.registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();