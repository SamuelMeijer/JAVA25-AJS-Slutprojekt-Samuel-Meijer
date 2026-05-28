import {
  addToDoingCardsContainer,
  addToDoneCardsContainer,
  addToNewCardsContainer,
  emptyCardsContainers,
  hideUserFeedback,
  showUserFeedback,
} from "./layoutUtilities";
import type { Task, updateTask } from "./types/task";
import * as api from "./api";

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

function renderNewTaskCard(task: Task) {
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

  // TODO: Flytta till separat fil för bättre readability?
  assignForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const person = (assignForm.elements.namedItem("person") as HTMLInputElement)
      .value;

    if (person && person.trim() !== "") {
      const updateTask: updateTask = { id: task.id, person: person.trim() };
      api.updateTask(updateTask);

      // TODO: Rerender cards så uppdateringar visas. - Inte bestämt hur än
      hideUserFeedback();
    } else {
      showUserFeedback(
        "Must provide a valid value when assigning a task to a person",
      );
    }
  });

  newCard.append(assignForm);
  addToNewCardsContainer(newCard);
}

function renderDoingTaskCard(task: Task) {
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

  // TODO: Flytta till separat fil för bättre readability?
  doneButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // TODO: Fixa så det visas
    const updateTask: updateTask = { id: task.id, status: "done" };
    api.updateTask(updateTask);
  });

  newCard.append(doneButton);
  addToDoingCardsContainer(newCard);
}

function renderDoneTaskCard(task: Task) {
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
