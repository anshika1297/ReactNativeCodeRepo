
import React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import style from './style.js'


const App=() =>{
const [name, setName]= React.useState("");
const [password,setPassword]=React.useState("");
const [state, setState]=React.useState(false);
const [vEmail, setVEmail]=React.useState(false);
const [vPass, setVpass]=React.useState(false);

function ValidateEmail(e)
{
  setName(e);
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
name.match(mailformat)?setVEmail(true):setVEmail(false);

if(vEmail && vPass){
  setState(true);
  
}
else{
  setState(false);
   
}
}

function ValidatePassWord(e)
{
setPassword(e);
var passFormat=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
password.match(passFormat)?setVpass(true):setVpass(false);

if(vEmail && vPass){
  
  setState(true);
}
else{
  setState(false);
}
}



return (
<SafeAreaView style={{paddingTop:100,padding:20}}>
<TextInput Value={name} placeholder={"Enter Email"} style={style.textBox} onChangeText={ValidateEmail}/>
<TextInput Value={password} placeholder={"Enter Password"} style={style.textBox} onChangeText={ValidatePassWord}/>


<Text style={style.text}> Note:Password should be minimum 8 digit containing atleast one uppercase, one Lower case, number and any Special Symbol </Text>


<TouchableOpacity style={[style.button, state?{backgroundColor:"blue"}:{backgroundColor:"gray"}]}  disabled={!state}>
<Text style={style.buttonText}>Login</Text>
</TouchableOpacity>
<TouchableOpacity style={[style.button, {backgroundColor:"blue"}]}>
<Text style={style.buttonText}>Login with Google</Text>
</TouchableOpacity>
<TouchableOpacity style={[style.button, {backgroundColor:"blue"}]}>
<Text style={style.buttonText}>Login with Facebook</Text>
</TouchableOpacity>
</SafeAreaView>
)

}

export default App;