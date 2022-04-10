import { Form, FormItem, Picker} from 'react-native-form-component';
import { Text, StyleSheet } from "react-native";

import { useState, useEffect } from 'react';
import { IPost } from '@backend/src/types';
import { getUserId, login } from '../services';

interface AddPostProps {
    userID: string;
    navigation: any;
}

const LoginScreen = (props: AddPostProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(Boolean);
  
  useEffect(() => {
    (async () => {
        const id = await getUserId();
        console.log(`here is id: ${id}`)
        if(id !== 'undefined'){
            props.navigation.navigate('Home');
        }
    })()
}, [])
  
  const handleSubmit = async () => {
      const res = await login(email, password);
      console.log("helloo");
      if (res) {
          props.navigation.navigate('Home');
      }else{
          setError(true);
      }
  }


return (
  <>
    <Form onButtonPress={handleSubmit}>
      <FormItem
        label="Email"
        autoCorrect={false}
        spellCheck={false}
        maxLength={64}
        value={email}
        onChangeText={(temp) => {setEmail(temp)}}
        asterik
    />
    <FormItem
        label="Password"
        autoCorrect={false}
        spellCheck={false}
        maxLength={64}
        value={password}
        onChangeText={(temp) => {setPassword(temp)}}
        secureTextEntry={true}
        asterik
    />
    
    
    </Form>
    {(error == true) &&
      <Text style={styles.error}>Invalid email or password!</Text>
    }
    <Text style={styles.signupPrompt}>Don't have an account? <Text 
    onPress={()=>props.navigation.navigate("Signup")}
    style ={styles.link}>Sign up here!</Text></Text>
    
    

    </>
  );
}

const styles = StyleSheet.create({
  signupPrompt:{
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default LoginScreen;