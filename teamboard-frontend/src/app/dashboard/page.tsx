'use client';

import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const { token } = useAuth();
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

    return (
        <div className="p-10">
            <h1 className="text-2-1x font-bold mb-4">Mis Tasks</h1>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                    key={task.id}
                    className="border p-3 rounded flex justify-between"
                    >
                      <span>{task.title}</span>
                      <span>
                        {task.completed ? "✅" : "⏳"}
                      </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}