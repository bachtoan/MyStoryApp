import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // console.error('Lỗi khi lưu dữ liệu:', error);
    }
};

// Lấy dữ liệu từ Async Storage
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const parsedValue = JSON.parse(value);
            return parsedValue;
        } else {
            // Không có dữ liệu với key này
            // console.log('AsyncStorage: Không tìm thấy dữ liệu cho key:', key);
            return null;
        }
    } catch (error) {
        // console.error('AsyncStorage: Lỗi khi lấy dữ liệu:', error);
        return null;
    }
};
