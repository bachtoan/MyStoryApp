import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";
import { center } from "@shopify/react-native-skia";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./Host";

const Toolbar = ({ title, filter }) => {
  const [selected, setSelected] = React.useState("");
  const [isDropmenu, setIsDropmenu] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const data = [
    { key: "1", value: "Tất cả danh sách", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  const pressMenu = (e) => {
    setIsDropmenu(!isDropmenu);
  };
  const onBackPressed = (e) => {
    console.log("onBackPressed");
    navigation.goBack();
  };
  function LogoutDialogHandler() {
    setModalVisible(true);
  }
  async function LogoutHandle(){

    try {
        const token = await AsyncStorage.getItem('access_token');
        console.log(token);
        const parts = token.split('|')
        const accessToken = parts[1].replace(/"/g, '');
        console.log(accessToken);
        if (accessToken) {
            console.log(accessToken);
            const response = await fetch(API_URL+"logout", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },

                
            });
            console.log(response);
            if (response.status === 200) {
                AsyncStorage.clear();
                navigation.replace('Splash')
                console.log('Đăng xuất thành công.');
            } else {
                console.log('Đăng xuất thất bại.');
            }
        } else {
            console.log('Token không tồn tại trong AsyncStorage.');
        }
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
    }
}
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.buttonback} onPress={onBackPressed}>
          <FontAwesomeIcon icon={faAngleLeft} size={30} color="#7091F5" />
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 350,
              height: 250,
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
                Đăng xuất
              </Text>
            </View>
            <View
              style={{ width: 350, height: 100, backgroundColor: "#EDB7ED" }}
            >
              <Text
                style={{
                  color: "#793FDF",
                  fontSize: 20,
                  marginTop: 20,
                  paddingHorizontal: 16,
                }}
              >
                Bạn có chắc chắn muốn đăng xuất ?
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-evenly",
                maxHeight: 60,
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
                onPress={()=>{
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
                onPress={LogoutHandle}
              >
                <Text>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.view2}>
        {filter && (
          <View>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              boxStyles={styles.dropmenu}
              inputStyles={{ color: "white" }}
              dropdownStyles={{
                position: "absolute",
                width: 200,
                marginTop: 50,
                zIndex: 10,
                backgroundColor: "white",
              }}
              save="value"
              defaultOption={{ key: "1", value: "Tất cả danh sách" }}
            />
          </View>
        )}

        <TouchableOpacity style={styles.buttonmenu} onPress={onBackPressed}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={30} color="#7091F5" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonmenu} onPress={pressMenu}>
          <FontAwesomeIcon icon={faBars} size={30} color="#7091F5" />
        </TouchableOpacity>

        {isDropmenu && (
          <View style={styles.dropmenubutton}>
            <View style={styles.dropmenuview}>
              <TouchableOpacity
                style={styles.dropmenuItem}
                onPress={() => {
                  navigation.navigate("Audio");
                }}
              >
                <FontAwesomeIcon icon={faFileAudio} size={30} color="#7091F5" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropmenuItem}
                onPress={LogoutDialogHandler}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size={30}
                  color="#7091F5"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropmenuItem}
                
              >
                <FontAwesomeIcon icon={faGear} size={30} color="#7091F5" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 10,
    backgroundColor: "transparent",
  },

  dropmenubutton: {
    position: "relative",
    hidden: true,
  },

  dropmenuview: {
    width: 50,
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    right: 0,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 9,
    elevation: 5,
  },

  view1: {
    flex: 1,
    flexDirection: "row",
    flexPosition: "relative",
  },

  view2: {
    flex: 1,
    flexDirection: "row",
    flexPosition: "relative",
    justifyContent: "flex-end",
  },

  buttonback: {
    paddingTop: 3,
  },

  buttonmenu: {
    padding: 10,
  },
  title: {
    marginLeft: 20,
    fontSize: 24,
    width: "auto",
    color: "#7091F5",
    fontWeight: "bold",
  },
  dropmenu: {
    width: 200,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: "#7091F5",
  },
  dropmenuItem: {
    paddingVertical: 10,
  },
});
