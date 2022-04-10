import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://localhost:4000';


export const login = async (email: string, password:string)=>{
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password
    });
    if(response.status === 200){
      console.log("login success");
      await AsyncStorage.setItem('userID', response.data);
      return true;
    }else{
      return false;
    }
  } catch (e) {
    // error
    return false;
  }
}


export const register = async (email: string, password: string, name: string) => {
  console.log(email, password, name);
  let res = await axios.post(`${baseUrl}/register`, {
    email,
    password,
    name
  });
  console.log(res.status);
  if(res.status === 200){
    return true;
  }else{
    return false;
  }
};

export const logoutUser = () => {
  removeValue('userID');
}

const removeValue = async (key:string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}

export const getUserId = async () => {
  try {
    let res= await AsyncStorage.getItem('userID');
    if(res==null){
      console.log("bad user id")
      return '';
    }else{
      console.log('good user id')
      console.log(res)
      return res
    }
  } catch(e) {
    // read error
    console.log('failed to read')
    return ''
  }

  console.log('Done.')
}