import * as api from "./modules/api";
import "./style.css";

// Fetching all tasks to populate cards
async function fetchTasks() {
  try {
    const allTasksArr = await api.getAllTasks();
    console.log(allTasksArr);
  } catch (error) {
    console.error(error);
  }
}
fetchTasks();
