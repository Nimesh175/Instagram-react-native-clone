/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigations from './src/navigations/StackNavigations';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  
  React.useEffect(()=> {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor="#fff" />

      <NavigationContainer>
        <NativeBaseProvider>
          <StackNavigations/>
        </NativeBaseProvider>
      </NavigationContainer>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default App;
