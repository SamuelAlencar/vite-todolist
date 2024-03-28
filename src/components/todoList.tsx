import { FormEvent, useState } from "react";

type Todo = {
  [x: string]: any;
  id: number;
  text: string;
  completed: boolean;
};

type ErrorMessageProps = boolean | undefined;

function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageProps>(false);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  function submitTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = (e.target as any).text.value;
    if (!text) {
      setErrorMessage(true);
      return;
    }
    addTodo(text);
    (e.target as any).reset();
    setErrorMessage(false);
  }

  function deleteTodo(id: number) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  }

  function todoToggle(id: number) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(newTodoList);
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>

      <form
        className="todo-form"
        onSubmit={(e) => {
          submitTodo(e);
        }}
      >
        <input
          type="text"
          name="text"
          placeholder="Add a todo"
          autoFocus
          className={errorMessage ? "error" : ""}
        />
        <br />
        <button type="submit">➕ Adicionar tarefa</button>
        <button onClick={() => setTodoList([])}>❌ Remover todas as tarefas</button>
      </form>
      {errorMessage ? (
        <span className="error">Insira um valor</span>
      ) : null}

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} className="todo">
            <input
              type="checkbox"
              name="checkbox"
              id="ckeckbox"
              checked={todo.completed}
              onChange={() => todoToggle(todo.id)}
            />
            <label
              htmlFor=""
              className={todo.completed ? "todo-text_completed" : "todo-text"}
            >
              {todo.text}
            </label>
            {todo.completed && (
              <button
                disabled={!todo.completed}
                className={
                  todo.completed ? "delete-button_completed" : `delete-button`
                }
                onClick={() => deleteTodo(todo.id)}
              >
                ❌ excluir tarefa
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
