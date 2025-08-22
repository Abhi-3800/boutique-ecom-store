import { useMemo, useState } from 'react'
import { products as seed } from '../utils/fakeData'

export default function AdminDashboard(){
  const [list, setList] = useState(()=>{
    const saved = localStorage.getItem('be_products')
    return saved ? JSON.parse(saved) : seed
  })

  const [form, setForm] = useState({ title:'', price:'', category:'', images:'', description:'' })

  const save = (rows) => {
    setList(rows)
    localStorage.setItem('be_products', JSON.stringify(rows))
  }

  const add = (e) => {
    e.preventDefault()
    const id = 'p' + Math.random().toString(36).slice(2,7)
    const images = form.images.split(',').map(s=>s.trim()).filter(Boolean)
    const price = Number(form.price)||0
    const row = { id, title: form.title, price, category: form.category, images, description: form.description }
    const rows = [row, ...list]
    save(rows)
    setForm({ title:'', price:'', category:'', images:'', description:'' })
  }

  const remove = (id) => {
    const rows = list.filter(p=>p.id!==id)
    save(rows)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <form className="card grid md:grid-cols-5 gap-3 mb-6" onSubmit={add}>
        <input className="border rounded-xl px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2" placeholder="Category id (e.g., handcrafted)" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2 md:col-span-2" placeholder="Images (comma separated URLs)" value={form.images} onChange={e=>setForm({...form, images:e.target.value})} />
        <textarea className="border rounded-xl px-3 py-2 md:col-span-5" rows="3" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="md:col-span-5"><button className="btn" type="submit">Add Product</button></div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(p=>(
          <div key={p.id} className="card flex gap-4 items-center">
            <img src={p.images?.[0]} alt="" className="w-24 h-24 object-cover rounded-xl border" />
            <div className="flex-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">₹{p.price} • {p.category}</div>
            </div>
            <button className="px-3 py-2 rounded-xl border hover:bg-gray-100" onClick={()=>remove(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
