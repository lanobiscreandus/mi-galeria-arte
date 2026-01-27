import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import ArtistProfile from './components/ArtistProfile';
import PublicGallery from './components/PublicGallery';
import AdminPanel from './components/AdminPanel';
import { Paintbrush, ShoppingCart, Info, User } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home'); 

  // CAMBIA ESTO POR TU CORREO REAL
  const ADMIN_EMAIL = "tu-correo@ejemplo.com"; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const Navbar = () => (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between p-6 text-white bg-black/20 backdrop-blur-sm">
      <div className="flex gap-8 text-sm uppercase tracking-widest font-semibold">
        <button onClick={() => setView('home')} className="hover:text-amber-400 flex items-center gap-2 border-b border-transparent hover:border-amber-400 transition">
          <Paintbrush size={16}/> Arte
        </button>
        <button className="hover:text-amber-400 flex items-center gap-2"><ShoppingCart size={16}/> Compra</button>
        
        {session?.user.email === ADMIN_EMAIL && (
          <button onClick={() => setView('admin')} className="text-amber-400 font-bold underline">PANEL ADMIN</button>
        )}

        <button onClick={() => setView('login')} className="hover:text-amber-400 flex items-center gap-2">
          <User size={16}/> {session ? 'Mi Perfil' : 'Venta'}
        </button>
        <button className="hover:text-amber-400 flex items-center gap-2"><Info size={16}/> Información</button>
      </div>
    </nav>
  );

  // Lógica de navegación
  if (view === 'admin' && session?.user.email === ADMIN_EMAIL) {
    return <AdminPanel goBack={() => setView('home')} />;
  }

  if (view === 'login') {
    if (!session) return <Auth goBack={() => setView('home')} />;
    return <ArtistProfile session={session} />;
  }

  return (
    <div className="relative">
      <Navbar />
      
      {/* SECCIÓN SUPERIOR (HERO) */}
      <header className="hero-bg h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl text-white font-title mb-6 drop-shadow-lg">
          Tu Galería Online
        </h1>
        <div className="max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-sm border border-white/20">
          <p className="text-white text-lg md:text-xl font-light leading-relaxed">
            Bienvenido al espacio donde el arte cobra vida. Conectamos a creadores visionarios 
            con coleccionistas apasionados. Explora obras únicas o únete a nuestra comunidad 
            para exhibir tu talento al mundo.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="bg-white text-black px-8 py-3 font-bold hover:bg-amber-400 transition">
              Explorar Obras
            </button>
            <button onClick={() => setView('login')} className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition">
              Vender mi Arte
            </button>
          </div>
        </div>
      </header>

      {/* SECCIÓN DE ARTISTAS Y OBRAS */}
      <main className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-title text-center mb-16 underline decoration-amber-500 underline-offset-8">
          Colección Disponible
        </h2>
        <PublicGallery />
      </main>

      <footer className="bg-black text-white p-10 text-center text-sm tracking-widest">
        &copy; 2026 TU GALERÍA ONLINE - UN ESPACIO PARA EL ARTE
      </footer>
    </div>
  );
}
