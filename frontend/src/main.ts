// Imports
import { hideUserFeedback, showUserFeedback } from "./modules/layoutUtilities";
import { populateDom } from "./modules/populateDom";
import * as api from "./modules/api";
import "./style.css";

// Populating DOM with tasks
populateDom();

const newTaskForm = document.getElementById("newTaskForm") as HTMLFormElement;
newTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = (newTaskForm.elements.namedItem("title") as HTMLInputElement)
    .value;
  const description = (
    newTaskForm.elements.namedItem("description") as HTMLInputElement
  ).value;
  const category = (
    newTaskForm.elements.namedItem("category") as HTMLInputElement
  ).value;

  if (title.trim() === "" || description.trim() === "") {
    showUserFeedback("Title and Description must be provided");
  } else {
    try {
      api.addTask({
        title: title.trim(),
        description: description.trim(),
        category,
      });

      // Hiding old error message (if present) and rerendering cards to show updates in DOM
      hideUserFeedback();
      populateDom();
    } catch (error) {
      showUserFeedback(
        "Something went wrong when adding task, please try again later",
      );
      console.error(error);
    }
  }
});
