import { type Task, type updateTask } from "./types/task";
import {
  addToNewCardsContainer,
  hideUserFeedback,
  showUserFeedback,
} from "./layoutUtilities";
import * as api from "./api";
import { populateDom } from "./populateDom";

export function renderNewTaskCard(task: Task) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>${task.category.toUpperCase()}</p>
    <p>Created at: ${task.timestamp}</p>
  `;

  const assignForm = document.createElement("form");
  assignForm.innerHTML = `
    <input name="person" type="text" required placeholder="Assign to..." />
    <button type="submit">Assign</button>
  `;

  assignForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const person = (assignForm.elements.namedItem("person") as HTMLInputElement)
      .value;

    if (person && person.trim() !== "") {
      try {
        const updateTask: updateTask = { id: task.id, person: person.trim() };
        api.updateTask(updateTask);

        // Hiding old error message (if present) and rerendering cards to show updates in DOM
        hideUserFeedback();
        populateDom();
      } catch (error) {
        showUserFeedback(
          "Something went wrong when fetching tasks from the server, please try again later",
        );
        console.error(error);
      }
    } else {
      showUserFeedback(
        "Must provide a valid value when assigning a task to a person",
      );
    }
  });

  newCard.append(assignForm);
  addToNewCardsContainer(newCard);
}
