import { Button, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar';
import { API_URL } from './Host';

export default function DetailStoryScreen({route}) {
    const { id, name } = route.params;
    const [data, setdata] = useState({})
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
    useEffect(() => {
        DetailStory(id);
    }, [])
    

    const DetailStory = async (id) => {
        try {
          const response = await fetch(API_URL+"detailstory", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id_story": id,
            })
          });
          const json = await response.json();
          if (response.status === 201) {
            setdata(json.data);
            // console.log(data);
            setIsDataLoaded(true);
            ToastAndroid.show('Đã tìm thấy', ToastAndroid.SHORT);
          }
        } catch (error) {
          console.log(error);
        }
      };

  const PreviousPage = ()=>{
    if(currentPage>0){
      setCurrentPage(currentPage - 1);
    }else{
      ToastAndroid.show('Đây là trang đầu tiên rồi', ToastAndroid.SHORT);
    }
    
  }
  const NextPage = ()=>{
    if(currentPage < data.pages.length - 1){
      setCurrentPage(currentPage + 1);
    }else{
      ToastAndroid.show('Đây là trang cuối rồi', ToastAndroid.SHORT);
    }
  }
    
  return (
    <View>
        <View>
            <Toolbar title={name}></Toolbar>
        </View>

        {isDataLoaded && (
          <View>
              <Text>{"Trang số: "  + data.pages[currentPage].page_number}</Text>
              {data.pages[currentPage].contents.map(content => (
                <View key={content.id}>
                  <Text>{"Contents: " + content.content}</Text>
                  <Text>{"positionX: " + content.pivot.positionX}</Text>
                  <Text>{"positionY: " + content.pivot.positionY}</Text>
                  <Text>{"SoundUrl: " + content.sound.soundUrl}</Text>
                </View>
              ))}
              <Button title="Trang trước" onPress={PreviousPage} />
              <Button title="Trang sau" onPress={NextPage}  />
          </View>
        )}

    </View>
    
  )
}

const styles = StyleSheet.create({})