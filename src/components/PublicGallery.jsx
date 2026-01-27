import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Search, SlidersHorizontal } from 'lucide-react';

const PublicGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000); // Precio máximo inicial alto

  useEffect(() => {
    const fetchArt = async () => {
      const { data } = await supabase
        .from('artworks')
        .select('*, profiles(email, bio, art_type)');
      setArtworks(data || []);
    };
    fetchArt();
  }, []);

  // Lógica de filtrado combinada (Nombre + Precio)
  const filteredArt = artworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.profiles?.art_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = art.price <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="space-y-10">
      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por título o técnica (óleo, digital...)"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <SlidersHorizontal className="text-gray-400" size={20} />
          <span className="text-sm font-medium text-gray-600">Precio hasta: ${maxPrice}</span>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            className="accent-amber-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* RESULTADOS */}
      {filteredArt.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArt.map((art) => (
            <div key={art.id} className="group relative bg-white shadow-xl rounded-lg overflow-hidden transition-all hover:-translate-y-2">
              <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                <img src={art.media_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{art.profiles?.art_type}</span>
                <h3 className="text-2xl font-title mt-1 leading-tight">{art.title}</h3>
                <p className="text-gray-500 text-sm mt-2 italic">"{art.description?.substring(0, 60)}..."</p>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-xl font-bold">${art.price}</span>
                  <button className="bg-black text-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-amber-500 transition">
                    Ver Obra
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No encontramos obras que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default PublicGallery;
