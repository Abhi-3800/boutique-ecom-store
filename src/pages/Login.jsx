import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      localStorage.setItem("user", JSON.stringify(data.user)) // store user in localStorage
      setErr("")
      setMessage("Login successful! Welcome to Nodima Designs.")
      setEmail("")
      setPassword("")
      setTimeout(() => navigate('/'), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-24 bg-beige-light">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#b49b7f] tracking-wide">Login</h1>
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input className="border rounded-xl px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="border rounded-xl px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button className="w-full bg-[#b49b7f] hover:bg-[#917d63] active:scale-95 transition-transform text-white font-semibold py-3 rounded-xl shadow-md" type="submit">Login</button>
          <p className="text-sm text-gray-600">Create an account? <Link to="/signup" className="underline">Signup</Link></p>
        </form>
      </div>
    </div>
  );
}
