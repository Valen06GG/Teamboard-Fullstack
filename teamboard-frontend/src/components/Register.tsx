'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { register } from "@/services/api";
import toast from "react-hot-toast";

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return;
        
        try {
          setLoading(true);

          await register(form);
          toast.success('Cuenta creada exitosamente!!!');

          router.push('/login');

        } catch (error) {
            console.error(error);
            toast.error('Error al crear cuenta');
        } finally {
          setLoading(false);
        }
    };

    const validate = () => {
      let newErrors = {
        name: "",
        email: "",
        password: "",
        companyName: "",
      };
    
      let isValid = true;
    
      if (!form.name.trim()) {
        newErrors.name = "El nombre es obligatorio";
        isValid = false;
      } else if (form.name.length < 3) {
        newErrors.name = "El nombre debe tener al menos 3 caracteres";
        isValid = false;
      }
    
      if (!form.email.trim()) {
        newErrors.email = "El email es obligatorio";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Email inválido";
        isValid = false;
      }

      if (!form.password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
        isValid = false;
      } else if (form.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        isValid = false;
      }
    
      if (!form.companyName.trim()) {
        newErrors.companyName = "El nombre de empresa es obligatorio";
        isValid = false;
      } else if (form.companyName.length < 2) {
        newErrors.companyName = "El nombre de empresa es muy corto";
        isValid = false;
      }
    
      setErrors(newErrors);
      return isValid;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Crea tu cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <label className="text-sm text-gray-400">Nombre Completo</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="text-red-400 text-sm mb-3">{errors.name}</p>
          )}

          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          {errors.email && (
            <p className="text-red-400 text-sm mb-3">{errors.email}</p>
          )}

          <label className="text-sm text-gray-400">contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          {errors.password && (
            <p className="text-red-400 text-sm mb-3">{errors.password}</p>
          )}

          <label className="text-sm text-gray-400">Nombre de Empresa</label>
          <input
            type="text"
            name="companyName"
            placeholder="Nombre de empresa"
            value={form.companyName}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          {errors.companyName && (
            <p className="text-red-400 text-sm mb-3">{errors.companyName}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-semibold mt-2 cursor-pointer"
          >
            {loading ? "Creando cuenta..." : "Crear una cuenta"}
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
    )
}