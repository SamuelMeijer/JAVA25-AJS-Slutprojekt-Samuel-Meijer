import { emptyCardsContainers } from "./layoutUtilities";
import type { Task } from "./types/task";

import { renderNewTaskCard } from "./renderNewTaskCard";
import { renderDoingTaskCard } from "./renderDoingTaskCard";
import { renderDoneTaskCard } from "./renderDoneTaskCard";

export function renderTasks(tasksArr: Task[]) {
  emptyCardsContainers();

  tasksArr.forEach((task) => {
    if (task.status === "new") {
      renderNewTaskCard(task);
    } else if (task.status === "doing") {
      renderDoingTaskCard(task);
    } else {
      renderDoneTaskCard(task);
    }
  });
}
