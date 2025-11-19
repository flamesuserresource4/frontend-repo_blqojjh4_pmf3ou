import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [seeding, setSeeding] = useState(false)

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex(p => p._id === product._id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 }
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const seedProduct = async () => {
    try {
      setSeeding(true)
      const sample = {
        title: 'Abyssal Signet Ring',
        description: 'Sterling silver ring with onyx stone and sigil engraving',
        price: 69.0,
        category: 'rings',
        images: ['https://images.unsplash.com/photo-1603569283847-1f9f91054fa5?q=80&w=1600&auto=format&fit=crop'],
        material: '925 Sterling Silver',
        color: 'Silver / Black',
        size: 'Adjustable',
        stock: 12,
        rating: 4.8,
        featured: true
      }
      await fetch(`${BASE_URL}/api/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample)
      })
      // refresh featured grid by forcing re-mount: naive approach
      window.location.hash = '#featured'
      setTimeout(() => window.location.reload(), 400)
    } catch (e) {
      console.error(e)
    } finally {
      setSeeding(false)
    }
  }

  const checkout = async () => {
    try {
      const payload = {
        items: cart.map(c => ({ product_id: c._id, title: c.title, price: c.price, quantity: c.qty || 1 })),
        total: cart.reduce((s, c) => s + c.price * (c.qty || 1), 0),
      }
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Checkout failed')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Header onOpenCart={() => setCartOpen(true)} cartCount={cart.reduce((s, c) => s + (c.qty || 1), 0)} />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 flex items-center justify-between">
          <p className="text-sm text-zinc-400">No products yet? Seed a featured product to try it out.</p>
          <button onClick={seedProduct} disabled={seeding} className="inline-flex items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-700 disabled:opacity-50">
            {seeding ? 'Seeding...' : 'Seed sample product'}
          </button>
        </div>
      </div>

      <ProductGrid onAdd={handleAddToCart} />

      <footer className="mt-20 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm text-zinc-400">
          <div>
            <p className="font-semibold text-zinc-200">About Nocturne</p>
            <p className="mt-2">Dark aesthetics, lasting craft. Designed in small batches.</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-200">Support</p>
            <ul className="mt-2 space-y-1">
              <li>Shipping & Returns</li>
              <li>Care Instructions</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-zinc-200">Newsletter</p>
            <p className="mt-2">Join the coven for releases and rituals.</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Email" className="flex-1 rounded-md bg-zinc-900 ring-1 ring-zinc-800 px-3 py-2 text-sm" />
              <button className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white">Join</button>
            </div>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <Cart items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />
      )}
    </div>
  )
}

export default App
