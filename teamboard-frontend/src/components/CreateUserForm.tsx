'use client'

import { useEffect, useState } from "react";
import { createUsers } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function CreateUserForm() {

  const router = useRouter();
  const { token } = useAuth();

  const [authorized, setAuthorized] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  role: ""
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

  const validate = () => {
      let newErrors = {
        name: "",
        email: "",
        password: "",
        role: "",
      };
    
      let isValid = true;
    
      if (!name.trim()) {
        newErrors.name = "El nombre es obligatorio";
        isValid = false;
      }
    
      if (!email.trim()) {
        newErrors.email = "El email es obligatorio";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email inválido";
        isValid = false;
      }
    
      if (!password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
        isValid = false;
      } else if (password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        isValid = false;
      }

      if (!role.trim()) {
        newErrors.role = 'El rol es obligatorio';
        isValid = false;
      }
    
      setErrors(newErrors);
    
      return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return; 

    if (!token) return;

    try {

      await createUsers(token, {
        name,
        email,
        password,
        role,
      });

      toast.success('Usuario creado con éxito');
      window.location.href = '/dashboard'

      setName('');
      setEmail('');
      setPassword('');
      setRole('');  

    } catch (error) {
      toast.error('Error al crear usuario');
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
            value={name}
            onChange={(e) => setName(e.target.value )}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />

          {errors.name && (
              <p className="text-red-400 text-sm mb-2">{errors.name}</p>
          )}
    
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value )}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />

          {errors.email && (
              <p className="text-red-400 text-sm mb-2">{errors.email}</p>
          )}
    
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value )}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />

          {errors.password && (
              <p className="text-red-400 text-sm mb-2">{errors.password}</p>
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          >
            <option value="">Seleccionar rol</option>
            <option value="admin">Admin (puede gestionar el equipo)</option>
            <option value="member">Member (solo puede trabajar en proyectos)</option>
          </select>

           {errors.role && (
              <p className="text-red-400 text-sm mb-2">{errors.role}</p>
          )}
    
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg cursor-pointer"
          >
            Crear usuario
          </button>
        </form>
      </div>
    </div>
  );
}