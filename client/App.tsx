import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPostScreen from './screens/AddPostScreen';
import LoginScreen from './screens/LoginScreen';

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
            <Stack.Screen name="Profile" component={LoginScreen} />
            <Stack.Screen
              name="Home"
              component={AddPostScreen}
              options={{ title: 'Welcome' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
