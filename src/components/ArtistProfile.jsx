import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import UploadArtwork from './UploadArtwork';

const ArtistProfile = ({ session }) => {
  const [artworks, setArtworks] = useState([]);

  const loadArt = async () => {
    const { data } = await supabase.from('artworks').select('*').eq('artist_id', session.user.id);
    setArtworks(data || []);
  };

  useEffect(() => { loadArt(); }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <UploadArtwork userId={session.user.id} onUploadSuccess={loadArt} />
      </div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        {artworks.map(art => (
          <div key={art.id} className="bg-white rounded-lg border overflow-hidden">
            <img src={art.media_url} className="h-40 w-full object-cover" />
            <div className="p-3">
              <p className="font-bold">{art.title}</p>
              <p className="text-gray-500 text-sm">${art.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ArtistProfile;
