import React, {useState, useEffect} from 'react'; 
import { StyleSheet, View, Text, ImageBackground, FlatList} from 'react-native';
import { TouchableOpacity,  ScrollView} from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Title, Subtitle, Heading} from '@shoutem/ui'; 
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

function BreakdownCity(props) {
    const {navigation} = props; 
    const cityName = navigation.getParam('cityData', {}).name;
    const cityCosts = navigation.getParam('cityData', {}).costs;
    const countryName = navigation.getParam('country', ""); 
    const travelStyle = navigation.getParam('travelStyle', "");
    const [fontsLoaded, setFont] = useState(false); 

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

    useEffect(()=> {
        fontAwait(); 
    }, []); 


        if (!fontsLoaded) {return <AppLoading/> }
        else {
            return (
        <ScrollView> 
        <View>
        <Text style = {styles.textBig}>{cityName},{countryName}</Text>
        <ImageBackground source={require('../images/accommodation.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
        <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Accommodation</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Hotel or hostel for one person</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}> ${Math.floor(cityCosts[0][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/food.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
          <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Food</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Meals for one day</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(cityCosts[3][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/transportation.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
        <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Local Transportation</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Taxis, Local buses, subway, etc.</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(cityCosts[2][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../images/entertainment.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
        <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Entertainment</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Meals for one day</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(cityCosts[5][travelStyle])}</Heading>
          </View>
        </ImageBackground>
        
        <ImageBackground source={require('../images/alcohol.png')} resizeMode = "stretch" style= {{width: '100%', height: 200, borderWidth: 1, borderColor: 'black'}}>
        <View style = {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}><Title style = {{fontWeight: 'bold'}}>   Alcohol</Title>
          <Subtitle style = {{fontWeight: 'bold'}}>   Drinks for one day</Subtitle>
          <Heading style = {{fontWeight: 'bold'}}>   ${Math.floor(cityCosts[11][travelStyle])}</Heading>
          </View>
        </ImageBackground>
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
}); 

export default BreakdownCity;