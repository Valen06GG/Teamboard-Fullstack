'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function HomeNavbar() {
  const { logout } = useAuth()
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return

    const decode: any = jwtDecode(token)

    setRole(decode.role)
    setIsLogged(true)
  }, [])

  return (
    <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800 bg-gray-950/60 backdrop-blur">

      <h1 className="text-xl font-bold text-white">
        TeamBoard
      </h1>

      <nav className="flex items-center gap-6">

        <Link
            href="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

        {isLogged && (
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-white transition"
          >
            Dashboard
          </Link>
        )}

        {isLogged && (
          <Link
            href="/projects"
            className="text-gray-300 hover:text-white transition"
          >
            Projects
          </Link>
        )}

        {role === "admin" && (
          <Link
            href="/admin"
            className="text-gray-300 hover:text-white transition"
          >
            Admin
          </Link>
        )}

        {!isLogged && (
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
              Get Started
            </Link>
          </>
        )}

        {isLogged && (
          <button
            onClick={() => {
                  logout();
                  window.location.href = '/login'
                }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        )}

      </nav>

    </header>
  )
}