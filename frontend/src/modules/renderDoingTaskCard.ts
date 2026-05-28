import { type Task, type updateTask } from "./types/task";
import {
  addToDoingCardsContainer,
  hideUserFeedback,
  showUserFeedback,
} from "./layoutUtilities";
import * as api from "./api";
import { populateDom } from "./populateDom";

export function renderDoingTaskCard(task: Task) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>${task.category.toUpperCase()}</p>
    <p>Assigned to: ${task.person}</p>
    <p>Created at: ${task.timestamp}</p>
  `;

  const doneButton = document.createElement("button");
  doneButton.textContent = "Mark as done";

  doneButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const updateTask: updateTask = { id: task.id, status: "done" };
    try {
      api.updateTask(updateTask);

      // Hiding old error message (if present) and rerendering cards to show updates in DOM
      hideUserFeedback();
      populateDom();
    } catch (error) {
      showUserFeedback(
        "Something went wrong when updating task, please try again later",
      );
      console.error(error);
    }
  });

  newCard.append(doneButton);
  addToDoingCardsContainer(newCard);
}
