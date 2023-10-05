import {React, useState } from "react"
import ApplyInput from "../components/Request/ApplyInput"
import Row from "react-bootstrap/Row"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {FormCheck, FormSelect, DropdownButton, Dropdown} from "react-bootstrap";
import InputMask from 'react-input-mask'

import axios from 'axios'
import Col from "react-bootstrap/esm/Col";


const NewRequestPage = () => {
    const [formData, setFormData] = useState({
        fullName : 'Иванов И.',
        phone: '',
        amountClient: '',
        typeRequest: 'Классический',
        amountRequest: 1000,
        phoneCall: true,
        city: 'Алматы',
        date: new Date()
    })
    const { fullName, phone,amountClient, typeRequest, amountRequest, phoneCall, city, date } = formData;


    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState, 
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await axios.post('http://localhost:3000/requests', {
            fullName,
            phone,
            typeRequest,
            amountRequest,
            phoneCall,
            city,
            date
          });
          alert('Request sent successfully!')
        } catch (error) {
          alert('There was an error sending the request.')
        }
      }


    return (
        <Container>
            <h2 className="py-5">Новая Заявка</h2>


            <Form onSubmit={handleSubmit} >
                <Row className="grid align-items-end row-gap-lg-4">

                    <Form.Group className = "col-md-6">
                        <Form.Label> Название заявки* </Form.Label>

                        <ApplyInput>
                            <Form.Control name="fullName" value={fullName} placeholder="Напишите название заявки" onChange={handleChange} required />
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-md-3">
                        <Form.Label> Количество заявителей </Form.Label>

                        <ApplyInput type="numeric">
                            <Form.Control name="amountRequest" value={amountRequest} placeholder="Сумма заявки" onChange={handleChange} required />
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-md-3">
                        <Form.Label> Номер телефона</Form.Label>

                        <ApplyInput type="numeric">
                            <Form.Control name="phone"  value={phone} placeholder="+7(___)___-____" onChange={handleChange} type="tel" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"required />
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-md-3">
                        <Form.Label>Сумма заявки</Form.Label>
                        <Row>
                            <Col>
                                <ApplyInput type="numeric">
                                    <InputMask mask="+7 (___)___-____" value={phone} onChange={handleChange}>
                                        {(inputProps) => <Form.Control {...inputProps} type="tel" name="phone" required />}
                                    </InputMask>

                                </ApplyInput>
                            </Col>
                            <Col className="d-sm-inline-flex"> T </Col>

                        </Row>



                    </Form.Group>

                    <Form.Group className="col-md-3">
                        <Form.Label> Тип заявки* </Form.Label>

                        <ApplyInput>
                            <FormSelect value={typeRequest} name="typeRequest" onChange={handleChange}  required>
                                <option value="Классический">Классический</option>
                                <option value="Срочный">Срочный</option>
                                <option value="Эпический">Эпический</option>
                            </FormSelect>
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-md-6">
                        <Form.Label> Позвонить для подтверждения </Form.Label>
                        <Row>
                            <FormCheck className="col " type="radio" name="phoneCall" value={true} checked={phoneCall}
                                       onChange={handleChange}/> Да
                            <FormCheck className="col" type="radio" name="phoneCall" value={false} checked={!phoneCall}
                                       onChange={handleChange}/> Нет
                        </Row>
                    </Form.Group>

                    <Form.Group className="col-md-6">
                        <Form.Label> Город </Form.Label>
                        <ApplyInput>
                            <DropdownButton id="dropdown-cities" title="Выберите город" expand="lg">
                            {['Алматы', 'Астана', 'Актау','Атырау', 'Актобе', 'Караганда', 'Кокшетау', 'Костанай', 'Караганда' ].map((city) => (
                                <Dropdown.Item key={city} onChange={handleChange}>{city}</Dropdown.Item>
                            ))}
                            </DropdownButton>
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-md-6">
                        <Form.Label> Выберите дату </Form.Label>
                        <Form.Control type="date" name="selectedDate" value={date} onChange={handleChange} />
                    </Form.Group>


                    <Form.Group className="col-md-6">
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
    )
}

export default NewRequestPage