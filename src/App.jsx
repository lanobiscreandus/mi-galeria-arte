// Dentro de tu App.jsx, modifica el header y el Navbar:

const Navbar = () => (
  <nav className="absolute top-0 w-full z-50 flex justify-center p-8">
    <div className="flex gap-10 text-[11px] uppercase tracking-[0.3em] font-bold text-white/80">
      <button onClick={() => setView('home')} className="hover:text-white transition">Galería</button>
      <button onClick={() => setView('login')} className="hover:text-white transition">Comunidad</button>
      <button className="hover:text-white transition">Sobre el Arte</button>
    </div>
  </nav>
);

// En el return principal:
<header className="hero-bg h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
  <div className="relative z-10">
    <h1 className="text-7xl md:text-9xl text-white font-title mb-4 drop-shadow-2xl opacity-95">
      Tu Galería Online
    </h1>
    <div className="w-24 h-1 bg-[#e9d5ca] mx-auto mb-8 rounded-full"></div>
    <p className="max-w-xl text-white/90 text-lg font-light italic leading-loose tracking-wide backdrop-blur-[2px]">
      "El arte es la libertad de expresar lo que el alma no puede decir con palabras."
    </p>
    <div className="mt-12 flex gap-6 justify-center">
      <button onClick={() => window.scrollTo({top: 900, behavior: 'smooth'})} 
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full hover:bg-white hover:text-[#5a5a5a] transition-all duration-500 font-bold tracking-widest text-xs uppercase">
        Explorar
      </button>
    </div>
  </div>
</header>
