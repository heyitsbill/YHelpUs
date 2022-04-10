import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import { IPost } from '@backend/src/types';
import { useState, useEffect } from 'react';
import { getPosts, deletePost, getUserId } from '../services'
import { Card } from '../components/PostComponent';

export default function ListingScreen({ navigation }: any) {
  const [allPosts, setAllPosts] = useState<IPost[]>([])
  const [userID, setUserID] = useState('')
  
  //fetch all posts
    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action
        (async () => {
                  const posts = await getPosts()
                  
                  const ourPosts = posts.data
                  setAllPosts(ourPosts)
              })()
      });
      return unsubscribe;
    }, [navigation]);


    useEffect(()=>{
        (async () => {
            const id = await getUserId()
            setUserID(id)
        })()
    }, [userID])
    // useEffect(() => {
    //     (async () => {
    //         const posts = await getPosts()
    //         const ourPosts = posts.data
    //         setAllPosts(ourPosts)
    //     })()
    // }, [])

    const handlePressPost = (postid:string) => {
      return ()=>{
          // navigation.navigate('Chat', {postId: postid});
      }
    }

  const handleDeletePost = async (postID: string) => {
    await deletePost(postID)
    const posts = await getPosts()
    const ourPosts = posts.data
    setAllPosts(ourPosts)
    }


  return (
    <View style={menu.wrapper}>
    <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
      <View style={home.menuView}>
        {allPosts
          .map((post) => (
            <Card key={post._id} onPressDelete={handleDeletePost} post={post} userID={userID}  onPress={()=>{navigation.navigate('Chat', {postId:post._id, userID: userID})}}/>
          ))}
      </View>
    </ScrollView>
    </View>

  );
}

const menu = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#DAF7A6',
    },
  
    upperContainer: {
      flex: 13,
    },
  
    lowerContainer: {
      width: '100%',
      height: '18%',
      backgroundColor: '#fff',
    },
  })

const home = StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: '#eaeaea',
    },
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  
    outerContainer: {
      flex: 1,
      flexDirection: 'column',
      padding: 0,
      marginTop: 5,
      marginBottom: 10,
      marginHorizontal: 12,
    },
  
    textContent: {
      justifyContent: 'flex-end',
      marginBottom: 15,
      marginLeft: 10,
    },
  
    menuView: {
      margin: 8,
      backgroundColor: "#DAF7A6",
    },
  
    footer: {
      width: '100%',
      height: '18%',
      backgroundColor: '#fff',
    },
  })
  
