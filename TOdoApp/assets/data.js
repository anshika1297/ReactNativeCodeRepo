import {openDatabase} from 'expo-sqlite';

const db = openDatabase("todoApp.db")
const tbl = "taskListTable";

export function ExecuteSql(db, query, params) {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        (e) => reject(e)
      );
    });
  });
}


  const addTask = () => {
    const newData = {
      id: Date.now().toString(),
      task: inputTask,
      status: false
    };
    setTodo([...todo, newData]);
    setdata(todo);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: newText };
      } else {
        return todo;
      }
    });
    setTodo(updatedTodos);
    setdata(updatedTodos);
  };

  const toggleCompleted = (id) => {
    setToggle(!toggle);
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodo(updatedTodos);
    setdata(updatedTodos);
  };
  const deleteTask = (id) => {
    const updatedTodos = todo.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      } 
    });
    setTodo(updatedTodos);
    setdata(updatedTodos);
  };

  useEffect(() => {
    const todos = getdata();
    if(todos.length)
    setTodo(todos);
  }, []);