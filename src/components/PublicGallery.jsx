import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search } from 'lucide-react';

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
    <div className="flex flex-col lg:flex-row gap-12">
      
      {/* 1. BUSCADOR (Izquierda o Arriba) */}
      <aside className="lg:w-1/4 space-y-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#e9d5ca]/30 sticky top-8">
          <h3 className="text-xl mb-4 text-[#6d5e48]">Filtrar Obras</h3>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar (ej. Óleo, Paisaje)..."
              className="w-full pl-10 pr-4 py-3 bg-[#f9f9f9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4e2d4] text-gray-600 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="mt-6 p-4 bg-[#f3e5ab]/20 rounded-2xl text-sm text-[#8a8a8a]">
            <p>💡 Tip: No necesitas registrarte para disfrutar del arte. Solo inicia sesión si deseas contactar al artista.</p>
          </div>
        </div>
      </aside>

      {/* 2. REJILLA DE OBRAS (Derecha) */}
      <div className="lg:w-3/4">
        {filteredArt.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArt.map((art) => (
              <div key={art.id} className="group bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-[#e9d5ca]/30 transition-all duration-500 border border-transparent hover:border-[#e9d5ca]/40">
                
                {/* Imagen */}
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] mb-4 bg-gray-50 relative">
                   <img 
                    src={art.media_url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={art.title} 
                  />
                  {/* Etiqueta flotante de precio */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-[#5d5d5d] shadow-sm">
                    ${art.price}
                  </div>
                </div>

                {/* Textos */}
                <div className="px-2 pb-2 text-center">
                  <h3 className="text-2xl text-[#4a4a4a] mb-1">{art.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-[#9ca3af] mb-4">
                    {art.profiles?.art_type || 'Obra Maestra'}
                  </p>
                  
                  {/* Botón de Acción Suave */}
                  <button className="w-full bg-[#f4f1ea] text-[#6d6d6d] py-3 rounded-full font-semibold text-sm hover:bg-[#e9d5ca] hover:text-white transition-colors">
                    Ver Detalles de Compra
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-serif">No se encontraron obras con ese criterio...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicGallery;
