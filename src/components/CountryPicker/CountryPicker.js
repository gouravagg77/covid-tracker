import React, {useState, useEffect} from 'react';
import { Dropdown, FormGroup} from 'react-bootstrap';

import { fetchCountries } from "../../api/Index";

import styles from './CountryPicker.module.css';

function CountryPicker({handleCountryChange}) {

    const [countries, setCountries] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setCountries(await fetchCountries());
        }
        
        fetchCountriesAPI();
    }, [setCountries]);

    const handleSelectedCountry = (country) => {
        setSelectedItem(country);
        handleCountryChange(country);
    }
 //   console.log(countries);
    return (
        <div>
            <FormGroup className={styles.formControl}>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selectedItem?selectedItem:"Select a country"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu  className={styles.dropdown_menu}>
                        {countries.map((country,i) => <Dropdown.Item  onSelect={()=>handleSelectedCountry(country)} key={i}>{country}</Dropdown.Item> )}
                    </Dropdown.Menu>
                </Dropdown>
            </FormGroup>
        </div>
    )
}

export default CountryPicker
