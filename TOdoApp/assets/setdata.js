import AsyncStorage from "@react-native-async-storage/async-storage";


export const setdata=async(data)=>{

   try{
    
    await AsyncStorage.setItem("TodoList",JSON.stringify(data));

}catch(error){
    console.log(error);
}

};

export const getdata=async()=>{

    try{
     
    const data= await AsyncStorage.getItem("TodoList");

    if(data)
    return (JSON.parse(data));
    else
    return null;
 
 }catch(error){
     console.log(error);
 }
 
 }

 