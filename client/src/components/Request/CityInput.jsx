import React, { useState } from 'react';
import { Form, Dropdown } from 'react-bootstrap';

const CityInput = ({ handleChange, setError }) => {
    const allCities = ['Алматы', 'Астана', 'Актау', 'Атырау', 'Актобе', 'Караганда', 'Кокшетау', 'Костанай', 'Караганда']
    const [inputValue, setInputValue] = useState('')
    const [filteredCities, setFilteredCities] = useState([])

    const handleInputChange = (e) => {
        const value = e.target.value
        setInputValue(value)

        if (value) {
            const matchedCities = allCities.filter(city => city.toLowerCase().startsWith(value.toLowerCase()));
            setFilteredCities(matchedCities)
        } else {
            setFilteredCities([])
        }
    }

    const handleCitySelect = (city) => {
        setInputValue(city)
        setFilteredCities([])
        handleChange(city) // Assuming this function can handle the selected city
    }

    const handleBlur = () => {
        if (!allCities.includes(inputValue)) {
            setError("Please select a valid city from the list.")
        } else {
            setError(null)
        }
    }

    return (
        <div>
            <Form.Control
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Введите ваш город"
            />
            {filteredCities.length > 0 && (
                <Dropdown.Menu show>
                    {filteredCities.map(city => (
                        <Dropdown.Item key={city} onClick={() => handleCitySelect(city)}>
                            {city}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )}
        </div>
    )
}

export default CityInput
