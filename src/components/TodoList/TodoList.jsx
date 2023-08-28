import  { useState, useEffect } from "react";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos") || [];
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const AddTodoHandler = () => {
    if (newTodo.trim() == "") return;

    const nextSunday = new Date();
    nextSunday.setDate(
      nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7) + 7
    );

    const daysLeft = Math.min(
      7,
      Math.ceil((nextSunday - new Date()) / (1000 * 60 * 60 * 24))
    );

    const newTodoItem = {
      text: newTodo,
      completed: false,
      daysLeft: daysLeft,
    };
      setTodos([...todos, newTodoItem]);
  //  localStorage.setItem("todos", JSON.stringify(todos));
    setNewTodo("");
  };

  const compliteTodoHandler = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(todos));
  };

  const deleteTodoHandler = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
   // localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className={`container mt-4   ${styles.mainBox}`}>
      <div className="row">
        <div className="col-12">
          <h2 className={styles.todoHeading}>Todo Application</h2>
        </div>
      </div>
      <div className={`${styles.inputBox}`}>
        <div className="">
          <input
            type="text"
            placeholder="Your Todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <div className="">
          <button className={styles.addBtn} onClick={AddTodoHandler}>
            Add Todo
          </button>
        </div>
      </div>

      {todos.map((todo, index) => (
        <div className={`container ${styles.todoItem}`} key={index}>
          <div className="row">
            <div
              className={`col-12 ${
                todo.daysLeft < 0 ? styles.overdue : styles.todoList
              }`}
            >
              <div className={styles.todoitemValue}>
                <div>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => compliteTodoHandler(index)}
                  />
                </div>
                <div
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </div>
              </div>
              <div>{todo.completed ? null : `${todo.daysLeft} days left`}</div>
              <div>
                <button
                  className={`btn btn-danger ${styles.deleteBtn}`}
                  onClick={() => deleteTodoHandler(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
