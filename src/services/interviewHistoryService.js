import { supabase } from "../lib/supabase.js";

export async function saveInterview(userId, role, report) {
  const { error } = await supabase
    .from("interviews")
    .insert([
      {
        user_id: userId,
        role: role,
        report: report,
      },
    ]);

  if (error) {
    console.error("SAVE ERROR:", error);
    throw error;
  }
}

export async function getInterviewHistory(userId) {
  console.log("FETCHING WITH USER ID:", userId);

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", userId);

  console.log("RESULT FROM SUPABASE:", data, error);

  if (error) throw error;

  return data;
}

export async function deleteInterview(id) {
  const { error } = await supabase
    .from("interviews")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function clearInterviewHistory(userId) {
  const { error } = await supabase
    .from("interviews")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}