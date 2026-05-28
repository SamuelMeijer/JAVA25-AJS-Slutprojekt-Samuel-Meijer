import type { Task, updateTask } from "./types/task";

export async function getAllTasks(): Promise<Task[]> {
  const url = "http://localhost:3000/api/tasks/";

  const resp = await fetch(url);

  if (resp.ok) {
    const data = await resp.json();

    const tasks: Task[] = data.map(
      ({
        id,
        title,
        description,
        category,
        status,
        person,
        timestamp,
      }: Task) => ({
        id,
        title,
        description,
        category,
        status,
        person,
        timestamp,
      }),
    );

    return tasks;
  } else {
    if (resp.status === 404) throw new Error("Error: No tasks found");
    else
      throw new Error(
        "Something went wrong when fetching tasks from the server, please try again later",
      );
  }
}

export async function updateTask(task: updateTask) {
  const url = `http://localhost:3000/api/tasks/${task.id}`;

  // Kommer enbart innehålla antigen person eller status beroende på vilken task som uppdateras
  let bodyObj = {};
  if (task.person) {
    bodyObj = { person: task.person };
  } else if (task.status) {
    bodyObj = { status: task.status };
  }

  const options = {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  };

  // TODO: Funkar - Men fixa till som det ska vara
  const resp = await fetch(url, options);
  if (resp.ok) {
    const data = await resp.json();
    console.log("data: ", data);
  } else {
    if (resp.status === 404)
      throw new Error("Error: No tasks with that id found");
    else
      throw new Error(
        "Something went wrong when updating task, please try again later",
      );
  }
}

// TODO: Add task

// TODO: Remove task
