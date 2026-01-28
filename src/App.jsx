import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import ArtistProfile from './components/ArtistProfile';
import PublicGallery from './components/PublicGallery';
import AdminPanel from './components/AdminPanel';
import { Palette, User } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home'); 
  const ADMIN_EMAIL = "tu-correo@ejemplo.com"; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  // Lógica de Vistas
  if (view === 'admin' && session?.user.email === ADMIN_EMAIL) return <AdminPanel goBack={() => setView('home')} />;
  
  if (view === 'login') {
    if (!session) return <Auth goBack={() => setView('home')} />;
    return <ArtistProfile session={session} />;
  }

  return (
    <div className="min-h-screen">
      {/* MENÚ SUPERIOR TRANSPARENTE (Solo lo esencial) */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center text-white/90 font-bold tracking-widest text-xs uppercase">
        <span>Tu Galería Online</span>
        <div className="flex gap-6">
           {session?.user.email === ADMIN_EMAIL && (
              <button onClick={() => setView('admin')} className="hover:text-amber-200 underline">Admin</button>
           )}
           {session && <button onClick={() => setView('login')}>Mi Perfil</button>}
        </div>
      </nav>

      {/* SECCIÓN HERO (Título + Bienvenida + Botones) */}
      <header className="hero-oil min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
        
        {/* Título Blanco Centrado */}
        <h1 className="text-6xl md:text-8xl text-white mb-6 drop-shadow-lg italic">
          Tu Galería Online
        </h1>
        
        {/* Texto Explicativo */}
        <p className="text-white/90 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed backdrop-blur-[2px] rounded-xl p-4">
          Un espacio donde el arte fluye. Descubre obras únicas pintadas con alma, 
          o únete a nuestra comunidad para compartir tu propia visión del mundo.
        </p>

        {/* Botones Redondeados y Pasteles */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          
          {/* Botón 1: Ver Galerías (Verde Pastel) */}
          <button 
            onClick={() => document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#d4e2d4] text-[#4a5d4a] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#c4dcc4] hover:scale-105 transition-all shadow-lg w-64 md:w-auto flex items-center justify-center gap-2"
          >
            <Palette size={18} /> Ver Obras
          </button>

          {/* Botón 2: Iniciar Sesión (Amarillo Pastel) */}
          <button 
            onClick={() => setView('login')}
            className="bg-[#f3e5ab] text-[#6d5e48] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#ece095] hover:scale-105 transition-all shadow-lg w-64 md:w-auto flex items-center justify-center gap-2"
          >
            <User size={18} /> {session ? 'Ir a mi Estudio' : 'Crear Cuenta / Entrar'}
          </button>
        </div>
      </header>

      {/* SECCIÓN DE OBRAS */}
      <main id="galeria" className="py-24 px-4 md:px-10 max-w-7xl mx-auto bg-[#fdfbf7]">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl text-[#5d5d5d] mb-4">Colección Disponible</h2>
          <div className="h-1 w-20 bg-[#e9d5ca] rounded-full"></div>
        </div>

        {/* Aquí cargamos la galería rediseñada */}
        <PublicGallery />
      </main>

      <footer className="text-center py-10 text-[#8a8a8a] text-sm bg-white">
        <p>&copy; 2026 Tu Galería Online. Hecho con amor al arte.</p>
      </footer>
    </div>
  );
}
