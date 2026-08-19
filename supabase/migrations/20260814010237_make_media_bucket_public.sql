-- Make the media storage bucket public.
-- Public read access is intentional because flyers and gallery images are public promotional content.
-- Upload, update, and delete access remain restricted by the existing admin storage policies.

update storage.buckets
set public = true
where id = 'media';
