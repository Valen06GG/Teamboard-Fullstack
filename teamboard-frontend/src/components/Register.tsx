'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        companyName: ""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            setLoading(true);

            const res = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (!res.ok) {
                throw new Error('Register failed')
            }

            router.push('/login');


        } catch (error) {
            console.error(error);
            alert('Error creating account');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="companyName"
            placeholder="Company name"
            value={form.companyName}
            onChange={handleChange}
            required
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-semibold mt-2"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
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