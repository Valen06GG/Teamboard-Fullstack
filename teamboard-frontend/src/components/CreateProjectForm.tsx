import { useAuth } from "@/context/AuthContext";
import { createProject } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateProjectForm() {
    const { token } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
            const token = localStorage.getItem('token');
    
            if (!token) {
                router.push('/login');
                return;
            }
    
            const decode: any = jwtDecode(token);
    
            if (decode.role !== 'admin') {
                return;
            }
    
            setAuthorized(true);
        }, []);
    
        if (!authorized) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) return;

        try {
            await createProject(token, form);

            alert('Proyecto creado');

            setForm({
                name: '',
                description: ''
            });
        } catch (error) {
            alert('Error al crear el proyecto');
        }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-6 rounded-x1 max-x-md"
        >
            <h2 className="text-x1 font-semibold mb-4">
                Crear Proyecto
            </h2>

            <input 
            type="text" 
            placeholder="Nombre del proyecto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700"
            />

            <input 
            type="text" 
            placeholder="Descripcion"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700"
            />

            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
            >
                Crear Proyecto
            </button>
        </form>
    )
}