import { readFromLS, writeToLS, removeLS } from "./ls.js";
import { qsFn } from "./utilities.js";

let todoList = [];

export default class ToDo {
    constructor(key) {
        this._key = key;
    }

    addTodo() {
        let inputValue = qsFn("#addTask").value;
        if (inputValue !== "") {
            saveToDo(inputValue, this._key);
            renderToDoList(getToDos(this._key), qsFn("#todo-list"));
        };
    }

    insideListToDos() {
        const element = qsFn("#todo-list");
        renderToDoList(readFromLS(this._key), element);
    }
}

function getToDos(key) {
    /*
    check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull the list of todos from localStorage, update the local variable, and return it.
    key (String): The key under which the value is stored under in LS
    return {array} The value as an array of objects
    */

    if (todoList === null) {
        todoList = readFromLS(key);
    };
    
    return todoList;
}

function renderToDoList(taskList, element) {
    /*
    clear element (ul), and reappend data following.
    for each task in taskList, build a li element for the task, and append it to element.
    taskList (Array): The list of tasks to render to HTML
    element (Element): The DOM element to insert our taskList elements into.
    */

    element.replaceChildren();
    
    taskList.forEach(task => {
        element.append(renderOneToDo(task));
    });
}

function renderOneToDo(task) {
    const item = document.createElement("li");
    item.innerHTML = `<input type="checkbox" class=""><div class="task-name">${task.content}</div><input type="button" value="X" class="removeBtn">`;
    return item;
}

function saveToDo(task, key) {
    /* 
    build a todo object, add it to the todoList, and save the new list to local storage.
    key (String): The key under which the value is stored under in LS
    task (String): The text of the task to be saved.
    */
    let todoObj = {};
    const timestamp = new Date;
    const content = task;
    let bool = false;
    let completed  = bool ? true : false;

    todoObj = { id: timestamp, content: content, completed: completed };

    todoList.push(todoObj);
    removeLS(key);
    writeToLS(key, todoList);
}
