import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function AddPostScreen() {
  const [postTitle, setPostTitle] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thêm bài viết</Text>
      <ScrollView>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tiêu đề bài viết</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tiêu đề bài viết"
            value={postTitle}
            onChangeText={(text) => setPostTitle(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Đường link ảnh</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập đường link ảnh"
            value={imageLink}
            onChangeText={(text) => setImageLink(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nội dung tóm tắt</Text>
          <TextInput
            style={[styles.input, styles.multiLineInput]}
            placeholder="Nhập nội dung tóm tắt"
            value={summary}
            multiline
            numberOfLines={3}
            onChangeText={(text) => setSummary(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nội dung</Text>
          <TextInput
            style={[styles.input, styles.multiLineInput]}
            placeholder="Nhập nội dung"
            value={content}
            multiline
            numberOfLines={6}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonGroup}>
        <Button title="Huỷ" />
        <Button title="Submit" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  multiLineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
