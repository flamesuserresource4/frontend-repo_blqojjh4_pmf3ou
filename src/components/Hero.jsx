function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_-10%,rgba(244,63,94,0.07),transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-50">
              Adorn the Night
            </h1>
            <p className="mt-5 text-lg text-zinc-300 leading-relaxed">
              Handcrafted gothic jewellery forged in darkness and designed to endure. Rings, chains, and talismans that whisper legends.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#featured" className="inline-flex items-center justify-center rounded-md bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 transition-colors">
                Shop Featured
              </a>
              <a href="#catalog" className="inline-flex items-center justify-center rounded-md bg-zinc-900 ring-1 ring-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 transition-colors">
                Browse All
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-zinc-400">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full bg-zinc-800 ring-2 ring-zinc-900" />
                <span className="h-8 w-8 rounded-full bg-zinc-800 ring-2 ring-zinc-900" />
                <span className="h-8 w-8 rounded-full bg-zinc-800 ring-2 ring-zinc-900" />
              </div>
              <p className="text-sm">Trusted by 2,500+ night wanderers</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-rose-600/20 to-transparent blur-2xl" />
            <div className="relative aspect-square rounded-2xl bg-[url('https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center ring-1 ring-zinc-800 shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
