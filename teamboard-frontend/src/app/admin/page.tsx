'use client'

import AppLayout from "@/components/AppLayout";
import CreateUserForm from "@/components/CreateUserForm";
import { createTask, getProjects, getUsers } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {

    const [title, setTitle] = useState("");
    const [projectId, setProjectId] = useState("");
    const [assignedToId, setAssignedToId] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    const router = useRouter();

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

        loadData(token);

    }, []);

    if (!authorized) return null;

    async function loadData(token: string) {
        const projectsData = await getProjects(token);
        const userData = await getUsers(token);

        setProjects(projectsData);
        setUsers(userData);
    }

    async function handleCreate(e: any) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        await createTask (
            {
                title,
                projectId,
                assignedToId,
            },
            token
        );

        alert('Task creada 🚀');

        setTitle("");
        setProjectId("");
        setAssignedToId("");
    }

    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-[420px]">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Crear Task
            </h1>
    
            <form onSubmit={handleCreate} className="space-y-4">
    
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                />
    
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              >
                <option value="">Seleccionar proyecto</option>
              
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              
              </select>
    
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                >
                <option value="">Asignar usuario</option>
              
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              
              </select>
    
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
                >
                Crear Task
              </button>
    
            </form>

            <p className="pt-5">
              <a href="/createuser">Crea o invita un usuario a tu empresa</a>
            </p>

          </div>
        </div>
      </AppLayout>
    )
}