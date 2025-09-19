import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jkcdtllpbpzlndunyjna.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY2R0bGxwYnB6bG5kdW55am5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODk4ODUsImV4cCI6MjA3MDc2NTg4NX0.0ykHBN6EPmubXnwxFtKB4viRVi5GqEkMMQb3HV-gNgI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);