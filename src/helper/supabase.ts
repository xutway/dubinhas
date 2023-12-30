import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfxoovmrhrdnespaycud.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeG9vdm1yaHJkbmVzcGF5Y3VkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjAwMjAwMiwiZXhwIjoyMDE3NTc4MDAyfQ.qVPOM-Fz33oaVMIwNx_uS02BMMKWiESGpM993ay3PK4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
