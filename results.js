import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View,TextInput, ScrollView,ActivityIndicator,Image } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const favourite = ({history,location}) => {
    const [music,setMusic]=useState(`${location.state.song}`)
    const [bookDetails,setBookDetails]=useState({"title":"test","authors":["test"],"publishedDate":"test","description":"test","publisher":"test","imageLinks":{"thumbnail":"https://us.123rf.com/450wm/designtools/designtools1811/designtools181103817/111594046-forbidden-icon-on-a-white-background-isolated-forbidden-symbol-with-flat-style-.jpg?ver=6"}});
    const [arraytoreturn,setArraytoreturn]=useState(location.state.array)
    async function getUser() {
        try {
          const response = await axios.get("https://www.googleapis.com/books/v1/volumes/"+music);
          //console.log(response);
          setBookDetails(response.data.volumeInfo)
        } catch (error) {
          console.error(error);
        }
      }
    useEffect(()=>{
        getUser();
    },[music])
    const here=(i)=>{
        if(i.hasOwnProperty('imageLinks')){
            return (i.imageLinks.thumbnail)
        }
        else
        {
           return ("https://us.123rf.com/450wm/designtools/designtools1811/designtools181103817/111594046-forbidden-icon-on-a-white-background-isolated-forbidden-symbol-with-flat-style-.jpg?ver=6")
        } 
    }
    return (
        <View style={{flex:1,marginTop:8}}>
            {bookDetails.title!="test"&&
            <View style={{height:"92%"}}>
            <ScrollView>
                <Image style={styles.tinyLogo} source={{uri:`${here(bookDetails)}`}}/>
                <Text style={{color:"yellow",fontSize:40,textAlign:"center"}}>Title :{"\n"}{bookDetails.title==null?"Not Available":bookDetails.title}</Text>
                <Text style={{color:"yellow",fontSize:15,textAlign:"center"}}>Authors :{"\n"}{bookDetails.authors==null?"Not Available":bookDetails.authors}</Text>
                <Text style={{color:"yellow",fontSize:15,textAlign:"center"}}>Date of Publication :{"\n"}{bookDetails.publishedDate==null?"Not Available":bookDetails.publishedDate}</Text>
                <Text style={{color:"yellow",fontSize:15,textAlign:"center"}}>Publisher :{"\n"}{bookDetails.publisher==null?"Not Available":bookDetails.publisher}</Text>
                <Text style={{color:"yellow",fontSize:25,textAlign:"center"}}>Description :{"\n"}{bookDetails.description==null?"Not Available":bookDetails.description}</Text>
            </ScrollView>
            </View>
            }
            {bookDetails.title=="test"&&<ActivityIndicator color={"#FFD700"} size="large" style={{marginTop:50}}/>}
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{history.push("/Search",{write:arraytoreturn,fatoreturn:location.state.fa})}} style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><FontAwesome name="search" size={27} color="black" /></Pressable>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable onPress={()=>{history.push("/Search/res",{fa:location.state.fa,array:arraytoreturn})}} style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><MaterialIcons name="favorite" size={27} color="black" /></Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    footer:{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height:50,
        width:windowWidth,
        backgroundColor:"#222222"
    },
    tinyLogo: {
        width: 150,
        height: 150,
        alignSelf:"center"
      },
  });
export default favourite
