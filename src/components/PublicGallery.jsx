import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, Palette } from 'lucide-react';

const PublicGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArt = async () => {
      const { data } = await supabase.from('artworks').select('*, profiles(*)');
      setArtworks(data || []);
    };
    fetchArt();
  }, []);

  const filteredArt = artworks.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Buscador Estilo Pastel */}
      <div className="max-w-md mx-auto relative group">
        <input 
          type="text" 
          placeholder="Buscar inspiración..."
          className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-full shadow-sm focus:ring-2 focus:ring-[#e9d5ca] outline-none text-gray-600 italic"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e9d5ca]" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArt.map((art) => (
          <div key={art.id} className="canvas-card bg-white p-4 hover:shadow-2xl hover:shadow-[#e9d5ca]/40">
            <div className="aspect-square overflow-hidden rounded-[1.5rem] mb-6 shadow-inner">
              <img src={art.media_url} className="w-full h-full object-cover" alt={art.title} />
            </div>
            <div className="px-2 pb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#b4a095] font-bold">
                {art.profiles?.art_type || 'Colección'}
              </span>
              <h3 className="text-2xl font-title text-[#4a4a4a] mt-1">{art.title}</h3>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-lg font-light text-[#8a8a8a]">${art.price}</span>
                <button className="bg-[#d4e2d4] text-[#5a6b5a] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#c4d2c4] transition-colors">
                  Ver Obra
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicGallery;
