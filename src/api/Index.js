import axios from 'axios'

const url = 'https://api.covid19api.com/';

export const fetchData = async (country) => {

    try {
        //console.log(changeableUrl);
        const {data} = await axios.get(`${url}summary`);
        console.log("111111",data);
        let countryData = {};
        for ( let i = 0 ; i < data.Countries.length ; i++) {
           countryData[`${data.Countries[i].Country}`]= {
            confirmedCases: data.Countries[i].TotalConfirmed,
            recoveredCases: data.Countries[i].TotalRecovered,
            deaths: data.Countries[i].TotalDeaths,
            lastUpdate: data.Countries[i].Date,
           }
        }
        console.log("1223",countryData)
        if(country){
            const modifiedData = countryData[country.Country];
            console.log("fetched country",modifiedData);
            return modifiedData;
        } else {
            const modifiedData = {
                confirmedCases: data.Global.TotalConfirmed,
                recoveredCases: data.Global.TotalRecovered,
                deaths: data.Global.TotalDeaths,
                lastUpdate: data.Date.substring(0,10),
            }
            console.log("fetched",modifiedData);
            return modifiedData;   
        } 
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async (country) =>{
    if(Object.keys(country).length === 0){
        //console.log("in index.js",country)
        return [];
    } 
    try{
        console.log("country daily data!!!!")
        const {data} = await axios.get(`${url}live/country/${country.Slug}/status/confirmed`);
        console.log("1111",data);
        const modifiedData = data.map((daily) => ({
        confirmedCases: daily.Confirmed,
        recoveredCases: daily.Recovered,
        deaths: daily.Deaths,
        date: daily.Date.substring(0,10),
        }));
        //console.log("daily modified data",modifiedData)
        return modifiedData;
    }
    catch{

    }
}

export const fetchCountries = async () => {
    try{
        const countries = await axios.get(`${url}countries`);
        console.log("in api",countries.data);
        return countries.data;
    } catch {

    }
}
