const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

let updateText = null;

function CreateToDoItems() {
  const value = todoValue.value.trim();
  if (value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
    return;
  }

  const isPresent = todo.some((element) => element.item === value);
  if (isPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `<div class="todo-text" title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${value}</div>
                  <div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="./images/pencil.png" alt="Edit todo" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="./images/delete.png" alt="Delete todo" />
                  </div>`;
  listItems.appendChild(li);

  todo.push({ item: value, status: false });
  setLocalStorage();

  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}



function ReadToDoItems() {
  todo.forEach((element) => {
    const li = document.createElement("li");
    const isCompleted = element.status;
    const textDecoration = isCompleted ? "style='text-decoration: line-through'" : "";
    const editButton = isCompleted
      ? ""
      : '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="./images/pencil.png" alt="Edit todo" />';
    const completionBadge = isCompleted
      ? '<img class="todo-controls" src="./images/check-mark.png" alt="Completed" />'
      : "";

    li.innerHTML = `<div class="todo-text" ${textDecoration} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${element.item}${completionBadge}</div>
                    <div>
                      ${editButton}
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="./images/delete.png" alt="Delete todo" />
                    </div>`;
    listItems.appendChild(li);
  });
}
ReadToDoItems();



function UpdateToDoItems(e) {
  const itemWrapper = e.closest("li");
  const textElement = itemWrapper.querySelector(".todo-text");
  if (textElement.style.textDecoration === "") {
    todoValue.value = textElement.textContent.trim();
    updateText = textElement;
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute("src", "./images/refresh.png");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  const newValue = todoValue.value.trim();
  if (newValue === "") {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
    return;
  }

  const isPresent = todo.some(
    (element) => element.item === newValue && element.item !== updateText.innerText.trim()
  );

  if (isPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  todo.forEach((element) => {
    if (element.item === updateText.innerText.trim()) {
      element.item = newValue;
    }
  });
  setLocalStorage();

  updateText.innerText = newValue;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "./images/plus.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully!");
}




function DeleteToDoItems(e) {
  const itemWrapper = e.closest("li");
  const deleteValue = itemWrapper.querySelector(".todo-text").innerText.trim();

  if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
    itemWrapper.setAttribute("class", "deleted-item");
    todoValue.focus();

    const index = todo.findIndex((element) => element.item === deleteValue);
    if (index !== -1) {
      todo.splice(index, 1);
    }

    setTimeout(() => {
      itemWrapper.remove();
    }, 1000);

    setLocalStorage();
  }
}



function CompletedToDoItems(e) {
  const textElement = e.parentElement.querySelector(".todo-text") || e;
  if (textElement.style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "./images/check-mark.png";
    img.className = "todo-controls";
    textElement.style.textDecoration = "line-through";
    textElement.appendChild(img);
    const editIcon = e.parentElement.querySelector("img.edit");
    if (editIcon) {
      editIcon.remove();
    }

    todo.forEach((element) => {
      if (textElement.innerText.trim() === element.item) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}



function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}



function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}
