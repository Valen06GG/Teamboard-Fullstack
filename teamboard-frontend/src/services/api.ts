const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginRequest(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Las credenciales son incorrectas');
    }

    return response.json();
}

export async function getTasks(token: string) {
    const response = await fetch(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al cargar las tasks');
    }

    return response.json();
}

export async function completedTask(taskId: string, token: string) {
    const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
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
        throw new Error('No se pudo completar la task');
    }
    return response.json();
}

export async function createTask(data: any, token: string) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        console.log("ERROR BACKEND:", result);
        throw new Error(result.message || 'No se pudo crear la task');
    }

    return result;
}

export async function getProjects(token: string) {
    const response = await fetch(`${API_URL}/projects`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudieron cargar los proyectos');
    }

    return response.json();
}

export async function getUsers(token: string) {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('No se pudieron cargar los usuarios');
  }

  return response.json();
}

export async function getProjectsTasks(projectId: string, token: string) {
    const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error cargando tasks');
    }

    return response.json();
}

export async function createUsers(token: string, userData: any) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Error al crear al usuario');
  }

  return response.json();
}

export async function createProject(token: string, data: { name: string, description: string }) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al crear el proyecto');
  }

  return response.json();
}

export async function deleteUser(token: string, userId: string) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if (!res) {
        throw new Error('Error eliminando usuario');
    }

    return res.json();
}

export async function register(data: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  if (!res.ok) {
    throw new Error("Error al registrar usuario");
  }

  return res.json();
};
