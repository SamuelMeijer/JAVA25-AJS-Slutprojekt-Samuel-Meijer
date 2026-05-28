import { type Task, type updateTask } from "./types/task";
import { addToDoingCardsContainer } from "./layoutUtilities";
import * as api from "./api";

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

    // TODO: Fixa så det visas
    const updateTask: updateTask = { id: task.id, status: "done" };
    api.updateTask(updateTask);
  });

  newCard.append(doneButton);
  addToDoingCardsContainer(newCard);
}
