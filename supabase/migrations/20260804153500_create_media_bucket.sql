-- Media bucket used by flyers, gallery images, and admin uploads.
-- The bucket is made public by the later make_media_bucket_public migration.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  false,
  5242880,
  ARRAY['image/*']::text[]
)
ON CONFLICT (id) DO NOTHING;
