/*
# Make media storage bucket public

1. Changes
- Update the "media" storage bucket to be publicly readable so flyer and gallery images
  can be used as social preview (og:image) URLs and indexed by search engines.
- This is required because the package detail pages reference flyer images as og:image,
  and signed URLs (private bucket) are not suitable for SEO/social sharing.

2. Security
- Public read access on the media bucket is intentional: all uploaded images are
  promotional content (flyers, gallery photos) meant for public display.
- Write/delete access remains restricted to authenticated users via existing policies.
*/

update storage.buckets
set public = true
where id = 'media';