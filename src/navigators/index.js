import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderUtop from '../screens/HeaderUtop';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HeaderUtop"
        component={HeaderUtop}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
