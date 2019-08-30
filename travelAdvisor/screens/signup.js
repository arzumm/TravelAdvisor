import React, {useState} from 'react'; 
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Input, Button} from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 


function SignUp(props) {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState(""); 
    const [country, setCountry] = useState(""); 
    const {navigation} = props;

    function onSubmit() {
      fetch('http://localhost:4000/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },   
        body: JSON.stringify({
          username: username, 
          password: password, 
          firstName: firstName, 
          lastName: lastName, 
          country: country
        }), 
      })
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.success) {
          console.log('successfully signed up!');
          navigation.navigate('Login');  
        }
      })
      .catch(err => {
        console.log('There was an error signing up', err); 
      }); 
    }
    return (
        <View style = {styles.container}>
            <Text style = {styles.textBig}>SignUp</Text>
            <Input inputContainerStyle = {styles.topInput} inputStyle = {{color: 'white'}} placeholderTextColor = 'white' placeholder = " First Name" leftIcon = {{type: 'font-awesome', name: 'id-card-o', color: 'white'}} onChangeText = {text => setfirstName(text)}/>
            <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" placeholder = " Last Name" leftIcon = {{type: 'font-awesome', name: 'id-card-o', color: 'white'}} onChangeText = {text => setlastName(text)}/>
            <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" placeholder = "   Username" leftIcon = {{type: 'font-awesome', name: 'user', color: 'white'}} onChangeText = {text => setUsername(text)}/>
            <Input inputContainerStyle =  {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" secureTextEntry = {true} placeholder = "   Enter your password" leftIcon = {{type: 'font-awesome', name: 'lock', color: 'white'}} onChangeText = {text => setPassword(text)} /> 
            <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" placeholder = "  Country of Citizenship" leftIcon = {{type: 'font-awesome', name: 'home', color: 'white'}} onChangeText = {text => setCountry(text)}/>
            <Button linearGradientProps = {{colors: ['#FF9800', '#F44336'], start:[1,0], end: [0,2]}} title = "SIGNUP" buttonStyle = {styles.button} onPress = {onSubmit}></Button>
        </View>
    ); 
}

SignUp.navigationOptions = {
  title: 'SignUp',
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2e3246',
    },
    textBig: {
      fontSize: 36,
      textAlign: 'center',
      margin: 10,
      color: 'white', 
      fontStyle: 'italic'
    },
    leftIcon: {
      color: 'white'
    },
    topInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20, 
      marginTop: 20,
    },
    inputStyle: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20, 
      marginTop: 10,
    }, 
    button: {
      marginTop: 20,
      borderRadius: 20, 
      width: 200,
    }
  });


export default SignUp;
