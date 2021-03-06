import { Form, FormItem, Picker } from 'react-native-form-component';
import { useState } from 'react';
import { IPost } from '@backend/src/types';
import { createPost, getUserId } from '../services';
import { View, StyleSheet, Button, Alert , Text} from "react-native";

interface AddPostProps {
    userID: string;
    navigation: any;
}

const AddPostScreen = (props: AddPostProps) => {
    const [postTitle, setTitle] = useState('');
    const [postBody, setBody] = useState('');
    const [price, setPrice] = useState('0');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [multipleDays, setMultipleDays] = useState(0);
    const [duration, setDuration] = useState(4);

    const [currPost, setPost] = useState<IPost>({
        title: '',
        description: '',
        price: 0,
        authorID: '',
        time: new Date(),
        status: 'active',
        length: "0-10 min"
    });

    const validateNumber = (value: any) => {
        const number = value.substring(2);
        if(!isNaN(number)) {
            if (number.length > 1 && number.charAt(0) === '0') {
                setPrice(number.substring(1));
            } else if (number.length == 0) {
                setPrice('0');
            } else {
                setPrice(number);
            }
        }
    }
    
    const validateDays = (value: any) => {
        setDays(value);
    }

    const validateHours = (value: any) => {
        setHours(value);
    }

    const validateMultipleDays = (value: any) => {
        setMultipleDays(value);
    }

    const validateDuration = (value: any) => {
        currPost.length = durations[value].label;
        setDuration(value);
    }

    const [error, setError] = useState(Boolean);
    const [inapperror, setinappError] = useState(Boolean);

    const handleSubmit = async () => {
        if(days !== 0 || hours !== 0){
            let ourHours = 0;
            if(multipleDays){
                ourHours = days * 24
            } else {
                ourHours = hours
            }
            const deadline = new Date();
            const finDL = addHours(deadline, ourHours);
            currPost.time = finDL;
            currPost.price = parseInt(price);
            const authorID = await getUserId();
            if(authorID) {
                currPost.authorID = authorID;
            }





            const newPost = await createPost(currPost);
            if(newPost && newPost.status == 200){
                props.navigation.navigate('MyPosts');
            }else if(newPost === "Request failed with status code 400"){
                setinappError(true);
                setError(false);
            }else{
                setError(true);
                setinappError(false);

            }
        }
    }

    function addHours(date: any, funHours: any) {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() + funHours);
        return newDate;
      }

    const durations = [
        { label: '0-10 min', value: 0 },
        { label: '10-30 min', value: 1 },
        { label: '30-60 min', value: 2 },
        { label: '60+ min', value: 3 },
        { label: 'N/A', value: 4 },
    ]


return (
    <View style={{marginLeft: "5%", marginRight: "5%", marginTop: "5%", marginBottom: "5%"}}>
    <Form onButtonPress={handleSubmit}>
      <FormItem
        label="Title"
        autoCorrect={false}
        spellCheck={false}
        maxLength={64}
        autoCapitalize='none'
        isRequired
        value={postTitle}
        onChangeText={(temp) => {
            setPost(currPost => ({...currPost, title: temp}));
            setTitle(temp)}}

        asterik
    />
    <FormItem
        label="Description"
        autoCorrect={false}
        spellCheck={false}
        maxLength={240}
        autoCapitalize='none'
        multiline
        isRequired
        value={postBody}
        onChangeText={(temp) =>{
            setPost(currPost => ({...currPost, description: temp}));
            setBody(temp)}
        }
        asterik
    />
    <FormItem
        label="How much are you willing to pay?"
        isRequired
        value={`$ ${price}`}
        onChangeText={(temp) => {
            validateNumber(temp);
            setPost(currPost => ({...currPost, price: parseInt(temp)}));
        }}
        asterik
    />
    <Picker
        label="Will this posting last multiple days?"
        items={[
            { label: 'No', value: 0 },
            { label: 'Yes', value: 1 },
        ]} 
        placeholder="Select number of days"
        selectedValue={multipleDays}
        onSelection={(item) => validateMultipleDays(item.value)}
    />
    {multipleDays === 1 ?
    <Picker
        label="How many days will this posting last?"
        items={[
            { label: '0 Days', value: 0 },
            { label: '1 Day', value: 1 },
            { label: '2 Days', value: 2 },
            { label: '3 Days', value: 3 },
        ]} 
        placeholder="Select number of days"
        selectedValue={days}
        onSelection={(item) => validateDays(item.value)}
    /> : <Picker
        label="How many hours will this posting last?"
        items={[
            { label: '0 Hours', value: 0 },
            { label: '2 Hours', value: 2 },
            { label: '4 Hours', value: 4 },
            { label: '6 Hours', value: 6 },
            { label: '8 Hours', value: 8 },
        ]} 
        placeholder="Select number of hours"
        selectedValue={hours}
        onSelection={(item) => validateHours(item.value)}
    />}
    <Picker
        label="How long do you expect this to take?"
        items={[
            { label: '0-10 min', value: 0 },
            { label: '10-30 min', value: 1 },
            { label: '30-60 min', value: 2 },
            { label: '60+ min', value: 3 },
            { label: 'N/A', value: 4 },
        ]} 
        placeholder="Select time duration"
        selectedValue={duration}
        onSelection={(item) => validateDuration(item.value)}
    />
    
    
    </Form>
    {(error == true) &&
        <Text style={styles.error}>Invalid post, please try again.</Text>
      }

    {(inapperror == true) &&
        <Text style={styles.error}>Inappropriate, please try again.</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
    error: {
      color: 'red',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });

export default AddPostScreen;