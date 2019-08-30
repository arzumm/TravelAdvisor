import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import styled from 'styled-components'

function Results(props) {
    const { navigation } = props;
    const result = navigation.getParam('costs', []);
    const travelStyle = navigation.getParam('travelStyle', '');
    console.log('the result', result);

    function onSubmit(countryCode, name) {
        fetch('http://localhost:4000/country/' + countryCode, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.data);
                navigation.navigate('Breakdown', { data: responseJson.data, travelStyle: travelStyle, countryName: name })
            })
            .catch(err => console.log(err));
    }

    return (
        <ImageBackground source={require('../images/dumbo.png')} style={{ width: '100%', height: '100%' }}>
            <View>
                <FlatList data={result}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => onSubmit(item.cost.country_code, item.name)}><Container><Item><Title>{item.name}</Title></Item></Container>
                    </TouchableOpacity>} />
            </View>
        </ImageBackground>
      
    )
}

Results.navigationOptions = {
    title: "Results",
}

const Container = styled.View`
    justify-content:center;
    align-items:center
`
const Title = styled.Text`
font-size:20px;
text-align:center;
 color:white;
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

export default Results;
