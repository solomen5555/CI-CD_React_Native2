import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import HeaderUtop from './screens/HeaderUtop';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './navigators';

//test push

const App = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer>
        <MainStack />
      </NavigationContainer> */}
      <HeaderUtop />
    </SafeAreaProvider>
  );
};

export default App;
