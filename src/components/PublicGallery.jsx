import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const PublicGallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArt = async () => {
      const { data } = await supabase.from('artworks').select('*, profiles(email, bio, art_type)');
      setArtworks(data || []);
    };
    fetchArt();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {artworks.map((art) => (
        <div key={art.id} className="group relative bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={art.media_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="p-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{art.profiles?.art_type}</span>
            <h3 className="text-2xl font-title mt-1">{art.title}</h3>
            <p className="text-gray-500 text-sm mt-2">Artista: {art.profiles?.email.split('@')[0]}</p>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-xl font-bold">${art.price}</span>
              <button className="text-sm font-bold border-b-2 border-black hover:text-amber-600 hover:border-amber-600 transition">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PublicGallery;
