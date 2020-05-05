import React, { Component } from 'react';

import {Cards, Charts, CountryPicker} from './components/Index';
import styles from './App.module.css';
import {fetchData} from './api/Index';

class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: {},
             country: '',
        }
    }
    
    async componentDidMount () {
        const fetchedData= await fetchData();
        this.setState({
            data: fetchedData
        });
        //console.log("in app.js",fetchedData);
    }

    handleCountryChange = async (country) => {
        const fetchedData= await fetchData(country);
        this.setState({
            data: fetchedData,
            country: country,
        });
        //console.log("444$",country);
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <img className = {styles.image} src="https://i.ibb.co/7QpKsCX/image.png"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Charts data={data} country={country}/>
            </div> 
        )
    }
}

export default App;
