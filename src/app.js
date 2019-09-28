import { http } from "./http";
import { ui } from "./ui";
import "./index.css";

// Get tasks on DOM load

document.addEventListener("DOMContentLoaded", getTasks);
document.querySelector(".task-submit").addEventListener("click", addTask);

const tasksSection = document.querySelector("#tasks");

tasksSection.addEventListener("click", deleteTask);
tasksSection.addEventListener("click", enableEdit);

document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getTasks() {
  http
    .get("http://localhost:3000/todos")
    .then(data => ui.showTasks(data))
    .catch(err => console.log(err));
}

// Submit task
function addTask() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  const data = {
    title,
    body
  };

  // Walidacja inputów
  if (title === "") {
    ui.showAlert("Wypełnij pole z nazwą", "alert alert-danger");
  } else {
    if (id === "") {
      // Stwórz taska
      http
        .post("http://localhost:3000/todos", data)
        .then(data => {
          ui.showAlert("dodano zadanie", "alert alert-success");
          ui.clearFields();
          getTasks();
        })
        .catch(err => console.log(err));
    } else {
      // Zaktualizuj taska
      http
        .put(`http://localhost:3000/todos/${id}`, data)
        .then(data => {
          ui.showAlert("zadanie zaktualizowane", "alert alert-success");
          ui.changeFormState("");
          getTasks();
        })
        .catch(err => console.log(err));
    }
  }
}

function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("You sure?")) {
      http
        .delete(`http://localhost:3000/todos/${id}`)
        .then(data => {
          ui.showAlert("zadanie usunięte", "alert alert-success");
          getTasks();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.parentElement.previousElementSibling
        .firstElementChild.textContent;
    const body =
      e.target.parentElement.parentElement.previousElementSibling
        .lastElementChild.textContent;
    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains("task-cancel")) {
    ui.changeFormState("");
  }

  e.preventDefault();
}
