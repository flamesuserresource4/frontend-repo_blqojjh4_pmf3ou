import { useState } from 'react'

function Header({ onOpenCart, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-20 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-transparent backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-800 shadow-inner shadow-black/40">
            <span className="text-xl leading-none text-zinc-200 group-hover:text-white transition-colors">☥</span>
          </span>
          <div>
            <p className="text-xl font-black tracking-wide text-zinc-100">Nocturne</p>
            <p className="text-xs uppercase tracking-widest text-zinc-400">Gothic Jewellery</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#rings" className="text-zinc-300 hover:text-white transition-colors">Rings</a>
          <a href="#necklaces" className="text-zinc-300 hover:text-white transition-colors">Necklaces</a>
          <a href="#earrings" className="text-zinc-300 hover:text-white transition-colors">Earrings</a>
          <a href="#bracelets" className="text-zinc-300 hover:text-white transition-colors">Bracelets</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-md bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-900 transition-colors"
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-zinc-800 bg-zinc-900/70 text-zinc-200"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800/60">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2 text-sm">
            <a href="#rings" className="text-zinc-300 hover:text-white transition-colors">Rings</a>
            <a href="#necklaces" className="text-zinc-300 hover:text-white transition-colors">Necklaces</a>
            <a href="#earrings" className="text-zinc-300 hover:text-white transition-colors">Earrings</a>
            <a href="#bracelets" className="text-zinc-300 hover:text-white transition-colors">Bracelets</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
