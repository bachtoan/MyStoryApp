import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import { library } from '@fortawesome/fontawesome-svg-core'

const Toolbar = ({ title, filter }) => {
    const [selected, setSelected] = React.useState("");
    const [isDropmenu, setIsDropmenu] = React.useState(false);
   
    const data = [
      {key:'1', value:'Tất cả danh sách', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
    ]
    const pressMenu = (e) => {
        setIsDropmenu(!isDropmenu);
    };
    const onBackPressed = (e) => {
        console.log('onBackPressed')
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <TouchableOpacity 
                    style={styles.buttonback}
                    onPress={onBackPressed}>

                    <FontAwesomeIcon icon={faAngleLeft} size={30} color='#7091F5'/>
                </TouchableOpacity>
            
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            
            <View style={styles.view2}>
            
            {filter && (
                <View>
                    <SelectList
                        setSelected={(val) => setSelected(val)} 
                        data={data} 
                        boxStyles={styles.dropmenu}
                        inputStyles={{color:'white'}}
                        dropdownStyles ={{position: 'absolute', width: 200, marginTop: 50, zIndex:10, backgroundColor:'white'}}
                        save="value"
                        defaultOption={{ key:'1', value:'Tất cả danh sách' }} 
                    />
                </View>
            )}

            
           
                <TouchableOpacity 
                    style={styles.buttonmenu}
                    onPress={onBackPressed}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={30} color='#7091F5' />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonmenu}
                    
                    onPress={pressMenu}>
                    <FontAwesomeIcon icon={faBars}  size={30} color='#7091F5' />

                    
                </TouchableOpacity>

                {isDropmenu && (
                        <View style={styles.dropmenubutton}>
                            <View style={styles.dropmenuview}>
                                <TouchableOpacity style={{paddingBottom:10}}>
                                    <FontAwesomeIcon icon={faPlus} size={30} color='#7091F5' />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon={faGear} size={30} color='#7091F5' />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                )}
                
            </View>
        </View>
      );


 
  
}



export default Toolbar

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        padding: 10,
        backgroundColor: 'transparent',
    },

    dropmenubutton:{
        position: 'relative',
        hidden: true,
    },

    dropmenuview:{
        width: 50,
        marginTop: 50,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:50,
        right:0,
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0, 
        shadowRadius: 9, 
        elevation: 5, 
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
        width:'auto',
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