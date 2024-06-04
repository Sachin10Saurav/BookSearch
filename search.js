import React, { useState ,useEffect} from 'react'
import { Pressable, StyleSheet, Text, View,TextInput, ScrollView,Image ,ActivityIndicator} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { FontAwesome,MaterialIcons } from '@expo/vector-icons'; 
import axios from 'axios';

const search = ({history,location}) => { 
    const [text, onChangeText] = useState("");
    const [disp,setDisp]=useState(location.state.write);
    const [disparr,setDisparr]=useState([{"id":"test","volumeInfo":{"title":"test","authors":["test"],"imageLinks":{"smallThumbnail":"https://us.123rf.com/450wm/designtools/designtools1811/designtools181103817/111594046-forbidden-icon-on-a-white-background-isolated-forbidden-symbol-with-flat-style-.jpg?ver=6"}}}]);
    const [favou,setFavou]=useState(location.state.fatoreturn);
    const add=()=>{
        if(text!="")
        {
            setDisp(text);
            onChangeText("");
        }
    }
    const redirect=(i)=>{
        //console.log("re")
        history.push("/Search/Fav",{song:`${i}`,array:disp,fa:favou})
    }
    const favo=(i,idd,img)=>{
        //console.log("adding to fav")
        let a=[],f=0;
        a=favou;
        for(let i=0;i<a.length;i++)
        {
            if(a[i].id==idd)
            {
                f=1;
                break;
            }
        }
        if(f==0)
        {
            a.push({"title":i,"id":idd,"imag":img});
            setFavou(a);
        } 
    }
    async function getUser() {
        try {
          const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+disp);
          //console.log(response);
          setDisparr(response.data.items)
        } catch (error) {
          console.error(error);
        }
      }
    useEffect(() => {
        getUser(); 
    }, [disp])
    const here=(i)=>{
        if(i.hasOwnProperty('imageLinks')){
            return (i.imageLinks.smallThumbnail)
        }
        else
        {
           return ("https://us.123rf.com/450wm/designtools/designtools1811/designtools181103817/111594046-forbidden-icon-on-a-white-background-isolated-forbidden-symbol-with-flat-style-.jpg?ver=6")
        } 
    }
    return (
        (<View style={{flex:1,paddingTop:10}}>
            <View style={{alignItems:"center"}}>
            <View style={{flexDirection:"row",backgroundColor:"#FFD700",borderRadius:25,height:40,marginBottom:20}}>
            <FontAwesome name="search" size={35} color="brown" style={{marginTop:2,marginLeft:15}}/>
            <TextInput
            placeholder="Enter Book To Search"
            placeholderTextColor="brown"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}/>
            </View>
            <Pressable style={styles.buttonS} onPress={add}>
                <Text style={styles.textS}>Search</Text>
            </Pressable>
            </View>
            <View style={{height:487}}>
            <ScrollView>
            {disparr.map((item,idx)=>{return (
              <View key={idx}>
                   {item.volumeInfo.title!="test"&&<Pressable style={styles.searchItems} onPress={()=>{redirect(item.id)}}>
                       <View style={{flex:1,flexDirection:'row'}}>
                           <View style={{flex:4}}>
                           <Image style={styles.tinyLogo} source={{uri:`${here(item.volumeInfo)}`}}/>
                           </View>
                           <View style={{flex:6,justifyContent:"center",alignItems:"center",marginLeft:20}}>
                           <Text style={{fontSize:20,textAlign:"center",color:"#FFD700"}}>{item.volumeInfo.title} </Text>
                           <Text style={{fontSize:15,textAlign:"center",marginTop:7,color:"brown"}}>{(item.volumeInfo.authors==null)?"Not Available":`by ${item.volumeInfo.authors}`}</Text>
                           <Pressable style={{backgroundColor:"#FFD700",width:150,height:40, borderRadius:20,marginTop:7}} onPress={()=>{favo(item.volumeInfo.title,item.id,here(item.volumeInfo))}}>
                            <Text style={styles.textS}>Add to Fav</Text>
                           </Pressable>
                           </View>
                     </View>
                </Pressable>}
                {item.volumeInfo.title=="test"&&<ActivityIndicator color={"#FFD700"} size="large" style={{marginTop:50}}/>}
            </View>
            )})}
            </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRightColor:"grey"}}>
                        <Pressable style={{backgroundColor:"grey",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}}><FontAwesome name="search" size={27} color="black" /></Pressable>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Pressable style={{backgroundColor:"white",height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:40}} onPress={()=>{history.push("/Search/res",{fa:favou,array:disp})}}><MaterialIcons name="favorite" size={27} color="black" /></Pressable>
                    </View>
                </View>
            </View>
        </View>
    ))
}
const styles = StyleSheet.create({
    input: {
        height: 40,
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
        width:200,
        height:40,
        borderRadius:20
    },
    textS:{
        color:"brown",
        textAlign:"center",
        paddingTop:4,
        fontSize:20

    },
    footer:{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height:50,
        width:windowWidth,
        backgroundColor:"#222222"
    },
    searchItems:{
        height:235,
        marginTop:20
    },
    favBut:{
        backgroundColor:"#FFD700",
        width:200,
        height:40,
        borderRadius:20
    },
    tinyLogo: {
        marginTop:"10%",
        width: 145,
        height: '100%',
        marginLeft:5
      },
  });
export default search
