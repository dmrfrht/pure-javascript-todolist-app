const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearBtn = document.querySelector("#clear-todos")


function eventListeners() {
  form.addEventListener("submit", addTodo)
}

eventListeners()

function addTodo(e) {
  const newTodo = todoInput.value.trim()

  if (newTodo === "") {
    infoMessage("danger", "Lütfen bir todo giriniz 😠😠😠😠")  
  } else {
    addTodoToUI(newTodo)
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

function infoMessage(type, message) {
  const alert = document.createElement("div")
  alert.className = `alert alert-${type} mt-2`
  alert.textContent = `${message}`

  firstCardBody.appendChild(alert)

  setTimeout(function() {
    alert.remove()
  }, 2000)
}