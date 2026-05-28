import { type Task } from "./types/task";
import {
  addToDoneCardsContainer,
  hideUserFeedback,
  showUserFeedback,
} from "./layoutUtilities";
import { populateDom } from "./populateDom";
import * as api from "./api";

export function renderDoneTaskCard(task: Task) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>${task.category.toUpperCase()}</p>
    <p>Assigned to: ${task.person}</p>
    <p>Created at: ${task.timestamp}</p>
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      api.removeTask(task.id);

      // Hiding old error message (if present) and rerendering cards to show updates in DOM
      hideUserFeedback();
      populateDom();
    } catch (error) {
      showUserFeedback(
        "Something went wrong when deleting task from the server, please try again later",
      );
      console.error(error);
    }
  });

  newCard.append(removeButton);
  addToDoneCardsContainer(newCard);
}
