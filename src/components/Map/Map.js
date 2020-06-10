import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './Map.module.css';
import { fetchMapData } from '../../api/Index';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ291cmF2YWdnNzciLCJhIjoiY2thcGlvZnNzMGFlaTJwbXMyYW5lMTB6bCJ9.OqepxzytNtzWhCN3LeGtgg';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 0,
            lat: 0,
            zoom: 1,
            data: {}
        };
    }

    async componentDidMount() {

        const data = await fetchMapData();
        if (!this.props.country) {
            this.setState({ data });
        } else {
            let occurs = new Boolean(false);
            data.forEach(country => {
                if (country.country.toUpperCase() === this.props.country.toUpperCase()) {
                    occurs = true;
                    this.setState({
                        data: data,
                        lng: country.countryInfo.long,
                        lat: country.countryInfo.lat,
                        zoom: 4
                    })
                }
            })
            if (occurs == false) {
                this.setState({ data });
            }
        }

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        let arr = [];

        data.forEach(countryData => {
            const { country, countryInfo, cases, deaths, recovered, active } = countryData;

            const html = `<div style="
                            width: 120px;
                            height: 150px;
                            cursor: pointer;
                        "> <img src=${countryInfo.flag} width="20" height="10" alt='flag'/>
                           <strong style={{paddingLeft: 20}}>${country}</strong>
                           <p>Total:${cases}</p>
                           <p>Deaths:${deaths}</p>
                           <p>Recovered:${recovered}</p>
                           <p>Active:${active}</p>
                           </div>`;

            arr.push(html);

            const color = `rgb(${cases / 6000} ,0 ,0)`;

            var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(html);

            var el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker({
                draggable: false,
                color: color,
            })
                .setLngLat([countryInfo.long, countryInfo.lat])
                .setPopup(popup)
                .addTo(map);
        });
    }

    render() {
        return (
            <div className={`${styles.map}`}>
                <div ref={el => this.mapContainer = el} className={styles.mapContainer} />
            </div>
        )
    }
}

export default Map