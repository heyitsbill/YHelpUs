import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import { IPost } from '@backend/src/types';
import { useState, useEffect } from 'react';
import { getUserPosts, getAcceptedPosts } from '../services'
import { Card } from '../components/PostComponent';

export default function UserPostScreen({ navigation }: RootTabScreenProps<'TabOne'>, props: any) {
  const [myPosts, setMyPosts] = useState<IPost[]>([])
  const [acceptedPosts, setAcceptedPosts] = useState<IPost[]>([])

  //fetch all posts
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      (async () => {
        const posts = await getUserPosts('6252257bb24f8e6622ed8886')
        const ourPosts = posts.data
        setMyPosts(ourPosts)
        const postsAgain = await getAcceptedPosts('6252257bb24f8e6622ed8886')
        const ourPostsAgain = postsAgain.data
        setAcceptedPosts(ourPostsAgain)
    })()
    });
    return unsubscribe;
  }, [navigation]);


  const handlePressPost = (post: IPost) => {
  }
  return(
    <View style={menu.wrapper}>
    <Text style={{marginLeft: "auto", marginRight: "auto", fontSize:30, marginVertical:10}}>My Posts</Text>
    <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
      <View style={home.menuView}>
        {myPosts
          .map((post) => (
            <Card key={post._id} post={post}/>
          ))}
      </View>
    </ScrollView>
    <Text style={{marginLeft: "auto", marginRight: "auto", fontSize:30, marginVertical:10}}>Accepted Posts</Text>
    <ScrollView style={menu.upperContainer} showsVerticalScrollIndicator={false}>
        <View style={home.menuView}>
            {acceptedPosts
                .map((post) => (
                    <Card key={post._id} post={post}/>
                ))}
        </View>
    </ScrollView>
    </View>
  )
}


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
  });
  
  const menu = StyleSheet.create({
      wrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#8aebff',
      },
    
      upperContainer: {
        borderColor: '#fff',
        borderWidth: 5,
        borderRadius: 15,
        flex: 13,
      },
    
      lowerContainer: {
        width: '100%',
        height: '18%',
        backgroundColor: '#fff',
      },
    })
    
  const item = StyleSheet.create({
      card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 120,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 6,
        shadowRadius: 2,
        margin: 4,
        marginVertical: 8,
      },
    
      leftSide: {
        flex: 6,
      },
    
      itemName: {
        fontFamily: 'HindSiliguri-Bold',
        fontWeight: 'bold',
        color: '#222',
        fontSize: 20,
        marginBottom: 5,
      },
    
      itemDescription: {
        fontFamily: 'Roboto-Italic',
        color: '#777',
        fontSize: 11,
        flex: 2,
        marginRight: 10,
      },
    
      itemPrice: {
        fontFamily: 'HindSiliguri',
        fontWeight: 'bold',
        color: '#222',
        fontSize: 18,
        //backgroundColor: 'blue'
      },
    
      button: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        height: '38%',
        alignItems: 'center',
        width: '10%',
      },
    
      buttonText: {
        justifyContent: 'center',
        fontFamily: 'Roboto',
        alignItems: 'center',
        fontSize: 25,
        textAlignVertical: 'center',
      },
    
      countText: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
      },
    
      spacer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      buttonSpacer: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
      },
    
      outerContainer: {
        flex: 2,
        backgroundColor: '#fff',
      },
    
      upperContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
    
      lowerContainer: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      priceText: {
        fontFamily: 'HindSiliguri',
        color: '#000',
        fontSize: 18,
        padding: 10,
      },
    
      checkoutText: {
        fontFamily: 'HindSiliguri-Bold',
        color: '#fff',
        fontSize: 25,
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
        backgroundColor: "#8aebff",
      },
    
      footer: {
        width: '100%',
        height: '18%',
        backgroundColor: '#fff',
      },
    })
    
  