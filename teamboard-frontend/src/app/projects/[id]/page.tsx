'use client'

import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { getProjectsTasks } from "@/services/api";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProjectPage() {
    const { id  } = useParams();
    const { token } = useAuth();

    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        if (!token) return; 

        getProjectsTasks(id as string, token)
          .then(setTasks)
          .catch(() => toast.error('Error cargando las tasks'));
    }, [token, id]);

    return (
        <AppLayout>
            <h1 className="text-3x1 font-blod text-white mb-10">
                Tareas del proyecto
            </h1>

            <div className="grid gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {task.title}
                      </h2>
                    </div>
                      {task.completed ? (
                        <span className="text-green-400 text-sm">
                          Completado
                        </span>
                      ) : (
                      <span className="text-yellow-400 text-sm">
                        Pendiente
                      </span>
                    )}
                  </div>
                ))}
            </div>
        </AppLayout>
    )
}