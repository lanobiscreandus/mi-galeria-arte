import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileData, setProfileData] = useState({ birth_year: '', art_type: 'Pintura', bio: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isRegistering) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error && data.user) {
        await supabase.from('profiles').insert([
          { id: data.user.id, email, ...profileData }
        ]);
        alert("Cuenta creada. ¡Bienvenido!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-2xl font-bold text-center mb-6">{isRegistering ? 'Crea tu Cuenta de Artista' : 'Iniciar Sesión'}</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" className="w-full p-3 border rounded-xl" onChange={e => setPassword(e.target.value)} required />
          {isRegistering && (
            <>
              <input type="number" placeholder="Año de Nacimiento" className="w-full p-3 border rounded-xl" onChange={e => setProfileData({...profileData, birth_year: e.target.value})} />
              <select className="w-full p-3 border rounded-xl" onChange={e => setProfileData({...profileData, art_type: e.target.value})}>
                <option value="Pintura">Pintura</option>
                <option value="Escultura">Escultura</option>
                <option value="Arte Digital">Arte Digital</option>
              </select>
              <textarea placeholder="Tu reseña artística" className="w-full p-3 border rounded-xl" onChange={e => setProfileData({...profileData, bio: e.target.value})} />
            </>
          )}
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">{loading ? 'Cargando...' : (isRegistering ? 'Registrarse' : 'Entrar')}</button>
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} className="w-full mt-4 text-indigo-600 text-sm">{isRegistering ? '¿Ya tienes cuenta? Entra' : '¿No tienes cuenta? Regístrate'}</button>
      </div>
    </div>
  );
};
export default Auth;
