import type { Task } from "./types/task";

export async function getAllTasks(): Promise<Task[]> {
  const url = "http://localhost:3000/api/tasks/";

  const resp = await fetch(url);

  if (resp.ok) {
    const data = await resp.json();

    // GÖR OM TILL TASK
    console.log("data: ", data);
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
