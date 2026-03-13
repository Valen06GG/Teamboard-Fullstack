'use client';

import { useAuth } from "@/context/AuthContext";
import { loginRequest } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
      email: '',
      password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return; 

        try {
            const data = await loginRequest(email, password);
            login(data.access_token);
            window.location.href = '/dashboard';

        } catch (error) {
            alert('Login fallido');
        }
    };

    const validate = () => {
        let newErrors = {
          email: "",
          password: "",
        };
      
        let isValid = true;
      
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
      
        setErrors(newErrors);
        return isValid;
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          TeamBoard
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="email@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mb-3">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400">Contraseña</label>
            <input
              type="contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mb-3">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            Ingresar
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          ¿Aún no tienes una cuenta?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-400"
          >
            Registro
          </Link>
        </p>

      </div>
    </div>
  );
}