import { ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { API_URL } from '../my_component/Host';
import Toolbar from '../my_component/Toolbar';
import { SelectList } from 'react-native-dropdown-select-list';


export default function StoryManager() {

  const [data, setData] = useState([]);
  const [storyName, setstoryName] = useState();
  const [storyAuthor, setstoryAuthor] = useState();
  const [storyIllustration, setstoryIllustration] = useState();
  const [page_quantity, setpage_quantity] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);


  //--
  const [uId, setuId] = useState();
  const [uName, setuName] = useState();
  const [uAuthor, setuAuthor] = useState();
  const [uIllu, setuIllu] = useState();
  const [pages, setPages] = useState();


  const dataSelect = [
    { key: "-1", value: "Thể loại"},
    { key: "0", value: "Truyện tĩnh" },
    { key: "1", value: "Truyện icon" },
    
  ];
  const getStorys = async () => {
    await fetch(API_URL + "story")
      .then((res) => res.json())
      .then((res) => {
        setData(res.story);
        setIsDataLoaded(true);
        // console.log(res.story); 
      })
      .catch((error) => {
        console.error("Home: " + error);
      })
  }

  const AddStory = async () => {

    await fetch(API_URL+"addstory", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": storyName,
            "author": storyAuthor,
            "illustration": storyIllustration,
            "genre":selected,
            "page_quantity": page_quantity,
        })
    })
        .then((res) => {
            if (res.status === 200) {
              ToastAndroid.show('Thêm mới thành công', ToastAndroid.SHORT);
              setstoryName("");
              setpage_quantity("");
              setstoryIllustration("");
              setstoryAuthor("");
              setModalVisible(false);
              getStorys();
            }else if (res.status === 404){
              ToastAndroid.show('Hãy nhập đủ các trường', ToastAndroid.SHORT);
            }           
        })
        .catch(e => {
            console.log(e);
            ToastAndroid.show('Thêm mới thất bại', ToastAndroid.SHORT);
        })
}
  const Update = async () => {

  await fetch(API_URL+"updatestory", {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "id": uId,
          "name": storyName,
          "author": storyAuthor,
          "illustration": storyIllustration,
          "genre": selected,
          "page_quantity": page_quantity,
      })
  })
      .then((res) => {
          if (res.status === 200) {
            ToastAndroid.show('Sửa thành công', ToastAndroid.SHORT);
            setstoryName("");
            setpage_quantity("");
            setstoryIllustration("");
            setstoryAuthor("");
            setModalUpdateVisible(false);
            getStorys();
          }else if (res.status === 404){
            ToastAndroid.show('Hãy nhập đủ các trường', ToastAndroid.SHORT);
          }           
      })
      .catch(e => {
          console.log(e);
          ToastAndroid.show('Thêm mới thất bại', ToastAndroid.SHORT);
      })
}
const Delete = async () => {

  await fetch(API_URL+"deletestory", {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "id": uId,        
      })
  })
      .then((res) => {
          if (res.status === 200) {
            ToastAndroid.show('Xoá thành công', ToastAndroid.SHORT);
            setModalDeleteVisible(false);
            getStorys();
          }else if (res.status === 404){
            ToastAndroid.show('Xoá thất bại', ToastAndroid.SHORT);
          }           
      })
      .catch(e => {
          console.log(e);
          ToastAndroid.show('Xoá thất bại', ToastAndroid.SHORT);
      })
}

  useEffect(() => {
    getStorys();
    // console.log(data);
  }, []);



  function Item({ _id, name, author, illustration }) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageView}>
          <Image style={styles.itemimage} source={{
            uri: 'https://source.unsplash.com/random',
          }} resizeMode='contain' />
        </View>
        <View style={{flexDirection:'column', flex:2}}>
          <View style={styles.textView}>
           <Text style={styles.itemtext}numberOfLines={1}>Tên: {name}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.itemtext} numberOfLines={1}>Tác giả: {author}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.itemtext}numberOfLines={2}>Mô tả: {illustration}</Text>
          </View>
        </View>
        
      </View>
    );
  }






  return (
    <ImageBackground style={styles.container} source={require('../image/landscape.jpg')}>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 10 }}>
          <Toolbar title="Story Manager" />
        </View>

        <View style={styles.addButtonView}>
          <TouchableOpacity style={styles.addButton} onPress={()=>{setModalVisible(true)}}>
            <Text style={styles.addButtonText}>Thêm truyện</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isDataLoaded &&(
      <View style={{flex:1, alignItems:'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
      )}
      


      {isDataLoaded && (
        <View style={{ flex: 5 }}>

          <FlatList
            data={data}
            renderItem={({ item }) =>
            (
              <TouchableOpacity
                onPress={() => {
                  setModalUpdateVisible(true);
                  setuId(item.id)
                  setuName(item.name);
                  setuAuthor(item.author);
                  setuIllu(item.illustration);
                  setPages(item.page_quantity);
                }}
                onLongPress={()=>{
                  setModalDeleteVisible(true);
                  setuId(item.id);
                }}
              >
                <Item name={item.name} image={item.image} _id={item.id} author={item.author} illustration={item.illustration} ></Item>
              </TouchableOpacity>
            )
            }
            keyExtractor={item => item.id}
            vertical
          />
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 350,
              height: 430,
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 16,
            }}
          >
            <View
              style={{
                width: 350,
                backgroundColor: "#EDB7ED",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Text
                style={{ color: "#793FDF", fontSize: 30, textAlign: "center" }}
              >
                Thêm truyện
              </Text>
            </View>
            <View
              style={{ width: 350, paddingBottom: 20, backgroundColor: "#EDB7ED" }}
            >
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder='Tên truyện'
                  onChangeText={setstoryName}
                ></TextInput>
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder='Tác giả'
                  onChangeText={setstoryAuthor}
                ></TextInput>
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder='Minh hoạ'
                  onChangeText={setstoryIllustration}
                ></TextInput>
                
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder='Số trang'
                  keyboardType='numeric'
                  onChangeText={setpage_quantity}
                ></TextInput>               
              </View>
                <SelectList
                  data={dataSelect}
                  boxStyles={styles.dropmenu}
                  inputStyles={{ color: "white" }}
                  dropdownStyles={{
                    position: "absolute",
                    alignItems:'center',
                    width: 150,
                    marginLeft:100,
                    marginTop: 50,
                    zIndex: 100,
                    backgroundColor: "white",
                  }}
                  save="key"
                  setSelected={(key) => setSelected(key)}
                  defaultOption={{ key: "-1", value: "Thể loại" }}
                />
                
              
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-evenly",
                maxHeight: 60,
                zIndex:-100
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomLeftRadius: 16,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text>Đóng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomRightRadius: 16,
                }}
                onPress={AddStory}
              >
                <Text>Thêm truyện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalUpdateVisible} transparent={true} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 350,
              height: 430,
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 16,
            }}
          >
            <View
              style={{
                width: 350,
                backgroundColor: "#EDB7ED",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Text
                style={{ color: "#793FDF", fontSize: 30, textAlign: "center" }}
              >
                Sửa truyện
              </Text>
            </View>
            <View
              style={{ width: 350, paddingBottom: 20, backgroundColor: "#EDB7ED" }}
            >
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder={uName}
                  onChangeText={setstoryName}
                ></TextInput>
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder={uAuthor}
                  onChangeText={setstoryAuthor}
                ></TextInput>
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder={uIllu}
                  onChangeText={setstoryIllustration}
                ></TextInput>
                
              </View>
              <View style={styles.viewof_text_input}>
                <TextInput
                  placeholder='Số trang'
                  keyboardType='numeric'
                  onChangeText={setpage_quantity}
                ></TextInput>               
              </View>
                <SelectList
                  data={dataSelect}
                  boxStyles={styles.dropmenu}
                  inputStyles={{ color: "white" }}
                  dropdownStyles={{
                    position: "absolute",
                    alignItems:'center',
                    width: 150,
                    marginLeft:100,
                    marginTop: 50,
                    zIndex: 100,
                    backgroundColor: "white",
                  }}
                  save="key"
                  setSelected={(key) => setSelected(key)}
                  defaultOption={{ key: "-1", value: "Thể loại" }}
                />
                
              
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-evenly",
                maxHeight: 60,
                zIndex:-100
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomLeftRadius: 16,
                }}
                onPress={() => {
                  setModalUpdateVisible(false);
                }}
              >
                <Text>Đóng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomRightRadius: 16,
                }}
                onPress={Update}
              >
                <Text>Lưu truyện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalDeleteVisible} transparent={true} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 350,
              height: 430,
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 16,
            }}
          >
            <View
              style={{
                width: 350,
                backgroundColor: "#EDB7ED",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Text
                style={{ color: "#793FDF", fontSize: 30, textAlign: "center" }}
              >
                Xoá truyện
              </Text>
              <Text
                style={{ color: "#793FDF", fontSize: 30,marginTop:50,marginBottom:50, textAlign: "center" }}
              >
                Bạn chắc chắn muốn xoá truyện này chứ?
              </Text>
            </View>
            
              
          

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-evenly",
                maxHeight: 60,
                zIndex:-100
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomLeftRadius: 16,
                }}
                onPress={() => {
                  setModalDeleteVisible(false);
                }}
              >
                <Text>Đóng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FFFD8C",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomRightRadius: 16,
                }}
                onPress={Delete}
              >
                <Text>Xoá truyện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </ImageBackground>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imageView: {
    borderColor: "lightgrey",
  },
  itemimage: {
    width: 130,
    height: 150,
    flex:1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

  },
  textView: {
    marginBottom:10,
    paddingLeft:10,

  },
  itemtext: {
    color: "#7091F5",
    fontSize: 20,
    
  },
  addButtonView: {
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: 'lightblue',
    width: 200,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#7091F5',
    fontSize: 20,
    fontWeight: '500'
  },
  viewof_text_input: {
    marginHorizontal: 16,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  
  dropmenu: {
    // width: 200,
    marginTop:10,
    marginHorizontal:20,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#7091F5",
  },

});
