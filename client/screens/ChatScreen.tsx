import { Text, View, Pressable, ScrollView, ActivityIndicator, TextInput, Button } from 'react-native'
import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import { IMessage } from '@backend/src/types';
import { useState, useEffect } from 'react';
import { createMessage, getMessages, getPosts, getUserId } from '../services'
import { Card } from '../components/PostComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen({ route, navigation }: any) {
  console.log(route.params.postId)
  const [allMessages, setAllMessages] = useState<IMessage[]>([])
  async function updateMessages() {
    const res = await getMessages(route.params.postId);
    if (res.status == 200) {
      setAllMessages(res.data);
    }
  }

  useEffect(() => {
    
  })

  const [text, onChangeText] = useState('');

  return (
    <>
      <ScrollView style={styles.chatview}>
        {allMessages.map((message) => (
          <Text>{message.from}:{message.content}</Text>
        ))}

      </ScrollView>
      <TextInput onChangeText={onChangeText}
        value={text}
        style={styles.chatInput}
      />

      <Button title="Send" onPress={() => {
        (async () => {
          let content = text;
          onChangeText('');
          let userId = await getUserId();
          const res = await createMessage(userId, route.params.postId, content);
          console.log(res);
          if(res.status==200){
            updateMessages();
          }
        })()
      }} />
    </>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  chatview: {
    height: '60%',
    maxHeight: '60%',
  },
  chatInput: {
    height: '20%',
    maxHeight: '20%',
  }
});
