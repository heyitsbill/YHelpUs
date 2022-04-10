import React, { useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { IPost } from '@backend/src/types'

interface CardProps {
    post: IPost,
    onPress?: () => void
}



export const Card = (props: CardProps) => {


  const [isOpen, setIsOpen] = useState(true)
  const [openTimeHours, setOpenTimeHours] = useState(0)
  const [closeTimeHours, setCloseTimeHours] = useState(0)
  const [openTimeMinutes, setOpenTimeMinutes] = useState(0)
  const [closeTimeMinutes, setCloseTimeMinutes] = useState(0)

  // determines whether the post is currently open
  function currentlyOpen() {

    const h = new Date().getHours()
    const m = new Date().getMinutes()

    if (openTimeHours < closeTimeHours) {
      // standard case
      return (
        (h > openTimeHours && h < closeTimeHours) ||
        (h == openTimeHours && m >= openTimeMinutes) ||
        (h == closeTimeHours && m < closeTimeMinutes)
      )
    } else if (openTimeHours > closeTimeHours) {
      // time wraps around midnight
      return (
        h > openTimeHours ||
        h < closeTimeHours ||
        (h == openTimeHours && m >= openTimeMinutes) ||
        (h == closeTimeHours && m < closeTimeMinutes)
      )
    } else {
      // within the same hour
      return m >= openTimeMinutes && m < closeTimeMinutes
    }
  }

  // immediately check if the buttery is open
  useEffect(() => {
    setIsOpen(currentlyOpen())
  }, [isOpen])

  //check every minute whether the buttery is open
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(currentlyOpen())
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen])

  // find if post is still open
    
            
            

  // takes openTime and closeTime and puts them into clean text form. Assumes (h)h:(m)m form with optional pm/am
  function cleanTime() {
    const cleanOpen =
      (openTimeHours % 12) +
      ':' +
      (openTimeMinutes < 10 ? '0' : '') +
      openTimeMinutes +
      (openTimeHours > 12 ? 'pm' : 'am')
    const cleanClose =
      (closeTimeHours % 12) +
      ':' +
      (closeTimeMinutes < 10 ? '0' : '') +
      closeTimeMinutes +
      (closeTimeHours > 12 ? 'pm' : 'am')
    return cleanOpen + ' - ' + cleanClose
  }

  return (
      <View style={{margin: 4}}>
        
      </View>
  )
}