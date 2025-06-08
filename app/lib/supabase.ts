import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined'

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: isBrowser,
    persistSession: isBrowser,
    detectSessionInUrl: isBrowser,
    flowType: 'pkce',
    debug: true,
    storageKey: 'supabase.auth.token',
    storage: isBrowser
      ? {
          getItem: (key) => {
            try {
              const value = localStorage.getItem(key)
              return value ? JSON.parse(value) : null
            } catch (error) {
              console.error('Error reading from localStorage:', error)
              return null
            }
          },
          setItem: (key, value) => {
            try {
              localStorage.setItem(key, JSON.stringify(value))
            } catch (error) {
              console.error('Error writing to localStorage:', error)
            }
          },
          removeItem: (key) => {
            try {
              localStorage.removeItem(key)
            } catch (error) {
              console.error('Error removing from localStorage:', error)
            }
          }
        }
      : undefined
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
})

// Add auth state change listener for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.email)
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user)
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out')
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed')
  }
})