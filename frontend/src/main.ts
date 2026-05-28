// IMPORTS
import * as api from "./modules/api";
import { renderTasks } from "./modules/renderTasks";
import { type Task } from "./modules/types/task";
import "./style.css";

let allTasksArr: Task[] = [];

// Fetching all tasks to populate cards
async function fetchTasks() {
  try {
    allTasksArr = await api.getAllTasks();

    if (allTasksArr.length > 0) {
      renderTasks(allTasksArr);
    }
  } catch (error) {
    console.error(error);
  }
}
fetchTasks();
