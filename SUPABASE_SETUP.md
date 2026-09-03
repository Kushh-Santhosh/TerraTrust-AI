# Supabase setup

1. Open your Supabase project and copy the Project URL and the Publishable Key from the API / Connect settings.
2. Put the browser-safe values in `.env.local`:

```env
VITE_SUPABASE_URL=https://iixsxywjsclzbjfzlnvq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_Vp893beApMLxMug7adBoag_OM-MpDdV
VITE_N8N_WEBHOOK_URL=https://kushhhsanthosh.app.n8n.cloud/webhook/terratrust/verify
```

3. Keep the secret/service-role key server-side only. Never put it in `.env.local`, never expose it in frontend code, and never commit it to GitHub.
4. If you want a temporary testing account, create it in Supabase Auth > Users, then log in with that real Supabase account in the app.
5. If you use Google login, configure Google in Supabase Dashboard > Authentication > Providers > Google. Add the app redirect URL from your Supabase project settings when prompted.
6. Copy `supabase/migrations/001_initial_schema.sql` into the Supabase SQL Editor and run it.
7. In Authentication, choose the email provider and decide whether email confirmation is required.
8. Add the local app URL, normally `http://localhost:8080`, to the Authentication URL configuration.
9. Run the application with `npm run dev`.
10. Create an account, select a role, and complete the profile.
11. Test the role workspace, property creation, and n8n verification for `p_001` and `p_003`.

Only the publishable browser key belongs in `.env.local`. Never put a service-role or secret key in frontend code.
