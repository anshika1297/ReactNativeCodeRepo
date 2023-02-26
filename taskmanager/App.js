import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import Style from "./styles"

export default function App() {
  const [data, setData]= React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow]=React.useState(false);

 const onRefresh = () => {
    setRefreshing(true) ;
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
    setShow(true);
  }
const addTask=()=>{
  setData(prev => [...prev, 'Task'+Math.ceil(Math.random()*100)]);
  setShow(false);
}

const deleteTask=()=>{
if (data.length > 0) {
      setData(data.slice(1));
    }
   setShow(false);
}

  return (
     <ScrollView style={Style.Scrollview}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['blue']} tintColor='green' />}>
      {
        show?
        <View style={{flexDirection:"row"}}><TouchableOpacity onPress={addTask}><Text> ADD TASK</Text></TouchableOpacity>
    <TouchableOpacity onPress={deleteTask}><Text> DELETE TASK</Text></TouchableOpacity>
    </View>:null
      }
    {data.map(item => (<Text >{item}</Text>))}
    {data.length == 0 && <Text style={{textAlign:'center'}}>No Items in list</Text>}
    </ScrollView>
  );
}


