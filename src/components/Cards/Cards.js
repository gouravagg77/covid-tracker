import React from 'react'
import {Card, Container, CardDeck} from 'react-bootstrap'
import CountUp from 'react-countup'

import styles from './Cards.module.css'

const Cards =({data: {confirmedCases, recoveredCases, deaths, lastUpdate}}) => {
    let renderList;
    if(!confirmedCases){
        return 'Loading...'
    }  
    const covidData = [
        {
            category: 'Infected people',
            number: confirmedCases.value
        },
        {
            category: 'Recovered people',
            number: recoveredCases.value
        },
        {
            category: 'Deaths',
            number: deaths.value
        }
    ];
    
    renderList = covidData.map((data) => 
     {
        return(  
            <Card key={data.category}>
                <Card.Body>
                <Card.Title>{data.category}</Card.Title>
                <Card.Text>
                    <CountUp
                    start={0}
                    end={data.number}
                    duration={2.5}
                    separator=","
                    />
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last Update - {new Date(lastUpdate).toDateString()}</small>
                </Card.Footer>
            </Card>
            )
        } 
    );
    return (
        <Container>
            <CardDeck>
                {renderList}
            </CardDeck>
        </Container>
    )
}



   
        

export default Cards
