import { supabase } from "../lib/supabase";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log("Data:", data);
console.log("Error:", error);



  if (error) throw error;

  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}















