import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const url = 'http://localhost:8000/api/tasks';

export async function createNewTask(taskData) {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(taskData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const error = new Error('Error occurred while fetching tasks');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}
	const { task } = await response.json();

	return task;
}

export async function fetchTasks() {
	const response = await fetch(url);

	if (!response.ok) {
		const error = new Error('Error occurred while fetching tasks');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const tasks = await response.json();
	return tasks;
}

export async function fetchSingleTask({ id, signal }) {
	const response = await fetch(`${url}/${id}`, { signal });

	if (!response.ok) {
		const error = new Error('Error occurred while fetching this task');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const task = await response.json();
	return task;
}

export async function updateTask({ id, task }) {
	const response = await fetch(url + `/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ task_status: task }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const error = new Error('An error occurred while updating the task');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	return await response.json();
}

export async function deleteTask({ id }) {
	const fullURL = `${url}/${id}`;

	const response = await fetch(fullURL, {
		method: 'DELETE',
	});
	if (!response.ok) {
		const error = new Error(
			'An error occurred when attempting to delete the task.'
		);
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const data = await response.json();

	return data;
}
