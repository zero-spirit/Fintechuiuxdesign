import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtsshrodxtzcrxvpoczf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0c3Nocm9keHR6Y3J4dnBvY3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDMwODksImV4cCI6MjA5NTE3OTA4OX0.W114jai9nbJ4Jeq9qQcYZs7cV-Egm1QBw_W-GpK83vo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
