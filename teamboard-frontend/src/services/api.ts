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

export async function createTask(data: any, token: string) {
    const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('No se pudo crear la task');
    }

    return response.json();
}

export async function getProjects(token: string) {
    const response = await fetch('http://localhost:3001/projects', {
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
  const response = await fetch("http://localhost:3001/users", {
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
    const response = await fetch(`http://localhost:3001/projects/${projectId}/tasks`, {
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
  const response = await fetch("http://localhost:3001/users", {
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

export async function createProject(token: string, data: string) {
  const response = await fetch("http://localhost:3001/projects", {
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