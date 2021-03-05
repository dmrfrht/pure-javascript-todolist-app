const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearBtn = document.querySelector("#clear-todos")


function eventListeners() {
  form.addEventListener("submit", addTodo)
  document.addEventListener("DOMContentLoaded", loadAllTodos)
  secondCardBody.addEventListener("click", deleteTodo)
  filter.addEventListener("keyup", filterTodo)
  clearBtn.addEventListener("click", clearTodos)
}

eventListeners()

function infoMessage(type, message) {
  const alert = document.createElement("div")
  alert.className = `alert alert-${type} mt-2`
  alert.textContent = `${message}`

  firstCardBody.appendChild(alert)

  setTimeout(function() {
    alert.remove()
  }, 2000)
}

function getTodosFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos")) 
  }

  return todos
}

function addTodo(e) {
  const newTodo = todoInput.value.trim()

  if (newTodo === "") {
    infoMessage("danger", "Lütfen bir todo giriniz 😠😠😠😠")  
  } else {
    addTodoToUI(newTodo)
    addTodoToLocalStorage(newTodo)
    infoMessage("success", "Todo başarılı bir şekilde eklendi 😻😻😻")  
  }
  
  e.preventDefault()
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li")
  const link = document.createElement("a")

  link.href = "#"
  link.className = "delete-item"
  link.innerHTML = "<i class='fa fa-remove'></i>"
  listItem.className = "list-group-item d-flex justify-content-between"
  
  listItem.appendChild(document.createTextNode(newTodo))
  listItem.appendChild(link)

  todoList.appendChild(listItem)
  todoInput.value = ""
}

function addTodoToLocalStorage(newTodo) {
  let todos = getTodosFromLocalStorage()

  todos.push(newTodo)

  localStorage.setItem("todos", JSON.stringify(todos))
}

function loadAllTodos() {
  let todos = getTodosFromLocalStorage()

  todos.forEach(function(todo) {
    addTodoToUI(todo)
  })
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove()
    deleteTodoFromLocalStorage(e.target.parentElement.parentElement.textContent)
    infoMessage("success", "Todo başarılı bir şekilde silindi 😢😢😢😢😢😢😢")  
  }
}

function deleteTodoFromLocalStorage(delTodo) {
  let todos = getTodosFromLocalStorage()
  todos.forEach(function(todo, index) {
    if (todo === delTodo) {
      todos.splice(index, 1)
    }
  })

  localStorage.setItem("todos", JSON.stringify(todos))
}

function filterTodo(e) {
  const filterValue = e.target.value.toLowerCase()
  const listItems = document.querySelectorAll(".list-group-item")

  listItems.forEach(function(listItem) {
    const text = listItem.textContent.toLowerCase()

    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important")
    } else {
      listItem.setAttribute("style", "display: block")
    }
  })

}

function clearTodos() {
  if (confirm("Tümünü sileceksin. Emin misin?")) {
    while(todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild)
      localStorage.removeItem("todos")
    }
  }
}