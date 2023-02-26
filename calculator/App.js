import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import Button from "./components/Button";
import ButtonRow from "./components/Buttonrow"

import { Ionicons } from '@expo/vector-icons'; 

const App=() =>{
 const [value, setValue] = React.useState('0');
 const [bracketopen, setBracketOpen] = React.useState(false);
 const [mstore, setmStore]=React.useState('0');
  const [upstore, setupStore]=React.useState('0');
 
 const handlePress = (val) => {
        if (val == 'AC') {
            setValue('0')
        }
        else if (val == '=') {
            try {
                if ((value.match(/\(/g) || []).length == (value.match(/\)/g) || []).length) {

                    if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/') {
                        setValue(`${eval(value.replace('()', '(0)').slice(0, -1))}`)
                    }
                    else {
                        setValue(`${eval(value.replace('()', '(0)') + '*1')}`)
                    }
                }
            }
            catch (e) {
                setValue('Error')
            }
        }
        else if (val == 'back') {
            setValue(value.slice(0, -1))
        }
       
        else if(val=="MS")
        {
            setmStore(value);
            setupStore(value);
        }
        else if(val=="MC")
        {
             setmStore("0");
            setupStore("0");
            setValue("0");
        }
        else if(val=="M+")
        {
          let m=parseInt(upstore)+parseInt(mstore);
          m=m.toString();
            setupStore(m);
            setValue(m);
            
        }

        else if(val=="M-")
        {
            let m=parseInt(upstore)-parseInt(mstore);
            m=m.toString(); 
            setupStore(m);
            setValue(m);
        }
         else if (val == '()') {
            if (value == '0') {
                setValue('(')
                setBracketOpen(true)

            }
            else if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/') {
                setValue(value + '(')
                setBracketOpen(true)
            }
            else {
                if (bracketopen == true) {
                    setValue(value + ')')
                    setBracketOpen(false)
                }
                else {
                    setValue(value + '(')
                    setBracketOpen(true)
                }
            }
        }
        else {
            if (value == '0') {
                if (val == '+' || val == '-' || val == '*' || val == '/' || val == '.' || val == '%') {
                    setValue(value + val)
                }
                else {
                    setValue(val)
                }
            }
           
            else if (isNaN(val)) {
                console.log(value.slice(-1))
                if (value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' || value.slice(-1) == '/' || value.slice(-1) == '.' || value.slice(-1) == '%') {
                    setValue(value.slice(0, -1) + val)
                }
                else {
                    setValue(value + val)
                }
            }
            else if (!isNaN(val)) {
                setValue(value + val)
            }
        }


    }

    return (
      <View style={styles.container}>
      
        <SafeAreaView>
         <ScrollView style={styles.display}>
                <Text style={styles.display_text}>
                    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
            </ScrollView>

         
           <ButtonRow>
            <Button
              text="MC"
              theme="secondary"
              onPress={() => handlePress('MC')}
            />

            <Button
              text="M+"
              theme="secondary"
             onPress={() => handlePress('M+')}
            />

            <Button
              text="M-"
              theme="secondary"
              onPress={() => handlePress('M-')}
            />

            <Button
              text="MS"
              theme="secondary"
             onPress={() => handlePress('MS')}
            />
          </ButtonRow>

          <ButtonRow>
            <Button
              text="AC"
              theme="accent"
              onPress={() => handlePress('AC')}
            />

            <Button
              text="( )"
              theme="accent"
             onPress={() => handlePress('()')}
            />

            <Button
              text="%"
              theme="accent"
              onPress={() => handlePress('%')}
            />

            <Button
              text="/"
              theme="accent"
             onPress={() => handlePress('/')}
            />
          </ButtonRow>

          {/* Number */}
          <ButtonRow>
            <Button text="7" onPress={() => handlePress('7')} />
            <Button text="8" onPress={() => handlePress('8')} />
            <Button text="9" onPress={() => handlePress('9')} />
            <Button
              text="x"
              theme="accent"
             onPress={() => handlePress('*')}
            />
          </ButtonRow>

          <ButtonRow>
            <Button text="5"  onPress={() => handlePress('5')}/>
            <Button text="6"  onPress={() => handlePress('6')}/>
            <Button text="7" onPress={() => handlePress('7')} />
            <Button
              text="-"
              theme="accent"
              onPress={() => handlePress('-')}
            />
          </ButtonRow>

          <ButtonRow>
            <Button text="1"  onPress={() => handlePress('1')}/>
            <Button text="2"  onPress={() => handlePress('2')}/>
            <Button text="3"  onPress={() => handlePress('3')}/>
            <Button
              text="+"
              theme="accent"
              onPress={() => handlePress('+')}
            />
          </ButtonRow>

          <ButtonRow>
            <Button text="." onPress={() => handlePress('.')}/>
            <Button text="0" onPress={() => handlePress('0')}/>
             <Button text= <Ionicons name="backspace-outline" size={25} style={styles.inptBtn} /> onPress={() => handlePress('back')}/>
            <Button
              text="="
              theme="accent"
             onPress={() => handlePress('=')}
            />
          </ButtonRow>
        </SafeAreaView>
      </View>
    );
  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  display: {
       
        width: '95%',
        
        display: 'flex',
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#202020",
    },
    display_text: {
        fontSize: 50,
        textAlign: 'right',
        color:"#fff",
    },
});