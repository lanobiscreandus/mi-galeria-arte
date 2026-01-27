import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import ArtistProfile from './components/ArtistProfile';
import PublicGallery from './components/PublicGallery';
import AdminPanel from './components/AdminPanel';
import { Palette, User, Info, ShoppingCart } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home'); 

  // RECUERDA: Pon aquí tu correo para ser el administrador
  const ADMIN_EMAIL = "tu-correo@ejemplo.com"; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const Navbar = () => (
    <nav className="absolute top-0 w-full z-50 flex justify-center p-8">
      <div className="flex gap-10 text-[11px] uppercase tracking-[0.3em] font-bold text-white/80">
        <button onClick={() => setView('home')} className="hover:text-white transition flex items-center gap-2">
          <Palette size={14}/> Arte
        </button>
        
        {session?.user.email === ADMIN_EMAIL && (
          <button onClick={() => setView('admin')} className="text-amber-200 underline">Panel Admin</button>
        )}

        <button onClick={() => setView('login')} className="hover:text-white transition flex items-center gap-2">
          <User size={14}/> {session ? 'Mi Perfil' : 'Comunidad'}
        </button>
        <button className="hover:text-white transition hidden md:flex items-center gap-2"><ShoppingCart size={14}/> Compra</button>
      </div>
    </nav>
  );

  if (view === 'admin' && session?.user.email === ADMIN_EMAIL) return <AdminPanel goBack={() => setView('home')} />;
  
  if (view === 'login') {
    if (!session) return <Auth goBack={() => setView('home')} />;
    return <ArtistProfile session={session} />;
  }

  return (
    <div className="relative">
      <Navbar />
      
      <header className="hero-bg h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-7xl md:text-9xl text-white font-title mb-4 drop-shadow-2xl opacity-95">
            Tu Galería Online
          </h1>
          <div className="w-24 h-1 bg-[#e9d5ca] mx-auto mb-8 rounded-full"></div>
          <p className="max-w-xl text-white/90 text-lg font-light italic leading-loose tracking-wide backdrop-blur-[2px]">
            "El arte es la libertad de expresar lo que el alma no puede decir con palabras."
          </p>
          <div className="mt-12">
            <button 
              onClick={() => window.scrollTo({top: 900, behavior: 'smooth'})} 
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full hover:bg-white hover:text-[#5a5a5a] transition-all duration-500 font-bold tracking-widest text-xs uppercase"
            >
              Explorar Colección
            </button>
          </div>
        </div>
      </header>

      <main className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-title text-center mb-16 text-[#4a4a4a]">
          Artistas Destacados
        </h2>
        <PublicGallery />
      </main>

      <footer className="bg-[#e9d5ca] text-[#5a5a5a] p-10 text-center text-xs tracking-widest uppercase font-bold">
        &copy; 2026 Tu Galería Online - Pinceladas de Libertad
      </footer>
    </div>
  );
}
