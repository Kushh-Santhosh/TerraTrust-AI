# TerraTrust AI Demo Guide

This walkthrough is designed for a two-minute GDTA presentation. Use a real Supabase test account; the repository does not contain demo credentials.

## Demo A: Successful verification

1. Sign in as **Citizen**.
2. Open **My Properties** and select `p001` / `TT-8421-LG`.
3. Open **Documents** and show the clean evidence set.
4. Run **Live Verification**.
5. Show the n8n stages and explain what each demonstrates:

| Stage | Demonstrates |
| --- | --- |
| OCR / documents | Evidence completeness and document confidence |
| Fraud analysis | Risk signals that can block automatic approval |
| GIS / boundary | Boundary evidence and parcel alignment |
| Government validation | Deterministic prototype evidence, not a live registry API |
| Community verification | Supporting attestations, not legal title authority |
| Risk + confidence | Explainable evidence aggregation |
| Decision gate | Why this property can proceed to Passport Ready |

6. Show `VERIFIED`, confidence `93`, and **Passport Ready**.

## Demo B: Human review

1. Open `p003` / `TT-5512-AB`.
2. Run verification through the same live n8n workflow.
3. Show the Critical fraud signal and conflicting evidence.
4. Show failed boundary, government, and community evidence.
5. Show confidence `48`, `HUMAN_REVIEW_REQUIRED`, and **Passport Held**.
6. Open the **Government Review Queue** to show human escalation.

## Optional role views

- **Community:** show Attest/Object as supporting evidence actions.
- **Bank:** show a shared Digital Property Passport and its evidence.
- **Surveyor:** show Assignments and the assignment completion state.
- **Admin:** show Users/System and Audit Activity.

## What to say

TerraTrust organizes evidence, explains the decision, and escalates conflicts to human review. It does not legally establish land ownership. Government and community stages in this prototype are deterministic evidence stages, not live external APIs.

## Safe fallback

If the live n8n webhook is unavailable, the verification screen must say **Live verification unavailable** and label any local result as **Demo Simulation**. It must not show Passport Ready or save the fallback as a live verification result.
