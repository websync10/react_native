import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://vxwvuscilnglxqqadqzc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4d3Z1c2NpbG5nbHhxcWFkcXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTc4MDAsImV4cCI6MjA2ODIzMzgwMH0.GvcEA7JukSInRtNQOp0PYxEG_Cl6uDIMUIvhUaEhPuo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})