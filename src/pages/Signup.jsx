import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      name: name
    })

    if (error) {
      setMessage(error.message)
    } else {
      setErr("")
      setMessage("Signup successful! Please check your email to confirm your account.")
      setName("")
      setEmail("")
      setPhone("")
      setAddress("")
      setPassword("")
      setTimeout(() => nav('/login'), 3000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-24 bg-beige-light">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#b49b7f] tracking-wide">Create account</h1>
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input className="border rounded-xl px-3 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="border rounded-xl px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="border rounded-xl px-3 py-2" type="tel" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input className="border rounded-xl px-3 py-2" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
          <input className="border rounded-xl px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button className="w-full bg-[#b49b7f] hover:bg-[#917d63] active:scale-95 transition-transform text-white font-semibold py-3 rounded-xl shadow-md" type="submit">Sign Up</button>
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="underline">Login</Link></p>
        </form>
      </div>
    </div>
  )
}
