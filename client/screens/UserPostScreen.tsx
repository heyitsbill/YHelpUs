import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import { IPost } from '@backend/src/types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { getUserPosts, getAcceptedPosts, getUserId, deletePost, logoutUser } from '../services'
import { Card } from '../components/PostComponent';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function UserPostScreen({ navigation }: any, props: any) {
  const [myPosts, setMyPosts] = useState<IPost[]>([])
  const [acceptedPosts, setAcceptedPosts] = useState<IPost[]>([])
  const [userID, setUserID] = useState('')

  useEffect(()=>{
    (async () => {
        const id = await getUserId()
        setUserID(id)
    })()
}, [userID])

  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons name="logout" size={24} color="black" onPress={()=>{logoutUser(); navigation.navigate("Login")}} />
        ),
    });
  }, [navigation]);

  //fetch all posts
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      (async () => {
        const id = await getUserId()
        const posts = await getUserPosts(id)
        const ourPosts = posts.data
        setMyPosts(ourPosts)
        const postsAgain = await getAcceptedPosts(id)
        const ourPostsAgain = postsAgain.data
        setAcceptedPosts(ourPostsAgain)
    })()
    });
    return unsubscribe;
  }, [navigation]);

  const handleDeletePost = async (postID: string) => {
    await deletePost(postID)
    const id = await getUserId()
      const posts = await getUserPosts(id)
      const ourPosts = posts.data
      setMyPosts(ourPosts)
      const postsAgain = await getAcceptedPosts(id)
      const ourPostsAgain = postsAgain.data
      setAcceptedPosts(ourPostsAgain)
    }

  const handlePressPost = (post: IPost) => {
  }
  return(
    <View style={menu.wrapper}>
    <Text style={{marginLeft: "auto", marginRight: "auto", fontSize:30, marginVertical:10}}>My Posts</Text>
    <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
      <View style={home.menuView}>
        {myPosts
          .map((post) => (
            <Card key={post._id} onPressDelete={handleDeletePost} userID={userID} post={post} onPress={()=>{navigation.navigate('Chat', {postId:post._id, userID: userID})}}/>
          ))}
      </View>
    </ScrollView>
    <Text style={{marginLeft: "auto", marginRight: "auto", fontSize:30, marginVertical:10}}>Accepted Posts</Text>
    <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
        <View style={home.menuView}>
            {acceptedPosts
                .map((post) => (
                    <Card key={post._id} onPressDelete={handleDeletePost} userID={userID} post={post} onPress={()=>{navigation.navigate('Chat', {postId:post._id, userID: userID})}}/>
                ))}
        </View>
    </ScrollView>
    </View>
  )
}

  
  const menu = StyleSheet.create({
      wrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#DAF7A6',
      },
    
      upperContainer: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
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
    
  