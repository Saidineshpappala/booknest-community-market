// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wehcpxmefqvuwjfteblg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlaGNweG1lZnF2dXdqZnRlYmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDg2NjgsImV4cCI6MjA1ODAyNDY2OH0.T9p8mT6eNB12HpbkGZ33LuLtcwBEBL6-4ajqDje0Gk4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);