import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ArrowLeft, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

const Auth = ({ goBack }) => {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isRegistering) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Error al registrar: " + error.message);
      else alert("¡Registro exitoso! Ya puedes configurar tu perfil.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 relative">
        
        {/* Botón Volver */}
        <button onClick={goBack} className="absolute top-6 left-6 text-gray-400 hover:text-black transition">
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-title mb-2">
            {isRegistering ? 'Únete al Arte' : 'Bienvenido'}
          </h2>
          <p className="text-gray-500 text-sm italic">
            {isRegistering ? 'Crea tu espacio artístico hoy' : 'Accede a tu panel de artista'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none" 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Contraseña segura" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none" 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition shadow-lg shadow-black/10 disabled:bg-gray-400"
          >
            {loading ? 'Procesando...' : (isRegistering ? <><UserPlus size={18}/> Crear Cuenta</> : <><LogIn size={18}/> Entrar</>)}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {isRegistering ? '¿Ya eres parte de la galería?' : '¿Quieres presentar tus obras?'}
          </p>
          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="mt-2 text-black font-bold border-b-2 border-amber-400 hover:text-amber-600 hover:border-amber-600 transition"
          >
            {isRegistering ? 'Inicia Sesión aquí' : 'Regístrate como Artista'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
