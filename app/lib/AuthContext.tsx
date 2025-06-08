import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { useNavigate } from 'react-router-dom'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
  message: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      // Tambahkan: auto insert profile jika user baru login
      if (session?.user) {
        autoInsertProfile(session.user)
      }
    })

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      // Tambahkan: auto insert profile jika user baru login
      if (session?.user) {
        autoInsertProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fungsi untuk auto insert profile jika belum ada
  async function autoInsertProfile(user: User) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      if (!data) {
        // Insert profile jika belum ada
        await supabase.from('profiles').insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          provider: user.app_metadata?.provider || '',
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      // Hanya log, jangan blokir login
      console.error('Auto insert profile error:', err);
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      console.log('Attempting sign in with:', { email })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.')
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email before signing in.')
        } else {
          throw error
        }
      }

      if (!data?.user) {
        throw new Error('No user data received')
      }

      console.log('Sign in successful:', data.user.email)
      setUser(data.user)
      navigate('/account')
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError(error.message || 'An error occurred during sign in')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      if (data?.user) {
        setMessage('Please check your email for verification link')
      }
    } catch (error: any) {
      console.error('Sign up error:', error)
      setError(error.message || 'An error occurred during sign up')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      navigate('/auth')
    } catch (error: any) {
      console.error('Sign out error:', error)
      setError(error.message || 'An error occurred during sign out')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`
      })
      if (error) throw error
      setMessage('Password reset instructions sent to your email')
    } catch (error: any) {
      console.error('Reset password error:', error)
      setError(error.message || 'An error occurred during password reset')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage('Password updated successfully')
    } catch (error: any) {
      console.error('Update password error:', error)
      setError(error.message || 'An error occurred during password update')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      console.error('Google sign in error:', error)
      setError(error.message || 'An error occurred during Google sign in')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    message,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGoogle
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}