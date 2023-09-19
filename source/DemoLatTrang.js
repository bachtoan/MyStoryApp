import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function DemoLatTrang() {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [currentPage, setCurrentPage] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Xử lý sự kiện di chuyển
      const offsetX = gestureState.dx;
      const newPage = currentPage - offsetX / windowWidth; // Tính trang mới dựa trên vị trí di chuyển
      setCurrentPage(newPage);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Kết thúc sự kiện di chuyển
      const offsetX = gestureState.dx;
      const isEnoughToFlip = Math.abs(offsetX) > windowWidth * 0.3; // Điều kiện để lật trang

      if (isEnoughToFlip) {
        // Lật trang
        const newPage = offsetX > 0 ? Math.floor(currentPage) : Math.ceil(currentPage);
        setCurrentPage(newPage);
      } else {
        // Không đủ để lật trang, quay về trang hiện tại
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Tính giá trị animation dựa trên trang hiện tại
  const translateX = animatedValue.interpolate({
    inputRange: [currentPage - 1, currentPage, currentPage + 1],
    outputRange: [-windowWidth, 0, windowWidth],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.pageContainer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Hiển thị nội dung sách tại đây */}
        <TouchableOpacity style={styles.pageContent}>
          <Text>{currentPage}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageContainer: {
    width: windowWidth - 40, // Kích thước trang sách
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
