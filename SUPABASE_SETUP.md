# Supabase setup

1. Create a Supabase project.
2. Open the project's Connect/API settings.
3. Copy the Project URL and Publishable Key.
4. Put them in `.env.local`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_N8N_WEBHOOK_URL=https://kushhhsanthosh.app.n8n.cloud/webhook/terratrust/verify
```

5. Copy `supabase/migrations/001_initial_schema.sql` into the Supabase SQL Editor and run it.
6. In Authentication, choose the email provider and decide whether email confirmation is required.
7. Add your local app URL, normally `http://localhost:8080`, to the Authentication URL configuration.
8. Run the application with `npm run dev`.
9. Create an account, select a role, and complete the profile.
10. Test the role workspace, property creation, and n8n verification for `p_001` and `p_003`.

Only the publishable browser key belongs in `.env.local`. Never put a service-role or secret key in frontend code.

Copy this SQL into Supabase SQL Editor.
