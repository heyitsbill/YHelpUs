import { Form, FormItem, Picker } from 'react-native-form-component';
import { Text, StyleSheet } from "react-native";

import { useState, useEffect } from 'react';
import { IPost } from '@backend/src/types';
import { login, register, getUserId } from '../services';

interface SignupProps {
  userID: string;
  navigation: any;
}

const SignupScreen = (props: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    const res = await register(email, password, name);
    if (res) {
      props.navigation.navigate('NewPost');
    } else {
      setError('Invalid info');
    }
  }

  useEffect(() => {
    (async () => {
        const id = await getUserId();
        if(id != ''){
            props.navigation.navigate('ListingScreen');
        }
    })()
}, [])

  return (
    <>
      <Form onButtonPress={handleSubmit}>
        <FormItem
          label="Name"
          autoCorrect={false}
          spellCheck={false}
          maxLength={64}
          value={name}
          onChangeText={(temp) => { setName(temp) }}

          asterik
        />
        <FormItem
          label="Email"
          autoCorrect={false}
          spellCheck={false}
          maxLength={64}
          value={email}
          onChangeText={(temp) => { setEmail(temp) }}

          asterik
        />
        <FormItem
          label="Password"
          autoCorrect={false}
          spellCheck={false}
          maxLength={64}
          value={password}
          onChangeText={(temp) => { setPassword(temp) }}
          secureTextEntry={true}

          asterik
        />


      </Form>
      <Text>{error}</Text>
    </>
  );
}

export default SignupScreen;