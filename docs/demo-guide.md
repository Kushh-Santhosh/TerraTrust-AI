# TerraTrust AI Demo Guide

## Demo A: Successful verification

1. Sign in as a Citizen with a real Supabase test account.
2. Open **My Properties** and select `p001` / `TT-8421-LG`.
3. Open Documents and show the evidence set.
4. Run Verification.
5. Show the live n8n stages: OCR, fraud, boundary, government prototype evidence, community prototype evidence, risk, and confidence.
6. Show `VERIFIED`, confidence `93`, and Passport Ready.

## Demo B: Human review

1. Open `p003` / `TT-5512-AB`.
2. Run Verification through the same live n8n workflow.
3. Show the Critical fraud signal and conflicting evidence.
4. Show failed boundary, government, and community evidence.
5. Show confidence `48`, `HUMAN_REVIEW_REQUIRED`, and Passport Held.
6. Open the Government Review Queue to show the human escalation path.

## What to say

TerraTrust does not treat automation as legal ownership authority. It organizes evidence, explains the decision, and escalates conflicts to human review. Government and community stages in this prototype are deterministic evidence stages, not live external APIs.

## Safe fallback

If the live n8n webhook is unavailable, the verification screen must say that live verification is unavailable and label any local result as Demo Simulation. It must not show Passport Ready or save the fallback as a live verification result.
