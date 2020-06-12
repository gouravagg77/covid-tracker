import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api/Index';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css'
import { Container } from 'react-bootstrap';
import Map from '../Map/Map'

function Charts({ data: { confirmedCases, recoveredCases, deaths }, country }) {

    const [dailyData, setDailyData] = useState({});
    const [chartView, setchartView] = useState(true);
    const [mapView, setmapView] = useState(false);

    useEffect(() => {

        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData(country);
            setDailyData(initialDailyData);
        }

        fetchAPI();
    }, [country]);

    const setView = view => {
        if (view === 'map') {
            setmapView(true);
            setchartView(false);
        } else {
            setmapView(false);
            setchartView(true);
        }
    }

    const lineChart = (
        Object.keys(dailyData).length
            ? (
                <Line
                    className={styles.chart}
                    data={{
                        labels: dailyData.dates.map(date => date),
                        datasets: [{
                            data: dailyData.confirmedCases.map( cases  => cases),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            //backgroundColor: 'rgba(0, 0, 255, 0.5)',
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 2,
                        }, {
                            data: dailyData.deaths.map( death => death),
                            label: 'Deaths',
                            borderColor: 'red',
                            //backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 2,
                        }, {
                            data: dailyData.recoveredCases.map( cases  => cases),
                            label: 'Recovered',
                            borderColor: 'green',
                            //backgroundColor: 'rgba(0, 255, 0, 0.5)',
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 2,
                        },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />) : null
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
                            data: [confirmedCases, recoveredCases, deaths]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { dispaly: true, text: `Current status in ${country ? country.name : 'World'}` },
                        maintainAspectRatio: false,
                    }}
                />
            ) : null
    )

    return (
    
        <Container>
            {country &&}
            <div className={styles.view}>
                <button className={chartView ? `${styles.button} ${styles.buttonChart}` : `${styles.button}`} onClick={() => setView('chart')}>View Charts</button>
                <button className={mapView ? `${styles.button} ${styles.buttonMap}` : `${styles.button}`} onClick={() => setView('map')}>View Map</button>
            </div>
            <Container className={`${styles.chart} ${styles.container}`}>
                {/* <div className={`${styles.chart} ${styles.container}`}> */}
                    {chartView
                        ? Object.keys(country).length ? lineChart : barChart
                        : <Map country={country} />
                    }
                {/* </div> */}
            </Container>
        </Container>
    )
}

export default Charts