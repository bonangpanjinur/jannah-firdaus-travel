# Repository guidance

- Preserve existing Git history; do not force-push, rebase pushed commits, or amend published commits.
- Run `npm run typecheck` and `npm run build` after application or build configuration changes.
- Keep server-only secrets and the Supabase service-role key out of browser code.
