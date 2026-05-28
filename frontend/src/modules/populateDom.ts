import { renderTasks } from "./renderTasks";
import * as api from "./api";
import { emptyCardsContainers, showUserFeedback } from "./layoutUtilities";

// Fetching all tasks and populate DOM with cards
export async function populateDom() {
  emptyCardsContainers();

  try {
    const allTasksArr = await api.getAllTasks();

    if (allTasksArr.length > 0) {
      renderTasks(allTasksArr);
    } else {
      showUserFeedback("No tasks to show");
    }
  } catch (error) {
    showUserFeedback(
      "Something went wrong when fetching tasks from the server, please try again later",
    );
    console.error(error);
  }
}
