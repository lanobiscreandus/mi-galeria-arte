import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, Heart } from 'lucide-react';

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
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.profiles?.art_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      
      {/* ENCABEZADO DE SECCIÓN (Título + Buscador) */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#E8DCC4] pb-6">
        <div>
          <h2 className="font-serif text-4xl text-[#4A403A]">Artistas Destacados</h2>
          <p className="text-[#8a8a8a] mt-2 font-light">Colección curada de la semana</p>
        </div>

        {/* Buscador estilo píldora */}
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Buscar..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white px-6 py-3 rounded-full border border-[#E8DCC4] focus:outline-none focus:border-[#9FB8AD] text-sm placeholder-gray-400 shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8DCC4] p-2 rounded-full text-[#5A5046] hover:bg-[#dccba9] transition">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* REJILLA DE TARJETAS (Estilo Imagen) */}
      {filteredArt.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredArt.map((art) => (
            <div key={art.id} className="art-card p-4 group cursor-pointer relative">
              
              {/* Imagen con esquinas redondeadas */}
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-gray-100 relative">
                 <img 
                  src={art.media_url} 
                  className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700" 
                  alt={art.title} 
                />
                {/* Botón de Like flotante */}
                <button className="absolute bottom-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white text-gray-400 hover:text-red-400 transition backdrop-blur-sm">
                  <Heart size={16} />
                </button>
              </div>

              {/* Información Minimalista */}
              <div className="px-1">
                <h3 className="font-bold text-[#4A403A] text-lg leading-tight">{art.title}</h3>
                <p className="text-xs text-[#9FB8AD] font-bold uppercase tracking-wider mt-1 mb-3">
                  {art.profiles?.art_type || 'Artista'}
                </p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <span className="text-[#4A403A] font-serif italic">${art.price}</span>
                  <span className="text-[10px] text-gray-400">Ver detalles</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-60">
          <p className="font-serif text-xl italic">No hay obras expuestas en este momento...</p>
        </div>
      )}
    </div>
  );
};

export default PublicGallery;
