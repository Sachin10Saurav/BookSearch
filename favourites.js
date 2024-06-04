import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View,TextInput, ScrollView,Image } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons'; 
const windowWidth = Dimensions.get('window').width;
const result = ({history,location}) => {
    const [favou,setFavou]=useState(location.state.fa)
    const removeFa=(ind)=>{
        //console.log("in remove")
        let a=favou;
        var b=[];
        for(let i=0;i<a.length;i++)
        {
            if(a[i].id!=ind)
            {
                b.push(a[i]);
            }
        }
        setFavou(b)
    }
    const redirectToRes=(i)=>{
        history.push("/Search/Fav",{song:`${i}`,array:location.state.array,fa:favou})
    }
    return (
        <View style={{flex:1}}>
            <Text style={{color:'#FFD700',fontSize:40,textAlign:"center"}}>Your Favourites</Text>
            <View style={{height:'84%'}}>
                {favou.length==0&&<Text style={{color:"brown",fontSize:40,textAlign:"center",marginTop:"20%"}}>There are no favourites</Text>}
            <ScrollView>
            {favou.map((item,idx)=>{
                return(
                    <Pressable onPress={()=>{redirectToRes(item.id)}} style={styles.favBut} key={idx}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}><Image style={styles.tinyLogo} source={{uri:`${item.imag}`}}/></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <Text style={{textAlign:"center",marginBottom:20,fontSize:20,color:"#FFD700"}}>{item.title}</Text> 
                            <Pressable style={{backgroundColor:"#FFD700",width:150,height:40, borderRadius:20,marginTop:7}} onPress={()=>{removeFa(item.id)}}>
                            <Text style={styles.textS}>Remove from fav</Text>
                            </Pressable>
                        </View>
                    </View>
                    </Pressable>
                )})}
            </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRightColor:"grey"}}>
                        <Pressable style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}} onPress={()=>{history.push("/Search",{write:location.state.array,fatoreturn:favou})}}><FontAwesome name="search" size={27} color="black" /></Pressable>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable style={{backgroundColor:"grey",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><MaterialIcons name="favorite" size={27} color="black" /></Pressable>
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
    favBut:{
        marginTop:20,
        height:225
    },
    removeB:{
        backgroundColor:"green",
        height:70,
        marginLeft:40
    },
    tinyLogo: {
        marginTop:20,
        width: 145,
        height: '95%',
        marginLeft:5
      },
      textS:{
        color:"brown",
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:15,
        paddingTop:7
    },
  });
export default result
