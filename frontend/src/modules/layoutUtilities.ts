// Elements
const newTasksCardsContainer = document.querySelector(
  ".newTasksCardsContainer",
) as HTMLDivElement;
const doingTasksCardsContainer = document.querySelector(
  ".doingTasksCardsContainer",
) as HTMLDivElement;
const doneTasksCardsContainer = document.querySelector(
  ".doneTasksCardsContainer",
) as HTMLDivElement;
const userFeedbackP = document.getElementById(
  "userFeedback",
) as HTMLParagraphElement;

export function emptyCardsContainers() {
  newTasksCardsContainer.innerHTML = "";
  doingTasksCardsContainer.innerHTML = "";
  doneTasksCardsContainer.innerHTML = "";
}

export function addToNewCardsContainer(newCard: HTMLDivElement) {
  newTasksCardsContainer.append(newCard);
}

export function addToDoingCardsContainer(newCard: HTMLDivElement) {
  doingTasksCardsContainer.append(newCard);
}

export function addToDoneCardsContainer(newCard: HTMLDivElement) {
  doneTasksCardsContainer.append(newCard);
}

export function showUserFeedback(feedback: string) {
  userFeedbackP.classList.replace("hideFeedback", "showFeedback");
  userFeedbackP.innerText = feedback;
}

export function hideUserFeedback() {
  userFeedbackP.classList.replace("showFeedback", "hideFeedback");
  userFeedbackP.innerText = "";
}
