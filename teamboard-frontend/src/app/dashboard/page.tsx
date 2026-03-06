'use client';

import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { completedTask } from "@/services/api";

export default function Dashboard() {
    const { token, logout } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else {
            getTasks(token)
              .then(setTasks)
              .catch(() => alert('Error cargando tareas'));
        }
    }, [token, router]);

    if (!token) return null;

    const handleCompleted = async (taskId: string) => {
        if (!token) return;

        try {
            await completedTask(taskId, token);
            const updateTask = tasks.map((task) => task.id === taskId ? { ...task, completed: true }: task);
            setTasks(updateTask);
        } catch (error) {
            alert('No podes completar la task');
        }
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">TeamBoard Dashboard</h1>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{task.title}</h2>

                <p className="text-gray-400 text-sm">
                  Project: {task.project?.name || "Sin proyecto"}
                </p>
              </div>

              <div className="flex items-center gap-4">

                {task.completed ? (
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-lg text-sm">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleCompleted(task.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                  >
                    Mark completed
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}