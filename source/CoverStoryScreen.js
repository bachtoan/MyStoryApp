import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toolbar from './Toolbar'

export default function CoverStoryScreen() {
  return (
    <View>
        <View>
            <Toolbar title="Story"></Toolbar>
        </View>

        <View style={styles.container}>
            <View style = {styles.imageView}>
               
                <Image
                        style = {styles.coverimage} 
                        source = {{uri : "https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg"}}>
                </Image>
            

            </View>

            <View style = {styles.contentView}>
                    <Text>a</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
        container:{
            flexDirection:"row",
        },  

        imageView:{
            
            flex:1   ,
            
        },

        coverimage:{
            width:180,
            height:250,
            borderBottomRightRadius:20,
            borderTopRightRadius:20,
            borderTopLeftRadius:5,
            borderBottomLeftRadius:5,
        },

        contentView:{
            backgroundColor:"red",
           flex:1.3   
        },



})