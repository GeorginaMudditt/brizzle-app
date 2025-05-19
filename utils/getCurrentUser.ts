import { supabase } from "@lib/supabase";

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting Supabase user:", error.message);
    return null;
  }
  return data.user;
};
