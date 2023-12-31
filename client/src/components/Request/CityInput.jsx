import React from 'react'
import {FormSelect} from "react-bootstrap";

const cities = ['','Алматы', 'Астана', 'Актау','Атырау', 'Актобе', 'Кокшетау', 'Костанай', 'Караганда']

const CityInput = ({ selectedCity, onChange }) => (
    <FormSelect name="city" onChange={onChange} value={selectedCity} required>
        {cities.map(city => <option key={city} value={city}>{city}</option>)}
    </FormSelect>
)

export default CityInput
