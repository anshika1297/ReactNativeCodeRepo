export default function App() {
  const [inputTask, setInputTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);

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

  useEffect(() => {
    const todos = getdata();
    if(todos.length)
    setTodo(todos);
  }, []);

  return (
    <View styles={styles.cont}>
      <View>
        <TextInput
          placeholder="Enter the Todo Task"
          value={inputTask}
          onChangeText={(e)=>{setInputTask(e)}}
        />
        <TouchableOpacity onPress={addTask}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Todo List </Text>
        {todo.map((item) => (
          <TouchableOpacity
            key={item.id}
            onLongPress={() => setEdit(todo.id)}
            onPress={() => toggleCompleted(todo.id)}
          >
            <View style={styles.todo}>
              <Switch
                value={todo.status}
                onValueChange={() => toggleCompleted(todo.id)}
              />
              {edit === todo.id ? (
                <TextInput
                  style={styles.editInput}
                  value={todo.task}
                  autoFocus={true}
                  onBlur={() => {
                    editTodo(todo.id, todo.task);
                    setEdit(null);
                  }}
                  onChangeText={(newText) => {
                    const updatedTodo = { ...todo, task: newText };
                    setTodo((prevTodo) =>
                      prevTodo.map((t) => (t.id === todo.id ? updatedTodo : t))
                    );
                  }}
                />
              ) : (
                <Text
                  style={[
                    styles.todoText,
                    todo.completed && styles.completedText,
                    edit === todo.id && styles.editingText
                  ]}
                >
                  {todo.task}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}