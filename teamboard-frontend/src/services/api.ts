const API_URL = 'http://localhost:3001';

export async function loginRequest(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Credentials are incorrect');
    }

    return response.json();
}

export async function getTasks(token: string) {
    const response = await fetch('http://localhost:3001/tasks', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error retrieving tasks');
    }

    return response.json();
}

export async function completedTask(taskId: string, token: string) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            completed: true,
        })
      },
    );

    if (!response.ok) {
        throw new Error('No se pudo completar las task');
    }
    return response.json();
}