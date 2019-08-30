import React, {useState, useEffect} from 'react'; 
import { StyleSheet, View, Text, TextInput, FlatList, ImageBackground} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import {Image, Button, Title, Subtitle, Heading, Tile} from '@shoutem/ui'; 
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import styled from 'styled-components'


function Breakdown(props) {
    const {navigation} =  props; 
    const costs = navigation.getParam('data', []); 
    const countryCode = costs[0].country_code;
    const travelStyle = navigation.getParam('travelStyle', ''); 
    const countryName = navigation.getParam('countryName', '');
    const totalAverageCost = costs[costs.length -1][travelStyle];
    const [cities, setCities] = useState("");
    const [fontsLoaded, setFont] = useState(false); 
    
    useEffect(()=> {
        console.log(travelStyle);
        fetch('http://localhost:4000/geonames/' + countryName, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'averageCost': totalAverageCost, 
                'travelStyle': travelStyle,
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            setCities(responseJson.data);
            console.log('geoname data', responseJson);

        })
        .catch(err => console.log(err));
    }, [])

    function onSubmit(city, country) {

        navigation.navigate('BreakdownCity', {cityData: city, country: country, travelStyle: travelStyle}); 

    }

    async function fontAwait () {
        await Font.loadAsync({
            'Rubik-Black': require('../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
            'Rubik-BlackItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
            'Rubik-Bold': require('../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
            'Rubik-BoldItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
            'Rubik-Italic': require('../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
            'Rubik-Light': require('../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
            'Rubik-LightItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
            'Rubik-Medium': require('../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
            'Rubik-MediumItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
            'Rubik-Regular': require('../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
            'rubicon-icon-font': require('../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
          });    
        setFont(true);
    }
   
    useEffect( () => {
        fontAwait();
    }, []); 

    if (!fontsLoaded) { return <AppLoading/>}
    else {
    return (
        <ScrollView>
        <View>
        <Text style = {{fontSize: 36, textAlign: 'center',margin: 10}}>{countryName}</Text>
        <ImageBackground source={require('../images/accommodation.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
          <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Accommodation</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Hotel or hostel for one person</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(costs[0][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/food.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black' }}>
          <View style = {{padding: 5, backgroundColor:'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Food</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>    Meals for one day</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(costs[3][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/transportation.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}s>
          <View style = {{padding: 5, backgroundColor:'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Local Transportation</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>    Taxis, Local buses, subway, etc.</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(costs[2][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/entertainment.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
          <View style = {{padding: 5, backgroundColor:'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Entertainment</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>    Entrance tickets, shows, etc.</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(costs[5][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/alcohol.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
          <View style = {{padding: 5, backgroundColor:'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Alcohol</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>    Drinks for one day</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(costs[11][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <FlatList data={cities} renderItem={({item}) => <TouchableOpacity onPress={() => onSubmit(item, countryName)}><Container><Item><Title style = {{fontSize: 20, textAlign: 'center'}}>{item.name}</Title></Item></Container></TouchableOpacity>} />
</View>
</ScrollView>
    )}
}

const styles = StyleSheet.create({
    textBig: {
        fontSize: 36,
        textAlign: 'center',
        margin: 10,
     
      },

    accomTitle: {
          color: 'white'
      }, 

    foodTitle: {
          color: 'black'
      }, 
    border: {borderWidth: 1, borderColor: 'white', backgroundColor: '#ebecf1', opacity: 0.5}
}); 

const Container = styled.View`
    justify-content:center;
    align-items:center
`

const Item = styled.View`
border:1px solid #ccc;
margin:2px 0;
border-radius:10px;
box-shadow:0 0 10px #ccc;
background-color:transparent;
width:80%;
padding:10px;
 
`
export default Breakdown;

