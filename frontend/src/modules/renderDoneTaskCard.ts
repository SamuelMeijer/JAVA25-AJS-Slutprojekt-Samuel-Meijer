import { type Task } from "./types/task";
import { addToDoneCardsContainer } from "./layoutUtilities";

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

  // TODO: Flytta till separat fil för bättre readability?
  removeButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // TODO: Fixa så task tas bort från DB och DOM
  });

  newCard.append(removeButton);
  addToDoneCardsContainer(newCard);
}
