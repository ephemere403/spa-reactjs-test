import React from "react"
import ApplyInput from "../components/Request/ApplyInput"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import axios from 'axios'

const NewRequestPage = () => {
    const [formData, setFormData] = useState({
        fullName : 'Иванов И.',
        phone: '',
        typeRequest: 'Классический',
        amountRequest: 1000,
        phoneCall: true,
        city: 'Алматы',
        date: new Date()
    })
    const { fullName, phone, typeRequest, phoneCall, city, date } = formData;


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
            <h2>Новая Заявка</h2>


            <Form onSubmit={handleSubmit}>
                <Row>

                    <Form.Group className = "col-sm-6">
                        <Form.Label> Название заявки* </Form.Label>

                        <ApplyInput>
                            <Form.Control name="fullName" value={fullName} placeholder="Напишите название заявки" onChange={handleChange} required />
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-sm-3">
                        <Form.Label> Количество заявителей </Form.Label>

                        <ApplyInput type="numeric">
                            <Form.Control name="amountRequest" value={amountRequest} placeholder="Сумма заявки" onChange={handleChange} required />
                        </ApplyInput>
                    </Form.Group>

                    <Form.Group className="col-sm-3">
                        <Form.Label> Номер телефона</Form.Label>

                        <ApplyInput type="numeric">
                            <Form.Control name="phone" value={phone} placeholder="+7(___)___-__-__" onChange={handleChange} required />
                        </ApplyInput>
                    </Form.Group>
                    </Row>


                    <ApplyInput>
                        <label>Тип заявки</label>
                        <select value={typeRequest} onChange={handleChange}  required>
                            <option value="Классический">Классический</option>
                            <option value="Срочный">Срочный</option>
                            <option value="Эпический">Эпический</option>
                        </select>
                    </ApplyInput>


                    <ApplyInput>
                        <label>Phone Call:</label>
                        <input type="radio" name="phoneCall" value="yes" checked={phoneCall} onChange={() => setPhoneCall(true)} /> Yes
                        <input type="radio" name="phoneCall" value="no" checked={!phoneCall} onChange={() => setPhoneCall(false)} /> No
                    </ApplyInput>


            </Form>

            
            
          
        </Container>
    )
}

export default NewRequestPage