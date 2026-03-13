'use client'

import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext"
import { getUsers } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeamPage() {
    const { token } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
       if (!token) return;

    getUsers(token)
      .then(setUsers)
      .catch(() => alert("Error al cargar usuarios"));

    const decoded: any = jwtDecode(token);
    setRole(decoded.role);

    }, [token]);

    if (!token) return null;

    return (
    <AppLayout>

      <div className="text-white max-w-4xl">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Miembros del equipo
          </h1>

          {role === 'admin' && (
            <Link
              href="/createuser"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              + Agregar usuario
            </Link>
          )}

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">

          {users.map((user) => (

            <div
              key={user.id}
              className="flex justify-between items-center p-4"
            >

              <div>

                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-gray-400 text-sm">
                  {user.email}
                </p>

              </div>

              <span
                className={`text-sm px-3 py-1 rounded-lg ${
                  user.role === 'admin'
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {user.role}
              </span>

            </div>

          ))}

        </div>

      </div>

    </AppLayout>
  );
}