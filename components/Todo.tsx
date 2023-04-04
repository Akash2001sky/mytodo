//@ts-nocheck
import React from 'react';
import type {PropsWithChildren} from 'react';
import {

  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,

  View,
} from 'react-native';
import { context } from './Todoprovider';
class Todo extends React.Component{

    static contextType=context;
    
 

  render(): React.ReactNode {
    const {add,input,tododta,update}=this.context;
    return(

      <View style={styles.maincontainer}>
        <Text style={{alignSelf:'center', color:'#F6F1F1', fontSize:30}}>TODO LIST</Text>
 
      <View style={styles.minicontainer}>
        <TextInput placeholderTextColor={'#ffffffaa'} placeholder='ADD TODO' style={styles.inputStyle} onChangeText={txt=>input(txt)}  value={tododta}/>
      

      
        <TouchableOpacity style={styles.button} onPress={add} disabled={tododta.length >0 ?false :true}>
            <Text style={styles.Addtext}>ADD</Text>
        
        </TouchableOpacity>
     
      </View>
     
      </View>
    )
  }
}
export default Todo;

const styles= StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'#146C94',
        justifyContent:'center',
      
    },
    minicontainer:{
 backgroundColor:'#146C94',
 margin:25
    },
    inputStyle:{
        borderWidth:1,
borderColor:'#ffffffaa',
borderRadius:10,
color:'#ffffff'
    },
    button:{
        alignItems:'center',
        backgroundColor:'#19A7CE',
        height:30,
        marginTop:20,
        borderRadius:10
    },
    Addtext:{
        marginTop:5,
        color:'#F6F1F1'
    }
})