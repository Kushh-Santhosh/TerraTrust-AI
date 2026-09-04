# Security Notes

The repository is designed to be safe for public review. Production secrets are supplied by deployment environments and are not committed.

## Secret Handling

- `.env`, `.env.local`, `.env.*.local`, and generated deployment folders are ignored.
- `.env.example` contains placeholders only.
- Browser code reads only `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_N8N_WEBHOOK_URL`.
- `SUPABASE_SERVICE_ROLE_KEY` is never used in frontend code or bundled by Vite.
- N8N credentials are managed by N8N, not embedded in React source or workflow documentation.
- Demo account passwords are not stored in this public repository.

## Authentication and Authorization

Supabase Auth owns sessions and user identity. The application loads the profile by authenticated user ID and derives the workspace role from that profile. PostgreSQL RLS policies scope profile and property records to the current owner.

Do not bypass RLS or use a service-role key in browser code. Administrative scripts must remain local/server-side and must not print credentials.

## Verification Safety

The configured N8N path is authoritative for live verification. If it returns an invalid response or is unreachable, the client shows a held/manual-review state with no fabricated score and does not persist the result as a successful live verification. Risky or conflicting evidence is routed to human review.

## Public Repository Review

Before publishing changes, inspect current files and Git history for secret-like values, verify ignored files are untracked, and review the final diff. The repository intentionally contains no production passwords, API keys, bearer tokens, private keys, service-role values, or private webhook credentials.
