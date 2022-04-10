import React, { useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { IPost } from '@backend/src/types'

interface CardProps {
    post: IPost,
    onPress?: () => void
}



export const Card = (props: CardProps) => {

  const onPressCard = () => {
      console.log('pressed')
    }

  const timeRemaining = (post: IPost) => {
    const now = new Date();
    const postTime = new Date(post.time);
    const diff = postTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if(days > 0) {
        if(days === 1) {
            return `${days} day left on posting`;
        } else {
            return `${days} days left on posting`;
        }
    } else {
        return `${hours} hours left on posting`;
    }
  }
  return (
      <View style={{ margin: 4 }}>
          <Pressable onPress={props.onPress}
            style={styles.pressable}>
                <Text style={{ fontSize: 24, fontFamily: "Gill Sans", fontWeight: 'bold'}}>{props.post.title}</Text>
                <Text style={{ fontSize: 20, fontFamily: "Gill Sans"}}>{props.post.description}</Text>
                <Text>{props.post.price === 0 ? "Free" : `$${props.post.price}`}</Text>
                <Text>{`Expected duration: ${props.post.length}`}</Text>
                <Text>{timeRemaining(props.post)}</Text>            
            </Pressable>
      </View>
        
  )
}

const styles = StyleSheet.create({
  pressable:{
    opacity: 1,
    backgroundColor: "#8ac6ff", 
    borderRadius: 16, 
    borderWidth: 2, 
    borderColor: "black", 
    borderStyle: "solid",
    padding: 8
  }
})

const card = StyleSheet.create({
    cardText1: {
      textAlignVertical: 'bottom',
      fontFamily: 'HindSiliguri-Bold',
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 22,
      marginBottom: 25,
      marginTop: 15,
    },
  
    textContainer: {
      flex: 1,
    },
  
    cardText2: {
      fontFamily: 'Roboto-Italic',
      marginBottom: 15,
    },
  
    card: {
      flex: 1,
      height: '100%',
      elevation: 3,
      backgroundColor: '#fff',
      borderRadius: 6,
      shadowRadius: 2,
      marginVertical: 8,
    },
  
    cardContent: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 10,
      opacity: 1,
    },
  
    butteryIcon: {
      width: 75,
      height: 75,
      marginVertical: 12,
      marginRight: 10,
    },
  })