import ToDo from "./todo.js";
import { onTouchFn } from "./utilities.js";

const todo = new ToDo("todo");
const buttonFn = todo.addTodo;

onTouchFn("#addTaskBtn", buttonFn);