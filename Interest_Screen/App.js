import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from './Styles'

const App=()=>{
const [select, setSelect]=React.useState(0);
const[ interests, setInterests]=React.useState([
  {"name":"trying New Things", "status":false},
  {"name":"Art Galleries", "status":false},
  {"name":"Rave", "status":false},
  {"name":"Cafe hopping", "status":false},
  {"name":"Boxing", "status":false},
  {"name":"Sake", "status":false},
  {"name":"Fencing", "status":false},
  {"name":"gin Tonic", "status":false},
  {"name":"Baking", "status":false},
  {"name":"Environtalism", "status":false},
  {"name":"League of Legends", "status":false},
  {"name":"Road trips", "status":false},
  {"name":"Hockey", "status":false},
  {"name":"Reagton", "status":false},
  {"name":"DIY", "status":false},
  {"name":"Virtual Reality", "status":false},
  {"name":"Equestrian", "status":false},
  {"name":"Art", "status":false},
  {"name":"Tea", "status":false},
   {"name":"Tarot", "status":false},
  {"name":"Theatre", "status":false},
   {"name":"Pride", "status":false},
  {"name":"Climbing", "status":false},
   {"name":"VR Room", "status":false},
  {"name":"Online Shopping", "status":false},
   {"name":"Indoor Activities ", "status":false},
  {"name":"Social Activities", "status":false},
   {"name":"Astrology", "status":false},
  {"name":"Blogging", "status":false},
   {"name":"Couch Surfing", "status":false},
  {"name":"Coffee", "status":false},
   {"name":"History", "status":false},
  {"name":"Reading", "status":false},
   {"name":"Hiking", "status":false},
  {"name":"Camping", "status":false},
])

const handleSelect=(index)=>{
  setSelect(interests[index].status?select-1:select+1);
 setInterests(...interests[index].status?interests[index].status=false:interests[index].status=true);
}

return(

  <View style={Styles.container}>
  <Text style={Styles.heading}>Interests</Text>
  <Text style={Styles.text}> Let Everyone know what you are  passionate about, by adding it on your Profile </Text>
  <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"center"}}>
  {
  interests.map((elem, index) => (
<TouchableOpacity onPress={()=>handleSelect(index)} style={{padding:5}}>
  <Text style={[Styles.btn, elem.status?{backgroundColor:"blue"}:{backgroundColor:"white"}]} >
    {elem.name}
 </Text>
 </TouchableOpacity>

  ))

  }
  </View>
  <View style={select===5?{backgroundColor:"red"}:{backgroundColor:"gray"}}>

  <TouchableOpacity>
  <Text style={{padding:10, borderRadius:10, borderWidth:1, textAlign:"center"}} > Continue ({select}/5)</Text>
  </TouchableOpacity>
  </View>
  </View>
)
}

export default App;

