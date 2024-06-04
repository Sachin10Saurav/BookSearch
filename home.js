import React,{useState} from 'react'
import { Pressable, StyleSheet, Text, View,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
function home({history}) {
    const [text, onChangeText] = useState("");
    const goToSearch=()=>{
        if(text!="")
        {
            history.push("/Search",{write:`${text}`,fatoreturn:[]})
        }  
    }
    return (
        <View style={styles.views}>
            <FontAwesome name="book" size={120} color="#FFD700" />
            <Text style={{color:"#FFD700",fontSize:30,textAlign:"center"}}>Search millions of books for free</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter Name of the Book"
            placeholderTextColor="brown"/>
            <Pressable style={styles.buttonS} onPress={goToSearch}>
                <Text style={styles.textS}>Search</Text>
            </Pressable>
        </View> 
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      color:"brown",
      borderColor:"#FFD700",
      width:300,
      borderRadius:25,
      paddingLeft:20,
      backgroundColor:"#FFD700"
    },
    buttonS:{
        backgroundColor:"#FFD700",
        width:120,
        height:40,
        borderRadius:20
    },
    textS:{
        color:"brown",
        textAlign:"center",
        paddingTop:4,
        fontSize:20
    },
    views:{
        justifyContent:'space-around',
        alignItems:"center",
    }
  });
export default home
