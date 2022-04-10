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
      await AsyncStorage.setItem('userID', response.data.token);
      return true;
    }else{
      return false;
    }
  } catch (e) {
    // error
    return false;
  }
}


export const register = (email: string, password: string, name: string) => {
  return axios.post("/register", {
    email,
    password,
    name
  });
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
    return await AsyncStorage.getItem('userID')
  } catch(e) {
    // read error
  }

  console.log('Done.')
}