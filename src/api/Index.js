import axios from 'axios'

const url = 'https://disease.sh/v2/';

export const fetchData = async (country) => {
    let changeableUrl;
    if (!country) {
        changeableUrl = `${url}all`;
    }
    else {
        changeableUrl = `${url}countries/${country}`;
    }
    try {
        const { data } = await axios.get(changeableUrl);

        const modifiedData = {
            confirmedCases: data.cases,
            recoveredCases: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.updated,
        }

        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async (country) => {
    if (!country) {
        return [];
    }
    try {
        const { data } = await axios.get(`${url}historical?lastdays=all`);

        let dailyData = {};
        for (let i = 0; i < data.length; i++) {
            dailyData[data[i].country] =  data[i].timeline ;
        }

        const dates = Object.keys(dailyData[country].cases);
        const cases = dates.map(date =>  dailyData[country].cases[date]);
        const recovered = dates.map(date =>  dailyData[country].recovered[date]);
        const deaths = dates.map(date =>  dailyData[country].deaths[date]);
 
        const countryDaily = {
            dates,
            confirmedCases: cases,
            recoveredCases: recovered,
            deaths: deaths
        }
        return countryDaily;
    }
    catch{

    }
}

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}countries`);
        const countries = data.map((country) => country.country);
        return countries;
    } catch {

    }
}

export const fetchMapData = async () => {
    try {
        const { data } = await axios.get(`${url}countries`);
        return data;
    } catch (err) {
        console.log(err);
    }
}