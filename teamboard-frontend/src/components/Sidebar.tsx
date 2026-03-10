'use client'

import { useRouter } from "next/navigation"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const { logout } = useAuth()
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if(!token) return;

      const decode: any = jwtDecode(token);
      setRole(decode.role);
    }, []);

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
            <h1 className="text-2x1 font-bold mb-10">TeamBorad</h1>

            <nav className="flex flex-col">
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
                  Projects
                </Link>

              {role === 'admin' && (
                <Link
                href='/admin'
                className="hover:bg-gray-800 p-1 rounded"
                >
                  Admin
                </Link>
                )}
            </nav>
        </aside>
    )
}