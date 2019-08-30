import React, {useState, useEffect} from 'react'; 
import { StyleSheet, View, Text, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; 
import {Input, Button} from 'react-native-elements'; 


function Form(props) {
    const { navigation } = props; 
    const [budget, setBudget] = useState("");  
    const [travelstyle, setTravelStyle] = useState(""); 
    const [duration, setDuration] = useState(""); 
    const [result, setResult] = useState("");
    const travelStyles = [{label:'Cheap', value: 'value_budget'}, {label: 'Mid-Range', value: 'value_midrange'}, {label: 'High-End', value: 'value_luxury'}]; 
    const placeholder = {
        label: '    Select a travel style...',
        value: null,
        color: '#9EA0A4',
      };
  
    function onSubmit() {
        fetch("http://localhost:4000/countries", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                travelStyle: travelstyle,
                budget: budget/duration,
            }),
        })
        .then(response => response.json())
        .then(responseJson => {
            setResult(responseJson.data); 
            navigation.navigate('Results', {costs: responseJson.data, travelStyle: travelstyle}); 
            
        })
        .catch(err => {
            console.log(err); 
        })


    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.textBig}>Fill out the form below!</Text>
            <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" placeholder = "  Total budget in dollars" leftIcon = {{type: 'font-awesome', name: 'dollar', color: 'white'}} onChangeText = {text => setBudget(text)}/>
            <RNPickerSelect style = {styles} placeholder = {placeholder} items = {travelStyles} onValueChange = {value => setTravelStyle(value)} value = {travelstyle} /> 
            <Input inputContainerStyle = {styles.inputStyle} inputStyle = {{color: 'white'}} placeholderTextColor = "white" placeholder = "  Desired duration of stay in days" leftIcon = {{type: 'font-awesome', name: 'calendar', color: 'white'}} onChangeText = {text => setDuration(text)}/>
            <Button linearGradientProps = {{colors: ['#FF512F', '#F09819', '#FF512F'], start:[1,0], end: [0,2]}} title = "Submit" buttonStyle = {styles.button} onPress = {onSubmit}></Button>
        </View>
    );
}

Form.navigationOptions = {
    title: "Form", 
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
    inputIOS: {
        height: 40,
        fontSize: 16, 
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        marginRight: 8, 
        marginLeft: 8, 
        color: 'white',
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

  export default Form; 

