import { supabase } from "./supabase";
import type { VerificationResult } from "./verification-workflow";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export type PersistenceOutcome = { error: string | null; persisted: boolean };

async function ownedProperty(propertyId: string, userId: string) {
  const query = supabase.from("properties").select("id").eq("owner_id", userId);
  const { data, error } = isUuid(propertyId)
    ? await query.eq("id", propertyId).maybeSingle()
    : await query.eq("passport_id", propertyId).maybeSingle();
  if (error) return { error: error.message, propertyId: undefined };
  if (!data) return { error: "This property is not available to the signed-in account.", propertyId: undefined };
  return { error: null, propertyId: data.id };
}

export async function persistPropertyDocument(input: {
  propertyId: string;
  userId: string;
  name: string;
  kind: string;
}): Promise<PersistenceOutcome> {
  const ownership = await ownedProperty(input.propertyId, input.userId);
  if (ownership.error) return { error: ownership.error, persisted: false };
  const { error } = await supabase.from("property_documents").insert({
    property_id: ownership.propertyId,
    name: input.name,
    kind: input.kind,
  });
  return { error: error?.message ?? null, persisted: !error };
}

async function saveVerificationResult(propertyId: string, result: VerificationResult) {
  const { data: existing, error: findError } = await supabase
    .from("verification_results")
    .select("id")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (findError) return findError.message;

  if (existing) {
    const { error } = await supabase
      .from("verification_results")
      .update({ provider: result.provider, result })
      .eq("id", existing.id);
    return error?.message ?? null;
  }

  const { error } = await supabase.from("verification_results").insert({
    property_id: propertyId,
    provider: result.provider,
    result,
  });
  return error?.message ?? null;
}

async function saveReviewCase(propertyId: string, result: VerificationResult) {
  const { data: existing, error: findError } = await supabase
    .from("review_cases")
    .select("id")
    .eq("property_id", propertyId)
    .in("status", ["open", "in_review"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (findError) return findError.message;

  const values = {
    status: "open",
    reason: result.decisionReason,
    updated_at: new Date().toISOString(),
  };
  if (existing) {
    const { error } = await supabase.from("review_cases").update(values).eq("id", existing.id);
    return error?.message ?? null;
  }

  const { error } = await supabase.from("review_cases").insert({
    property_id: propertyId,
    ...values,
  });
  return error?.message ?? null;
}

async function resolveActiveReviewCases(propertyId: string) {
  const { error } = await supabase
    .from("review_cases")
    .update({ status: "resolved", updated_at: new Date().toISOString() })
    .eq("property_id", propertyId)
    .in("status", ["open", "in_review"]);
  return error?.message ?? null;
}

export async function persistVerificationOutcome(input: {
  propertyId: string;
  userId: string;
  result: VerificationResult;
}): Promise<PersistenceOutcome> {
  const ownership = await ownedProperty(input.propertyId, input.userId);
  if (ownership.error) return { error: ownership.error, persisted: false };

  const propertyId = ownership.propertyId!;
  const resultError = await saveVerificationResult(propertyId, input.result);
  if (resultError) return { error: resultError, persisted: false };

  if (input.result.status === "manual_review") {
    const reviewError = await saveReviewCase(propertyId, input.result);
    if (reviewError) return { error: reviewError, persisted: false };
  } else {
    const reviewError = await resolveActiveReviewCases(propertyId);
    if (reviewError) return { error: reviewError, persisted: false };
  }

  const { error: propertyError } = await supabase
    .from("properties")
    .update({
      status: input.result.status === "verified" ? "verified" : "disputed",
      trust_score: input.result.confidenceScore ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", propertyId)
    .eq("owner_id", input.userId);
  return { error: propertyError?.message ?? null, persisted: !propertyError };
}
