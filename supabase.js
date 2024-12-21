import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://csqgtvoluqdgqkneisub.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcWd0dm9sdXFkZ3FrbmVpc3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NDI3OTEsImV4cCI6MjA1MDMxODc5MX0.2gAg8_YBPJtrGpMHIMHrC_48MqVScA2RkH1oCeeGpzE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;