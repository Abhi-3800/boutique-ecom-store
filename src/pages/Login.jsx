import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });


  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      nav('/');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 bg-beige-light">
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#b49b7f] tracking-wide">Login</h1>

        <form className="space-y-6" onSubmit={submit} noValidate>
          {/* Email field with floating label */}
          <div className="space-y-4">
            {/* Email field */}
            <div className="relative">
              <input
                type="email"
                value={form.email}
                placeholder="Enter email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                type="password"
                value={form.password}
                placeholder="Enter password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          focus:border-transparent placeholder-gray-400"
              />
            </div>
          </div>


          {/* Error message with icon */}
          {err && (
            <p className="flex items-center gap-2 text-red-600 text-sm font-medium">
              <AlertCircle className="w-5 h-5" />
              {err}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#b49b7f] hover:bg-[#917d63] active:scale-95 transition-transform text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Login
          </button>

          {/* Footer links */}
          <p className="text-center text-sm text-gray-600">
            No account?{' '}
            <Link to="/signup" className="underline text-[#b49b7f] hover:text-[#917d63]">
              Sign up
            </Link>
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">
            Demo admin: admin@demo.com / any password
          </p>
        </form>
      </div>
    </div>
  );
}
