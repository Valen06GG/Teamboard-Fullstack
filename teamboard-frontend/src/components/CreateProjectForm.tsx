import { useAuth } from "@/context/AuthContext";
import { createProject } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateProjectForm() {
    const { token } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        description: ''
    })

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

        if (!validate()) return;

        if (!token) return;

        try {
            await createProject(token, {
                name,
                description
            });

            alert('Proyecto creado');

            setName('');
            setDescription('');
        } catch (error) {
            alert('Error al crear el proyecto');
        }
    };
    

    const validate = () => {
        let newErrors = {
            name: '',
            description: ''
        };

        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'El nombre del proyecto es obligatorio';
            isValid = false;
        } else if (name.length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = "La descripción es obligatoria";
            isValid = false;
        } else if (description.length < 5) {
            newErrors.description = "La descripción debe tener al menos 5 caracteres";
            isValid = false;
        }

         setErrors(newErrors);

        return isValid;
    }

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

            {errors.name && (
                <p className="text-red-400 text-sm mb-2">{errors.name}</p>
            )}

            <input 
            type="text" 
            placeholder="Descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value )}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700"
            />

            {errors.description && (
                <p className="text-red-400 text-sm mb-2">{errors.description}</p>
            )}

            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
            >
                Crear Proyecto
            </button>
        </form>
    )
}