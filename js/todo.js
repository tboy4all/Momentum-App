const toDoForm = document.getElementById('todo-form')
const toDoInput = document .querySelector('#todo-form input')
const toDoList = document.getElementById('todo-list')
const times = document.querySelector('#todo-form .times')
const dates = document.querySelector('#todo-form .dates')

let toDos = []

const TODOS_KEY = 'todos'

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteToDo(event) {
    const li = event.target.parentNode
    li.remove()
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id))
    saveToDos() 
}

function paintToDo(newTodo) {
    const li = document.createElement('li')
    li.id = newTodo.id
    const span = document.createElement('span')
    span.textContent = newTodo.text
    const timeSpan = document.createElement("span")
    timeSpan.textContent = newTodo.entryTime
    const dateSpan = document.createElement('span')
    dateSpan.textContent = newTodo.entryDate
    const button = document.createElement('button')
    button.textContent = '❌'
    button.addEventListener('click', deleteToDo)
    li.appendChild(button)
    li.appendChild(span)
    li.appendChild(timeSpan)
    li.appendChild(dateSpan)
    toDoList.appendChild(li)
}


function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value
    // console.log(times.value, "times")
    // console.log(dates.value, "dates")
    const newTime = times.value
    const newDate = dates.value
    toDoInput.value = ""
    times.value = ""
    dates.value = ""
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        entryTime: newTime,
        entryDate: newDate
    }
    toDos.push(newTodoObj)
    console.log(newTodoObj)
    paintToDo(newTodoObj)
    saveToDos()
}

toDoForm.addEventListener('submit', handleTodoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos) 
    toDos = parsedToDos
    parsedToDos.forEach(paintToDo)
}