'use client'

import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext"
import { getProjects } from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import CreateProjectForm from "@/components/CreateProjectForm";

export default function ProjectsPage() {
    const { token } = useAuth();
    const [projects, setProjects] = useState<any[]>();

    useEffect(() => {
        if(!token) return;

        getProjects(token)
          .then(setProjects)
          .catch(() => alert('Error cargando proyectos'));
    }, [token]);

    return (
        <AppLayout>
            <h1 className="text-3x1 font-bold text-white mb-10">
                Projects
            </h1>

            <CreateProjectForm />

            <div className="grid grid-cols-3 gap-6 pt-6">
                {projects?.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition cursor-pointer">
                        <h2 className="text-xl font-semibold text-white">
                          {project.name}
                        </h2>
        
                       <p className="text-gray-400 text-sm mt-2">
                          Ver tasks del proyecto
                        </p>
                      </div>
                    </Link>
                ))}
            </div>
        </AppLayout>
    )
}