'use client';

import { useAuth } from "@/context/AuthContext";
import { loginRequest } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginRequest(email, password);
            login(data.access_token);
            window.location.href = '/dashboard';
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-80 p-6 border rounded-xl"
          >
            <h1 className="text-xl font-bold text-center">Login</h1>
    
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <button className="bg-black text-white p-2 rounded cursor-pointer">
              Ingresar
            </button>
          </form>
        </div>
    )
}