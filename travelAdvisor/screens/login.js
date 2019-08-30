import React, {useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Input, Button} from 'react-native-elements';


function Login(props) {
    const {navigation} = props; 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    function onSubmit() {
        fetch("http://localhost:4000/login", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            }, 
            credentials: "include", 
            redirect: "follow", 
            body: JSON.stringify({
                username, 
                password
            }),
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.success) {
                console.log('successfully logged in!');
                navigation.navigate('Form');
            }
        })
        .catch(err => {
            console.log('the error is', err); 
        })
    }

    return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Login</Text>
          <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}}placeholderTextColor = "white" placeholder = "   Username" leftIcon = {{type: 'font-awesome', name: 'user', color: 'white'}} onChangeText = {text => setUsername(text)}/>
          <Input inputContainerStyle =  {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" secureTextEntry = {true} placeholder = "   Enter your password" leftIcon = {{type: 'font-awesome', name: 'lock', color:  'white'}} onChangeText = {text => setPassword(text)} /> 
          <Button linearGradientProps = {{colors: ['#FF9800', '#F44336'], start:[1,0], end: [0,2]}} title = "LOGIN" buttonStyle = {styles.button} onPress = {onSubmit}></Button>
        </View>
      );

}

Login.navigationOptions = {
    title: "Login",
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2e3246',
      color: 'white',
    },
    textBig: {
      fontSize: 36,
      textAlign: 'center',
      margin: 10,
      color: 'white', 
      fontStyle: 'italic',
    },
    leftIcon: {
      color: '#576084'
    },
    inputStyle: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20, 
      marginTop: 10,
      color: 'white',
    }, 
    button: {
      marginTop: 20,
      borderRadius: 20, 
      width: 200,
    }
  });

export default Login; 


