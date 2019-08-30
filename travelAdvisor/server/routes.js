const express = require('express'); 
const router = express.Router(); 
const fetch = require('node-fetch'); 
const path = require('path');
const cc = require('currency-codes');
const fs = require('fs');
const convertCurrency = require('nodejs-currency-converter');
let countries = []; 
let costs = [];
let geonameCosts = [];


function getGeonameCosts(geoname) {
    fetch('https://www.budgetyourtrip.com/api/v3/costs/locationinfo/' + geoname, {
        method: 'GET', 
        headers: {
                'X-API-KEY': process.env.API_KEY,
            },
    })
    .then(response => {
        let resps = response.text(); 
        return resps;
    })
    .then(responseJson => {
        // console.log(responseJson);
        if (responseJson[1]==='<') return;
        let json = JSON.parse(responseJson); 
        // console.log(json);
        if (json.status && json.data.costs) {
            geonameCosts.push({name: json.data.info.name, costs: json.data.costs}); 
            
        }
})
.catch(err => console.log(err))
}


router.post('/countries', function(req, res){
    const travelStyle = req.body.travelStyle; 
    const budget = req.body.budget; 
    let countryCosts; 
    console.log('travel style and budget:', travelStyle, budget);
    fs.readFile(path.join(__dirname, '../data/country_costs.json'), (err, jsonString) => {
        if (err) {
            console.log("Error reading file:", err)
            return
        }
        try {
            countryCosts = JSON.parse(jsonString)
            console.log('read from a file!');
            let filtered = countryCosts.filter(obj => {
                const name = obj.name.toLowerCase(); 
                // console.log(name); 
                let currency = cc.country(name); 
                if (currency.length !== 0) {
                    currency = currency[0].code;
                    console.log(currency);
                    // convertCurrency(1, currency, 'USD').then(response => console.log(response));
                }
                return obj.cost[travelStyle] <= budget});
            res.json({data: filtered});
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    
})
  

router.get('/country/:countryCode', function(req, res){
    fetch('https://www.budgetyourtrip.com/api/v3/costs/countryinfo/' + req.params.countryCode, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(responseJson => {
        res.json({data: responseJson.data.costs}) }) 
    .catch(err => console.log(err));

});



router.post('/geonames/:countryName', function(req, res){
    const countryName = req.params.countryName; 
    const travelStyle = req.body.travelStyle; 
    const averageCost = req.body.averageCost; 
    let geonameCosts = []; 
    let geonames = [];
    let filteredCosts = []; 


    fs.readFile(path.join(__dirname, '../data/world-cities_json.json'), (err, jsonString) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        try {
            geonames = JSON.parse(jsonString)
            console.log('read from world_cities!');
            let filteredGeos= geonames.filter(obj => {
                if (countryName === 'United States of America') {
                    return obj.country === 'United States'
                }
                return obj.country === countryName; 
            });
            fs.readFile(path.join(__dirname, '../data/geonameid_costs.json'), (err, string) => {
                if (err) {console.log('error reading from geonameid_costs'); return; }
                try {
                    geonameCosts = JSON.parse(string);
                    console.log('read from geonameid costs');
                    filteredGeos.forEach((geo,i) => {
                        // console.log(geo);
                        geonameCosts.forEach(costdata => {
                            if (costdata.costs[0].geonameid == geo.geonameid) {
                                console.log('equal');
                                if (costdata.costs[costdata.costs.length -1][travelStyle] <= averageCost) {
                                    filteredCosts.push(costdata);
                                }
                            } 
                        })
                        if (i === filteredGeos.length - 1) {
                            console.log(filteredCosts);
                            res.json({data: filteredCosts}); 
                            console.log('sent the data!');
                        }
                    })

                }
                catch(err) {console.log('error parsing geoname_costs json', err)}
            })
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })


})

function getId(capital, geoname) {
    fetch('https://www.budgetyourtrip.com/api/v3/search/locationdata/' + capital, {
        method: 'GET', 
        headers: {
            'X-API-KEY': process.env.API_KEY
        },
    })
    .then(response => response.text())
    .then(responseJson => {
        if (responseJson[1]==='<' || responseJson[1]==='e' ) {
            return;
        }
        else {
            let json = JSON.parse(responseJson);
            if (json.status) {geoname.id = json.data.geonameid}
        }
    })
    .catch(err => console.log(err))
}


router.get('/costs/:capital', function(req, res){
    let geoname= {};
    let capitalCosts = [];
    getId(req.params.capital, geoname);
    getGeonameCosts(geoname.id, [], capitalCosts);
    if(capitalCosts.length!==0) {
        res.json({data: capitalCosts});
    }



})


module.exports = router;
