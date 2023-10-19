import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Picker from './Picker';
import Calenders from './Calenders';
import { Calendar } from 'react-native-calendars';
import Slider from './Slider';


export default function ModalPlaces({ visible, setModalVisible }) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const [pickDay, setPickDay] = useState("Today");
    const [pickTime, setPickTime] = useState("Open now");
    const [date, setDate] = useState(month+"-"+day+"-"+year);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [minTime, setMinTime] = useState(); // State cho giờ bắt đầu
    const [maxTime, setMaxTime] = useState();


    function Close() {
        setModalVisible(false);
    };
    function onSearch() {
        console.log(pickDay, pickTime);
        console.log(date);
        console.log(minTime,maxTime);
    }
    function OpenCalendar(){
        setCalendarVisible(true);
    }
    useEffect(() => {
        if (pickDay != "Today" && pickTime == "Open now") {
            setPickTime('Lunch');
        }
    }, [pickDay, pickTime])

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonClose} onPress={Close}>
                        <FontAwesomeIcon icon={faXmark} size={20} color='white' />
                    </TouchableOpacity>

                    <Text style={styles.title}>Filter to see which place are open</Text>

                    <Picker label="Pick a day" buttons={["Today", "Tomorrow", "Another day"]} setSelected={setPickDay} selected={pickDay}></Picker>
                    <Picker label="Pick a time" buttons={["Open now", "Lunch", "Dinner", "Choose your time"]} setSelected={setPickTime} selected={pickTime}></Picker>
                    {pickDay == "Another day" &&  (
                        <TouchableOpacity style={styles.chooseDate} onPress={OpenCalendar}>
                            <Text style={styles.chooseDateText}>Choose the date: {date}</Text>
                        </TouchableOpacity>
                    )}
                    <Calenders visible={calendarVisible} setDayPicker={setDate} setVisible={setCalendarVisible}></Calenders>
                    {pickTime == "Choose your time" &&  (
                        <Slider setMinTime={setMinTime} setMaxTime={setMaxTime}></Slider>
                    )}
                    

                    <TouchableOpacity style={styles.search} onPress={onSearch}>
                        <Text style={styles.searchText}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 0,
        width: "90%",
        // alignItems:'center',
        paddingBottom: 20,
        backgroundColor: 'white',
        borderWidth: 1
    },
    buttonClose: {
        position: 'absolute',
        right: -12,
        top: -12,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: 30,
        marginLeft: 20,
    },
    search: {
        backgroundColor: '#A52A2A',
        marginHorizontal: 20,
        marginTop: 40,
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    chooseDate:{
        marginTop:20,
        marginBottom:10,
        height:50,
        borderWidth:2,
        borderColor:'#A52A2A',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:30
    },
    chooseDateText:{
        color:'#A52A2A',
        fontSize:20,
    }

});
