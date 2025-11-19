import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 animate-pulse">
      <div className="aspect-square rounded-lg bg-zinc-800" />
      <div className="mt-4 h-4 w-3/4 bg-zinc-800 rounded" />
      <div className="mt-2 h-4 w-1/2 bg-zinc-800 rounded" />
      <div className="mt-4 h-9 w-full bg-zinc-800 rounded" />
    </div>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-zinc-900">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1600&auto=format&fit=crop'}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white">Featured</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-zinc-100 font-semibold truncate">{product.title}</h3>
        <p className="mt-1 text-sm text-zinc-400 truncate">{product.material || product.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-zinc-100 font-bold">${product.price?.toFixed?.(2) || product.price}</p>
          <button
            onClick={() => onAdd(product)}
            className="inline-flex items-center justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ onAdd }) {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ limit: 8, featured: true })
        })
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-50">Featured Relics</h2>
          <p className="mt-2 text-zinc-400">Forged pieces chosen by our coven</p>
        </div>
        <a href="#catalog" className="text-sm text-zinc-400 hover:text-zinc-200">View all →</a>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : products.length > 0 ? (
          products.map(p => <ProductCard key={p._id} product={p} onAdd={onAdd} />)
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-zinc-400">
              <p>No products yet. Try seeding one from the button below.</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default ProductGrid
