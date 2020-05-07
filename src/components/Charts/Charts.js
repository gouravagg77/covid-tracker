import React, {useState, useEffect, useRef} from 'react'
import {fetchDailyData} from '../../api/Index';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Charts.module.css'
import { Container } from 'react-bootstrap';

function Charts({data: {confirmedCases, recoveredCases, deaths}, country}) {
    //console.log("***************", country);
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        //console.log('object');
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData(country);
            //console.log("****",initialDailyData);
            setDailyData(initialDailyData);
        } 
        //console.log("daily",dailyData);
        fetchAPI();
    },[country]);
  
    const lineChart = (
        
        dailyData.length 
        ? (
        <Line 
          className = {styles.chart}
          data = {{ 
              labels: dailyData.map(({date}) => date),
              datasets: [{
                  data: dailyData.map(({confirmedCases}) => confirmedCases),
                  label: 'Infected',
                  borderColor: '#3333ff',
                  fill: true,  
              },{
                data: dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true, 
              },{
                data: dailyData.map(({recoveredCases}) => recoveredCases),
                label: 'Recovered',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                fill: true, 
              },
            ],
          }}
          options ={{
           maintainAspectRatio: false,
            
        }}
        /> ) : null
    );
    console.log('confirmed',confirmedCases);
    const barChart = ( 
        confirmedCases
        ? (
            <Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                    ],
                    data: [confirmedCases, recoveredCases, deaths]
                }]
            }}
            options ={{
                legend: {display: false},
                title: {dispaly: true, text: `Current status in ${country? country.name : 'World'}`},
                maintainAspectRatio: false,
                
            }}
            />
        ) : null
    )
    return (
        <Container className={styles.container}>
            <div className={styles.chart}>
            {Object.keys(country).length  ? lineChart : barChart}
            </div>
        </Container>
    )
}

export default Charts