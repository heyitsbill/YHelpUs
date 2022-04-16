import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPostScreen from './screens/AddPostScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ListingScreen from './screens/ListingScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserPostScreen from './screens/UserPostScreen';
import MaterialCommunityIcons from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import ChatScreen from './screens/ChatScreen';


const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListingScreen" 
              component={ListingScreen}
              options={{title: 'All Posts',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="clipboard-list" size={24} color="black" />
                ),
              }} />
      <Tab.Screen
              name="NewPost"
              component={AddPostScreen}
              options={{ title: 'Create Posting' ,
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="plus" size={24} color="black" />
              ),
            }}
            />
      <Tab.Screen
              name="MyPosts"
              component={UserPostScreen}
              options={({ navigation, route }) => ({
                headerTitle: 'My Posts',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-circle" size={24} color="black" />              ),
              })}
            />
      <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                tabBarButton: props=>null,
              }}
              />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" 
              component={Home}
              options={{headerShown: false}}/>
            
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


