'use client';

import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { completedTask } from "@/services/api";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
    const { token, logout } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<any[]>([]);
    const [companyName, setCompanyName] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token')

        if (!token) {
            return;
        } else {
            getTasks(token)
              .then(setTasks)
              .catch(() => alert('Error cargando tareas'));
        }

        const decode: any = jwtDecode(token);
        console.log(decode)

        setCompanyName(decode.companyName);
    }, []);

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
      <AppLayout>
        <div className="text-white">
          <div className="max-w-5xl">
    
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-bold">{companyName ? `${companyName} Dashboard`: 'Dashboard'}</h1>
    
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/login'
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </div>
    
            <div className="grid grid-cols-3 gap-6 mb-10">
    
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <h2 className="text-2xl font-bold">{tasks.length}</h2>
              </div>
    
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Completed</p>
                <h2 className="text-2xl font-bold">
                  {tasks.filter((t) => t.completed).length}
                </h2>
              </div>
    
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Pending</p>
                <h2 className="text-2xl font-bold">
                  {tasks.filter((t) => !t.completed).length}
                </h2>
              </div>
    
            </div>
    
            <div className="grid gap-4">
    
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
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
                      <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-600/20 text-green-400 px-3 py-1 rounded-lg text-sm"
                      >
                        Completed
                      </motion.span>
                    ) : (
                      <button
                        onClick={() => handleCompleted(task.id)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                      >
                        Mark completed
                      </button>
                    )}
    
                  </div>
                </motion.div>
              ))}
    
            </div>
          </div>
        </div>
      </AppLayout>
);
}