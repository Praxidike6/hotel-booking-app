import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtushcimdmmhxnhzuntl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dXNoY2ltZG1taHhuaHp1bnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MDkyOTcsImV4cCI6MjAwNjE4NTI5N30.vUFp5oySiyEFoz6CW7kOqAV2uSRvCX3cEHLGRTQbhEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
