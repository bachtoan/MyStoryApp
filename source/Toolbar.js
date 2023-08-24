import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'


import { SelectList } from 'react-native-dropdown-select-list'

const Toolbar = ({ title }) => {
    const [selected, setSelected] = React.useState("");
  
    const data = [
      {key:'1', value:'Tất cả danh sách', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <TouchableOpacity 
                    style={styles.buttonback}
                    onPress={onBackPressed}>

                    <FontAwesomeIcon icon={faAngleLeft} size={30} color='#7091F5'/>
                </TouchableOpacity>
            
                <Text style={styles.title}>Library</Text>
            </View>
            
            <View style={styles.view2}>
                <SelectList
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    boxStyles={styles.dropmenu}
                    inputStyles={{color:'white'}}
                    dropdownStyles ={{position: 'absolute', width: 200, marginTop: 50, zIndex:10, backgroundColor:'white'}}
                    save="value"
                    defaultOption={{ key:'1', value:'Tất cả danh sách' }} 
                />
                <TouchableOpacity 
                    style={styles.buttonmenu}
                    onPress={onBackPressed}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={30} color='#7091F5' />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonmenu}
                    onPress={onBackPressed}>
                    <FontAwesomeIcon icon={faBars}  size={30} color='#7091F5' />
                </TouchableOpacity>
                
            </View>
        </View>
      );
}

const onBackPressed = (e) => {
    console.log('onBackPressed')
};



export default Toolbar

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        padding: 10,
        backgroundColor: 'transparent',
    },

    view1: {
        flex:1,
        flexDirection: 'row',
        flexPosition: 'relative',
    },

    view2: {
        flex:1,
        flexDirection: 'row',
        flexPosition: 'relative',
        justifyContent: 'flex-end',
    },

    buttonback:{
        paddingTop:3,
    },
    
    buttonmenu:{
        padding:10,
        
    },
    title: {
        marginLeft:20,
        fontSize: 24,
        color: '#7091F5',
        fontWeight: 'bold',
    },
    dropmenu: {
        width:200,
        height: 50,
        borderRadius:50,
        marginRight:20,
        backgroundColor:"#7091F5",
    }
  });