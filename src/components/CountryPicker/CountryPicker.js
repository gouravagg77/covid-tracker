import React, { useState, useEffect } from 'react';
import { Dropdown, FormGroup } from 'react-bootstrap';

import { fetchCountries } from "../../api/Index";

import styles from './CountryPicker.module.css';

function CountryPicker({ handleCountryChange }) {

    const [countries, setCountries] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        const fetchCountriesAPI = async () => {
            const list = await fetchCountries();
            setCountries(list);
        }

        fetchCountriesAPI();
    }, [setCountries]);

    const handleSelectedCountry = (country) => {
        setSelectedItem(country);
        handleCountryChange(country);
    }
    
    return (
        <div>
            <FormGroup className={styles.formControl}>
                <Dropdown className={styles.dropdown1}>
                    <Dropdown.Toggle className={styles.dropdown} variant="success" id="dropdown-basic">
                        {selectedItem ? selectedItem : "Select a country"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.dropdown_menu}>
                        {countries.map((country, i) => <Dropdown.Item onSelect={() => handleSelectedCountry(country)} key={i}>{country}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </FormGroup>
        </div>
    )
}

export default CountryPicker
