import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Trash2, ArrowLeft } from 'lucide-react';

const AdminPanel = ({ goBack }) => {
  const [allArt, setAllArt] = useState([]);

  useEffect(() => {
    fetchEverything();
  }, []);

  async function fetchEverything() {
    const { data } = await supabase.from('artworks').select('*, profiles(email)');
    setAllArt(data || []);
  }

  async function deleteArtwork(id) {
    if (window.confirm("¿Seguro que quieres eliminar esta obra permanentemente?")) {
      const { error } = await supabase.from('artworks').delete().eq('id', id);
      if (!error) {
        setAllArt(allArt.filter(art => art.id !== id));
        alert("Obra eliminada.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={goBack} className="flex items-center gap-2 text-gray-600 mb-8 hover:text-black">
          <ArrowLeft size={20} /> Volver a la Galería
        </button>
        
        <h1 className="text-3xl font-bold mb-8">Panel de Moderación</h1>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Obra</th>
                <th className="p-4 font-semibold">Artista</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allArt.map(art => (
                <tr key={art.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={art.media_url} className="w-12 h-12 object-cover rounded" />
                    <span className="font-medium">{art.title}</span>
                  </td>
                  <td className="p-4 text-gray-500">{art.profiles?.email}</td>
                  <td className="p-4">${art.price}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => deleteArtwork(art.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
