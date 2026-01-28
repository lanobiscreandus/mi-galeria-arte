import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import ArtistProfile from './components/ArtistProfile';
import PublicGallery from './components/PublicGallery';
import AdminPanel from './components/AdminPanel';
import { ShoppingBag, User, Search } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home'); 
  const ADMIN_EMAIL = "tu-correo@ejemplo.com"; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  if (view === 'admin' && session?.user.email === ADMIN_EMAIL) return <AdminPanel goBack={() => setView('home')} />;
  if (view === 'login') {
    if (!session) return <Auth goBack={() => setView('home')} />;
    return <ArtistProfile session={session} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR: Minimalista y transparente */}
      <nav className="absolute top-0 w-full z-50 px-8 py-6 flex justify-between items-center text-white/90">
        <div className="text-xs font-bold tracking-[0.2em] uppercase">Tu Galería</div>
        <div className="flex gap-6">
           <button onClick={() => setView('login')} className="hover:text-white transition"><User size={20}/></button>
           <button className="hover:text-white transition"><ShoppingBag size={20}/></button>
        </div>
      </nav>

      {/* HERO SECTION: Tal cual la imagen */}
      <header className="hero-oil-texture h-[85vh] flex items-center justify-center px-4">
        {/* Capa oscura suave para legibilidad */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Caja de cristal central */}
        <div className="glass-box relative z-10 p-12 md:p-16 rounded-[3rem] max-w-4xl w-full text-center flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 drop-shadow-md">
            Tu Galería Online
          </h1>
          <p className="text-white/90 text-sm md:text-lg font-light tracking-wide mb-10 max-w-xl mx-auto">
            Descubre la belleza en cada pincelada. Un espacio curado para amantes del arte y creadores visionarios.
          </p>

          {/* BOTONES FLUIDOS Y PASTEL */}
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            {/* Botón Arena (Izquierda) */}
            <button 
               onClick={() => document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })}
               className="bg-[#E8DCC4] text-[#5A5046] px-10 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-[#dbcca9] transition shadow-lg"
            >
              EXPLORAR OBRAS
            </button>
            
            {/* Botón Verde Salvia (Derecha) */}
            <button 
               onClick={() => setView('login')}
               className="bg-[#9FB8AD] text-white px-10 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-[#8da89c] transition shadow-lg"
            >
              VENDER MI ARTE
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main id="galeria" className="flex-grow py-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <PublicGallery />
      </main>

      <footer className="text-center py-8 text-[#8a8a8a] text-xs uppercase tracking-widest">
        &copy; 2026 Tu Galería Online
      </footer>
    </div>
  );
}
