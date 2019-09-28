class UI {
  constructor() {
    this.task = document.querySelector("#tasks");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.taskSubmit = document.querySelector(".task-submit");
    this.formState = "add";
  }

  showTasks(tasks) {
    // console.log(tasks);
    let output = "";
    tasks.forEach(task => {
      output += `
            <div class="card mb-3">
              <div class="card-body">
                <div>
                  <h5 class="card-title font-weight-bold">${task.title}</h5>
                  <p class="card-text">${task.body}</p>
                </div>
                <div class="task-options">
                  <a href="#" class="edit card-link" data-id="${task.id}"><i class="fa fa-edit"></i></a>
                  <a href="#" class="delete card-link" data-id="${task.id}"><i class="fa fa-trash"></i></a>
                </div>
              </div>
            </div>
        `;
    });
    this.task.innerHTML = output;
  }
  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container-tasks");
    const tasks = document.querySelector("#tasks");
    container.insertBefore(div, tasks);
    setTimeout(() => {
      this.clearAlert();
    }, 1500);
  }
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.taskSubmit.textContent = "Zapisz";
      this.taskSubmit.className = "task-submit btn btn-warning btn-block";
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "task-cancel btn btn-light mt-2 btn-block";
      cancelBtn.appendChild(document.createTextNode("Anuluj"));

      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector("form-end");
      cardForm.insertBefore(cancelBtn, formEnd);
    } else {
      this.taskSubmit.textContent = "Dodaj";
      this.taskSubmit.className = "task-submit btn btn-primary btn-block";
      if (document.querySelector(".task-cancel")) {
        document.querySelector(".task-cancel").remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
  clearIdInput() {
    this.idInput.value = "";
  }
}

export const ui = new UI();
