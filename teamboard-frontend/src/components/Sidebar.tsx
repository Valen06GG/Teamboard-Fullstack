'use client'

import { useRouter } from "next/navigation"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const { logout } = useAuth()
    const [role, setRole] = useState<string | null>(null);
    const [logged, setIsLogged] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if(!token) return;

      const decode: any = jwtDecode(token);
      setRole(decode.role);
      setIsLogged(true)
    }, []);

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
            <h1 className="text-2x1 font-bold mb-10">TeamBorad</h1>

            <nav className="flex flex-col">

                <Link
                  href='/'
                  className="hover:bg-gray-800 p-1 rounded"
                >
                  Inicio
                </Link>

                <Link
                href='/dashboard'
                className="hover:bg-gray-800 p-1 rounded"
                >
                  Dashboard
                </Link>

                <Link
                href='/projects'
                className="hover:bg-gray-800 p-1 rounded"
                >
                  Proyectos
                </Link>

                <Link
                  href='/team'
                  className="hover:bg-gray-800 p-1 rounded"
                >
                  Equipo
                </Link>

              {role === 'admin' && (
                <Link
                href='/admin'
                className="hover:bg-gray-800 p-1 rounded"
                >
                  Admin
                </Link>
                )}

                {!setIsLogged && (
          <>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Registro
            </Link>
          </>
        )}  
            </nav>
        </aside>
    )
}