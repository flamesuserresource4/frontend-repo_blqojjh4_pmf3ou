function Cart({ items, onClose, onCheckout }) {
  const total = items.reduce((sum, it) => sum + it.price * (it.qty || 1), 0)

  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-zinc-950/95 backdrop-blur border-l border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">Your Cart</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-zinc-400">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <img className="h-16 w-16 rounded object-cover" src={it.images?.[0] || 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop'} alt={it.title} />
                <div className="flex-1">
                  <p className="text-zinc-100 font-medium">{it.title}</p>
                  <p className="text-zinc-400 text-sm">Qty: {it.qty || 1}</p>
                </div>
                <p className="text-zinc-100 font-semibold">${(it.price * (it.qty || 1)).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center justify-between text-zinc-200">
            <span>Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-rose-600 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Cart
