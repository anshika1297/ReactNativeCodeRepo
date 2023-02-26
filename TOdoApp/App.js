import { useState, useEffect } from "react";
import { Text, View, ScrollView, Switch, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { setdata, getdata } from "./assets/setdata";
import AntDesign from '@expo/vector-icons/AntDesign';
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
export default function App() {
  const [inputTask, setInputTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const[toggle,setToggle]=useState(false);

  useEffect(()=>{
    ExecuteSql(db, `CREATE TABLE IF NOT EXISTS ${tbl} (id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`)
    .then(t => {
      console.log("Success: ",t)
      ExecuteSql(db,`SELECT * FROM ${tbl}`)
      .then(t => {
        console.log("Data: ",t.rows._array);
        setTodo(prev => [... t.rows._array])
      })
      .catch(e => console.log("Failure:", e))
      })
    .catch(e => console.log("Failure: ",e))
  },[])
  
  const addTask = () => {
    ExecuteSql(db, `INSERT INTO ${tbl} (task, status) VALUES (?,?)`,[inputTask,0])
    .then((t) => {
        setTodo(prev => [...prev, {id:t?.insertedId,task:inputTask, status:0}]);
        setInputTask('');
      console.log("Success:", t);
      })
    .catch(e => console.log("Failuer:", e))
  }

  const editTodo = (id,newTask) => {
    ExecuteSql(db, `UPDATE ${tbl} SET task=${newTask} WHERE id=${id}`)
    .then((t) => {
        const updatedTodos = todo.map((todo) => {
            if (todo.id === id) {
              return { ...todo, task: newText };
            } else {
              return todo;
            }
          });
          setTodo(updatedTodos);
      console.log("Success:", t);

      
      })
    .catch(e => console.log("Failuer:", e))
  }

  const toggleCompleted = (id) => {
    setToggle(!toggle);
    ExecuteSql(db, `UPDATE ${tbl} SET status=${toggle} WHERE id=${id}`)
    .then((t) => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodo(updatedTodos);

      
      })
    .catch(e => console.log("Failuer:", e))
  }

  const deleteTask = (id) => {
    setToggle(!toggle);
    ExecuteSql(db, `DELETE FROM ${tbl} WHERE id=${id}`)
    .then((t) => {
        const updatedTodos = todo.filter((todo) => {
            if (todo.id !== id) {
              return todo;
            } 
          });
          setTodo(updatedTodos);
          setdata(updatedTodos);
      })
    .catch(e => console.log("Failuer:", e))
  }


  return (
    <View  style={styles.container}>
      <View>
        <Text styles={styles.slogan}> Let's Set the Agenda of the Day</Text>
      <View style={styles.NewTask}>
        <TextInput style={styles.inputbox}
          placeholder="Enter the Todo Task"
          value={inputTask}
          onChangeText={(e)=>{setInputTask(e)}}
        />
        <TouchableOpacity onPress={addTask} style={styles.AddButton}>
        <AntDesign name="caretright" size={25}  />
        </TouchableOpacity>
      </View>

      <View style={styles.TaskBox}>
        <Text style={styles.heading}>Todo List </Text>
        <ScrollView style={styles.TaskList}>
        {todo.map((item) => (
          <TouchableOpacity
            key={item.id}
            onLongPress={() => setEdit(item.id)}
            onPress={() => toggleCompleted(item.id)}
          >
            <View style={{flexDirection:"row"}}>
              <Switch
                value={item.status}
                onValueChange={() => toggleCompleted(item.id)}
              />
              {edit === item.id ? (
                <View style={{flexDirection:"row"}}>
                <TextInput
                  
                  value={item.task}
                  autoFocus={true}
                  onBlur={() => {
                    editTodo(item.id, item.task);
                    setEdit(null);
                  }}
                  onChangeText={(newText) => {
                    const updatedTodo = { ...todo, task: newText };
                    setTodo((prevTodo) =>
                      prevTodo.map((t) => (t.id === item.id ? updatedTodo : t))
                    );
                  }}
                />
                <TouchableOpacity onPress={deleteTask}><Text>Delete</Text></TouchableOpacity>
                </View>
              ) : (
                <Text
                 
                >
                  {item.task}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
      </View>
    </View>
  );
}