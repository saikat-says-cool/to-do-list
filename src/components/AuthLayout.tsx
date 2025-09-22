import { supabase } from '@/integrations/supabase/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Session } from '@supabase/supabase-js'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      if (!session) {
        navigate('/login')
      }
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}

export default AuthLayout