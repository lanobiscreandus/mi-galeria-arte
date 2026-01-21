import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const UploadArtwork = ({ userId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', price: '', description: '' });
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${Math.random()}.${fileExt}`;
    
    let { error: uploadError } = await supabase.storage.from('art-gallery').upload(filePath, file);
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('art-gallery').getPublicUrl(filePath);
      await supabase.from('artworks').insert([{ ...formData, media_url: publicUrl, artist_id: userId }]);
      onUploadSuccess();
      alert("Obra publicada");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-6 rounded-xl border space-y-4">
      <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full text-sm" required />
      <input type="text" placeholder="Título" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, title: e.target.value})} required />
      <input type="number" placeholder="Precio" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, price: e.target.value})} required />
      <textarea placeholder="Inspiración" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, description: e.target.value})} />
      <button className="w-full bg-black text-white py-2 rounded-lg">{uploading ? 'Subiendo...' : 'Publicar Obra'}</button>
    </form>
  );
};
export default UploadArtwork;
