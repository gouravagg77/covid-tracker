import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api/Index';
import {Line, Bar} from 'react-chartjs-2';


import styles from './Charts.module.css'
import { Container } from 'react-bootstrap';

function Charts({data: {confirmedCases, recoveredCases, deaths}, country}) {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        }
        //console.log(dailyData);
        fetchAPI();
    },[]);

    const lineChart = (
        
        dailyData.length 
        ? (
        <Line 
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
              },
            ],
          }}
        /> ) : null
    );

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
                    data: [confirmedCases.value, recoveredCases.value, deaths.value]
                }]
            }}
            options ={{
                legend: {display: false},
                title: {dispaly: true, text: `Current status in ${country}`}
            }}
            />
        ) : null
    )
    return (
        <Container className={styles.container}>
            {country ? barChart :lineChart}
        </Container>
    )
}

export default Charts