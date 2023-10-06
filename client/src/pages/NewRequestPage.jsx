import {React, useState} from "react"
import ApplyInput from "../components/Request/ApplyInput"
import DateInput from "../components/Request/DateInput";
import Row from "react-bootstrap/Row"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {FormCheck, FormSelect, DropdownToggle, Dropdown, Alert, DropdownMenu} from "react-bootstrap";
import axios from 'axios'
import Col from "react-bootstrap/esm/Col";
import {isValidEmail, isValidPhone} from "../utilities/ValidateScript";


const NewRequestPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        amountClient: 1,
        typeRequest: 'Классический',
        amountRequest: null,
        phoneCall: true,
        city: 'Алматы',
        date: new Date()
    })
    const {fullName, phone, amountClient, typeRequest, amountRequest, phoneCall, city, date} = formData;

    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const {name, value} = e.target

        if (value === '') {
            setError(null)
            return
        }

        if (name === 'phone' && !isValidPhone(value)) {
            setError("Invalid phone number")
            return
        }

        if (name === 'email' && !isValidEmail(value)) {
            setError("Invalid email");
            return
        }

        if (name === 'phoneCall') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value === 'true' // Convert the string "true" or "false" back into a boolean
            }));
        } else {
            setError(null)
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/requests', {
                fullName, phone, amountClient, typeRequest, amountRequest, phoneCall, city, date
            });
            alert('Request sent successfully!')
        } catch (error) {
            alert('There was an error sending the request.')
        }
    }


    return (
        <>
            <h2 className="pb-5 pt-2">Новая Заявка</h2>
            <Container className="bg-body-secondary m-0">

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row className="grid align-items-end row-gap-lg-4">

                        <Form.Group className="col-md-6">
                            <Form.Label> Название заявки* </Form.Label>

                            <ApplyInput>
                                <Form.Control name="fullName" value={fullName} placeholder="Напишите название заявки"
                                              onChange={handleChange} required/>
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Количество заявителей </Form.Label>

                            <ApplyInput type="numeric">
                                <Form.Control name="amountClients" value={amountClient} placeholder="Сумма заявки"
                                              onChange={handleChange} required/>
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Номер телефона</Form.Label>

                            <ApplyInput type="numeric">
                                <Form.Control type="tel" name="phone" pattern="\+7[0-9]{10}"
                                              placeholder="+7(___)___-____" onChange={handleChange} required/>
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3 ">
                            <Form.Label>Сумма заявки</Form.Label>
                            <Row>
                                <Col>
                                    <ApplyInput type="numeric">
                                        <Form.Control name="amountRequest" value={amountRequest}
                                                      placeholder="Сумма в тг"
                                                      onChange={handleChange} required/>
                                    </ApplyInput>
                                </Col>
                                <Col className="align-self-center p-0 col-2"> ₸ </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Тип заявки* </Form.Label>

                            <ApplyInput>
                                <FormSelect value={typeRequest} name="typeRequest" onChange={handleChange} required>
                                    <option value="Классический">Классический</option>
                                    <option value="Срочный">Срочный</option>
                                    <option value="Эпический">Эпический</option>
                                </FormSelect>
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Город </Form.Label>
                            <ApplyInput>
                                <DropdownToggle id="dropdown-cities" title="Выберите город" expand="lg"> Выберите ваш
                                    город </DropdownToggle>

                                <DropdownMenu>
                                    {['Алматы', 'Астана', 'Актау', 'Атырау', 'Актобе', 'Караганда', 'Кокшетау', 'Костанай', 'Караганда'].map((city) => (
                                        <Dropdown.Item key={city} onChange={handleChange}>{city}</Dropdown.Item>))}
                                </DropdownMenu>

                            </ApplyInput>
                        </Form.Group>


                        <Form.Group className="col-md-3">
                            <Form.Label> Выберите дату </Form.Label>
                            <Form.Control type="date" name="selectedDate" value={date} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="col-12">
                            <h6> Позвонить для подтверждения </h6>

                            <FormCheck
                                inline
                                type="radio"
                                name="phoneCall"
                                value="true"
                                label="Да"
                                checked={phoneCall === true}
                                onChange={handleChange}/>
                            <FormCheck
                                inline
                                type="radio"
                                name="phoneCall"
                                value="false"
                                label="Нет"
                                checked={phoneCall === false}
                                onChange={handleChange}/>

                        </Form.Group>

                        <Form.Group className="col-12">
                            <h6>Получать дополнительную информацию</h6>

                            <input type="checkbox" id="EmailMe" className="btn btn-secondary m-1"/>
                            <label for="EmailMe"> Письма на почту </label>
                            <input type="checkbox" id="MsgMe" className="btn btn-secondary m-1"/>
                            <label htmlFor="MsgMe"> СМС на телефон </label>
                        </Form.Group>


                        <div className="col-md-12 text-right">
                            <h6><em>* is a required field</em></h6>
                        </div>

                        <Form.Group className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form.Group>

                    </Row>
                </Form>


            </Container>

        </>
    )
}

export default NewRequestPage