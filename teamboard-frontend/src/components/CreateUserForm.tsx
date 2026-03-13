'use client'

import { useEffect, useState } from "react";
import { createUsers } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function CreateUserForm() {

  const router = useRouter();
  const { token } = useAuth();

  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const decode: any = jwtDecode(token);

    if (decode.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setAuthorized(true);
  }, [])

  if (!authorized) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) return;

    try {

      await createUsers(token, form);

      alert('Usuario creado con éxito');

      setForm({
        name: '',
        email: '',
        password: '',
        role: 'member'
      });

    } catch (error) {
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-[420px]">
        <form
          onSubmit={handleSubmit}
          className="bg-gray- p-6 rounded-xl max-w-md"
        >
    
          <h2 className="text-xl font-semibold mb-4">
            Crear usuario
          </h2>
    
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />
    
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />
    
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />
    
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
          >
            Crear usuario
          </button>
        </form>
      </div>
    </div>
  );
}