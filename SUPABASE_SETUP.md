# Supabase setup

1. Open the Supabase project and copy its Project URL and Publishable Key from the API / Connect settings.
2. Create a local `.env.local` file with browser-safe values only:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here
VITE_N8N_WEBHOOK_URL=https://your-n8n-host/webhook/terratrust/verify
```

3. In Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`.
4. Verify that `profiles`, `properties`, `property_documents`, `verification_results`, and `review_cases` exist and have RLS enabled.
5. Create a real test user in Authentication > Users. The application does not ship with test credentials.
6. Confirm the user has a profile and the intended role. The signup trigger creates a profile; role changes should be performed through a protected administrative process.
7. Configure email confirmation and the local URL, normally `http://localhost:8080`, under Authentication URL settings.
8. Google login is not implemented in the current UI. If it is added later, configure the Google provider and redirect URL in Supabase before describing it as live.
9. Start the app with `bun run dev`, then test sign-in, role routing, property creation, and the n8n verification flow.

Never put `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, database passwords, OAuth client secrets, or private API credentials in `.env.local`, frontend code, or Git. Only the publishable browser key belongs in the Vite client configuration.
