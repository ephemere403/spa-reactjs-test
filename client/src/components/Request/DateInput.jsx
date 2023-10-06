import { Form, Dropdown, Button } from 'react-bootstrap'
import { useState }from 'react'

const DateInput = ({ date, setDate }) => {
    const [showPicker, setShowPicker] = useState(false)
    const displayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setShowPicker(false);
    }

    return (
        <Form.Group className="col-md-3">
            <Form.Label>Выберите дату</Form.Label>
            <Dropdown>
                <Form.Control type="text" readOnly value={displayDate} onClick={() => setShowPicker(!showPicker)} />
                <Dropdown.Toggle split id="datepicker-toggle" onClick={() => setShowPicker(!showPicker)} />

                {showPicker && (
                    <Dropdown.Menu>
                        {/* Here you can render a custom date picker or use a library like react-datepicker */}
                        <Button onClick={() => handleDateChange(new Date())}>Today</Button>
                        {/* Add more date options or a date picker library */}
                    </Dropdown.Menu>
                )}
            </Dropdown>
        </Form.Group>
    )
}

export default DateInput