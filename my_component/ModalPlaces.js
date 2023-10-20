import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Picker from './Picker';
import Calenders from './Calenders';
import { Calendar } from 'react-native-calendars';
import Slider from './Slider';
import { ContextAPI } from '../context/ContextAPI';


export default function ModalPlaces({ visible, setModalVisible }) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const day_1 = currentDate.getDate() +1 ;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const [pickDay, setPickDay] = useState("today");
    const [pickTime, setPickTime] = useState("open-now");
    const today = year + "-" + month + "-" + day;
    const tomorrow = year + "-" + month + "-" + day_1;
    const [date, setDate] = useState(year + "-" + month + "-" + day);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [minTime, setMinTime] = useState(900); // State cho giờ bắt đầu
    const [maxTime, setMaxTime] = useState(2300);
    const { setLocations } = useContext(ContextAPI);


    function Close() {
        setModalVisible(false);
    };

    function OpenCalendar() {
        setCalendarVisible(true);
    }
    useEffect(() => {
        if (pickDay != "today") {
            setPickTime('lunch');
        }
    }, [pickDay])
    useEffect(() => {
        if (pickTime == "open-now") {
            setPickDay('today');
        }
    }, [pickTime])

    async function fetchData(timeRange, _date, timeTab, dayTab, timeStart, timeEnd) {
        // console.log("-----------------------");
        // console.log(timeRange);
        // console.log(_date);
        // console.log(timeTab);
        // console.log(dayTab);
        // console.log(timeStart);
        // console.log(timeEnd);
        const apiUrl = `https://starwinelist.com/api/map/venues?time_range=${timeRange}&date=${date}&time_tab=${timeTab}&day_tab=${dayTab}&time_start=${timeStart}&time_end=${timeEnd}&browser_utc=420`;
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setLocations(data.data);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }
    async function onSearch() {
        let timeRange = minTime + "%2C" +maxTime;
        let _date =null;
        let dayTab = pickDay;
        let timeTab = pickTime;
        let timeStart = minTime;
        let timeEnd = maxTime;
        if (pickDay == "tomorrow"){
            _date = tomorrow;
        }
        if (pickDay == "today"){
            _date = today;
        }
        if (pickDay == "custom"){
            _date = date;
        }
        if (pickTime !== "custom"){
            timeStart = 900;
            timeEnd = 2300;
            timeRange = "900%2C2300"
        }
        
        fetchData(timeRange, _date, timeTab, dayTab, timeStart, timeEnd);
        setModalVisible(false);
    }
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

                    <Picker label="Pick a day" const buttons={[
                        { "content": "Today", "params": "today" },
                        { "content": "Tomorrow", "params": "tomorrow" },
                        { "content": "Another day", "params": "custom" }
                    ]} setSelected={setPickDay} selected={pickDay}></Picker>

                    <Picker label="Pick a time" buttons={[
                        { "content": "Open now", "params": "open-now" },
                        { "content": "Lunch", "params": "lunch" },
                        { "content": "Dinner", "params": "dinner" },
                        { "content": "Choose your time", "params": "custom" }
                    ]} setSelected={setPickTime} selected={pickTime}></Picker>

                    {pickDay == "custom" && (
                        <TouchableOpacity style={styles.chooseDate} onPress={OpenCalendar}>
                            <Text style={styles.chooseDateText}>Choose the date: {date}</Text>
                        </TouchableOpacity>
                    )}
                    <Calenders visible={calendarVisible} setDayPicker={setDate} setVisible={setCalendarVisible}></Calenders>
                    {pickTime == "custom" && (
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
        // borderWidth: 1
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
    chooseDate: {
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        borderWidth: 2,
        borderColor: '#A52A2A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    chooseDateText: {
        color: '#A52A2A',
        fontSize: 20,
    }

});
