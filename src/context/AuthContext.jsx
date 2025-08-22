import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('be_user')
    if (saved) setUser(JSON.parse(saved))
  },[])

  const login = async (email, password) => {
    // Demo: accept any non-empty credentials
    if(!email || !password) throw new Error('Email and password required')
    const u = { id: 1, email, role: email === 'admin@demo.com' ? 'admin' : 'user', token: 'demo-jwt' }
    setUser(u)
    localStorage.setItem('be_user', JSON.stringify(u))
    return u
  }

  const signup = async (name, email, password) => {
    return login(email, password)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('be_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
