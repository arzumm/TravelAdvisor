import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
// import { RNDomInstance } from "react-native-dom";
// import RCTVideoManager from 'react-native-video/dom/RCTVideoManager';
import Video from 'react-native-video';


// const ReactNativeDomOptions = {
//     enableHotReload: false,
//     nativeModules: [RCTVideoManager] // Add this
//   };

function Cover(props) {
  const { navigation } = props;

  function login() {
    navigation.navigate('Login');
  }
  function signup() {
    navigation.navigate('SignUp');
  }

  return (
    // <Video source = {{uri: "./video/background"}}/> 
    <ImageBackground source={require('../images/dumbo.png')} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Button title='LOGIN' onPress={login} buttonStyle={styles.login} />
        <Button title="SIGNUP" buttonStyle={styles.button} onPress={signup} />
      </View>
    </ImageBackground>
  );
}

Cover.navigationOptions = {
  title: 'Welcome',
}

export default Cover;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    opacity: 1,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
login: {
  marginTop: 200,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1, 
    backgroundColor: 'transparent',
  }, 

  button: {
    marginTop: 20,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1, 
    backgroundColor: 'transparent',

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

