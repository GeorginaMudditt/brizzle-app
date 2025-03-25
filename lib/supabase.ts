import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulrwcortyhassmytkcij.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscndjb3J0eWhhc3NteXRrY2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODgwMDgsImV4cCI6MjA1Njc2NDAwOH0.XXtNa4UG27BSjrdT44QwafQAZ0GGa6nbGkYMRcHENis";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
