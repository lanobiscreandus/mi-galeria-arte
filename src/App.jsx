import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Auth from './components/Auth';
import ArtistProfile from './components/ArtistProfile';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!session ? (
        <Auth />
      ) : (
        <>
          <nav className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
            <span className="font-bold text-xl text-indigo-600">ArtePanel</span>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
            >
              Cerrar Sesión
            </button>
          </nav>
          <ArtistProfile session={session} />
        </>
      )}
    </div>
  );
}
