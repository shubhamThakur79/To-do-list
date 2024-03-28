const inputBox = document.querySelector(".input");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector(".todo-container");
let localTodoLists = [];

// Add event listener for the add button
addBtn.addEventListener("click", () => {
    let todoListValue = inputBox.value.trim();
    if (todoListValue !== "") {
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)]; // Remove duplicates
        localStorage.setItem("listItem", JSON.stringify(localTodoLists));
        addTodoDynamicElement(todoListValue);
        inputBox.value = "";
    } else {
        alert("Please write something");
    }
});

// Function to add a todo dynamically
const addTodoDynamicElement = (curElement) => {
    const li = document.createElement("li");
    li.innerHTML = `${curElement} <i class="fa-solid fa-trash trash-icon"></i>`;
    todoList.appendChild(li);
};

// Function to get todo list from local storage
const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("listItem")) || [];
};

// Show todo list when the page loads
const showTodoList = () => {
    localTodoLists = getTodoListFromLocal();
    localTodoLists.forEach(addTodoDynamicElement);
};

// Event delegation to handle click on trash icon
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("trash-icon")) {
        const todoText = event.target.parentElement.textContent.trim();
        const index = localTodoLists.indexOf(todoText);
        if (index !== -1) {
            localTodoLists.splice(index, 1);
            localStorage.setItem("listItem", JSON.stringify(localTodoLists));
            event.target.parentElement.remove();
        }
    }
});

// Show initial todo list
showTodoList();