// Supabase client setup
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
