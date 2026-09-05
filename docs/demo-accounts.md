# Temporary TerraTrust Demo Accounts

These are temporary presentation account identifiers for the TerraTrust AI prototype. Passwords are intentionally not stored in this public repository. Use credentials shared privately by the project team, and remove or rotate the accounts after the presentation.

The application continues to use real Supabase email/password authentication. These credentials are not embedded in frontend code, environment files, SQL migrations, or the n8n workflow.

## Account list

| Role | Email | Demonstrates |
| --- | --- | --- |
| Citizen | `demo.citizen@terratrust.demo` | p001 clean verification, p003 conflict, Passport states |
| Surveyor | `demo.surveyor@terratrust.demo` | Assignments, boundary evidence, completion workflow |
| Government | `demo.government@terratrust.demo` | Human-review queue, investigation, resolution |
| Community | `demo.community@terratrust.demo` | Supporting verification requests and Attest/Object actions |
| Bank | `demo.bank@terratrust.demo` | Shared passports and property evidence inspection |
| Admin | `demo.admin@terratrust.demo` | Users/System and Audit Activity |

## Create the Auth users

Repeat these steps for each row in the account list:

1. Open the Supabase project dashboard.
2. Go to **Authentication** > **Users**.
3. Select **Add user** > **Create new user**.
4. Enter the account email and a private temporary password.
5. Enable **Auto Confirm User** for a presentation-only account, or complete the confirmation email before testing.
6. Create the user.
7. Copy the generated user UUID. Do not substitute the email for the UUID.

Do not create these records by inserting directly into `auth.users`. Supabase Auth must create the users.

## Assign each profile role

After the Auth user exists, open **SQL Editor** and run the following statement once per account, replacing `AUTH_USER_UUID` with the copied UUID and using the matching role value:

```sql
update public.profiles
set role = 'ROLE_VALUE',
    email = 'DEMO_EMAIL',
    updated_at = now()
where id = 'AUTH_USER_UUID'::uuid;
```

Use these exact role values:

| Account | `ROLE_VALUE` |
| --- | --- |
| Citizen | `citizen` |
| Surveyor | `surveyor` |
| Government | `government` |
| Community | `community` |
| Bank | `bank` |
| Admin | `admin` |

For example, the Government profile uses `role = 'government'`; the frontend maps that database role to the Government Officer workspace. The Community profile uses `role = 'community'`; the frontend maps it to the Community Verifier workspace.

The `on_auth_user_created` trigger in `supabase/migrations/001_initial_schema.sql` creates a profile automatically. For users created from the dashboard without role metadata, it will initially use `citizen`; the update above is the intentional role-assignment step. Do not create a duplicate profile row.

Verify each assignment without exposing credentials:

```sql
select id, email, role, region
from public.profiles
where email in (
  'demo.citizen@terratrust.demo',
  'demo.surveyor@terratrust.demo',
  'demo.government@terratrust.demo',
  'demo.community@terratrust.demo',
  'demo.bank@terratrust.demo',
  'demo.admin@terratrust.demo'
)
order by email;
```

## Test each login

1. Open the TerraTrust login page.
2. Enter one real Supabase demo email and the temporary password.
3. Select **Sign in**.
4. Confirm the role workspace:
   - Citizen -> `/dashboard`
   - Surveyor -> `/surveyor`
   - Government -> `/government`
   - Community -> `/verification`
   - Bank -> `/bank`
   - Admin -> `/admin`
5. Confirm the role-specific navigation, Profile, Notifications, Help, and Sign out.
6. Sign out before testing the next account.

Login errors are shown by the existing login form. There is no role selector or client-side role bypass.

## Demo data and presentation flow

- Citizen: open `p001` / `TT-8421-LG`, run live n8n verification, and show `VERIFIED`, confidence `93`, and Passport Ready. Then open `p003` / `TT-5512-AB` and show `HUMAN_REVIEW_REQUIRED`, confidence `48`, and Passport Held.
- Surveyor: open Assignments, inspect an assignment, and complete the visible workflow.
- Government: open the Review Queue, investigate the p003 conflict, and demonstrate the local resolution state.
- Community: open Verification Requests and use Attest/Object. These actions are supporting evidence, not legal title authority.
- Bank: inspect a shared Digital Property Passport and its evidence. It is supporting underwriting information, not an official title certificate.
- Admin: inspect Users/System and Audit Activity. Keep platform controls demo-safe.

Government and Community stages in the n8n workflow are deterministic prototype evidence unless real external APIs are separately connected. TerraTrust does not itself legally establish land ownership.

## Cleanup after the demo

These accounts are temporary presentation credentials. After the TerraTrust demo:

1. Delete the six users from **Authentication** > **Users**, or disable them and rotate the password.
2. Remove or update their profile rows if your retention policy requires it.
3. Remove this document from any public copy of the repository if the credentials are no longer intended for distribution.
4. Never reuse this password for a real account.
