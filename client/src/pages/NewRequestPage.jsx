import React, {useEffect, useState} from "react"
import axios from 'axios'
import DatePicker from "react-datepicker"
import MaskedInput from "react-maskedinput"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {Form, FormCheck, FormSelect, Alert} from "react-bootstrap"


import {isValidEmail, isValidPhone, validateRequiredFields} from "../utilities/ValidateScript"
import CityInput from "../components/Request/CityInput"
import ApplyInput from "../components/Request/ApplyInput"

const NewRequestPage = () => {
    const [error, setError] = useState(null)
    const storedFormData = sessionStorage.getItem('formData')
    const defaultData = {
        fullName: '',
        phone: '',
        amountClient: 1,
        typeRequest: 'Классический',
        amountRequest: 1000,
        phoneCall: true,
        city: 'Алматы',
        date: new Date()
    }
    const parsedData = JSON.parse(storedFormData);
    const validDate = parsedData && parsedData.date ? new Date(parsedData.date) : new Date();
    const initialData = storedFormData ? {...parsedData, date: validDate} : defaultData;
    const [formData, setFormData] = useState(initialData);


    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(formData))
    }, [formData]);

    const isFormEmpty = () => {
        return (
            !fullName &&
            phone === '' &&
            amountClient === 1 &&
            typeRequest === 'Классический' &&
            amountRequest === 1000 &&
            phoneCall === true &&
            city === ''
        )
    }

    const clearForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            amountClient: 1,
            typeRequest: 'Классический',
            amountRequest: 1000,
            phoneCall: true,
            city: '',
            date: ''
        })
        setError(null)
    }

    const {fullName, phone, amountClient, typeRequest, amountRequest, phoneCall, city, date} = formData;

    const handleChange = (e) => {
        const {name, value} = e.target

        console.log({name, value})

        if (value === '') {
            setError(null)
            setFormData(prevState => ({
                ...prevState,
                [name]: ''
            }))
            return
        }

        if (name === 'email' && !isValidEmail(value)) {
            setError("Некорректный e-mail");
            return
        }

        if (name === 'amountRequest' && value < 1000) {
            setError("Минимальная сумма - 1000")
        }

        if (name === 'phoneCall') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value === 'true'
            }))
        } else {
            setError(null)
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handlePhoneChange = (e) => {
        const {value} = e.target
        setError(null)

        if (value === ''){
            setFormData(prevState => ({
                ...prevState,
                phone : value
            }))
            return
        }

        let processedValue = value.replace(/\D+/g, '')
        if (!isValidPhone(processedValue)) {
            setError("Некорректный телефонный номер")
            return
        }


        setFormData(prevState => ({
            ...prevState,
             phone : processedValue
        }))

    }
    const handleDateChange = (selectedDate) => {
        setFormData(prevState => ({
            ...prevState,
            date: selectedDate
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const requiredFields = ['fullName', 'phone', 'city', 'typeRequest']
        const errorMessage = validateRequiredFields(formData, requiredFields);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        try {
            await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/requests`, {
                fullName, phone, amountClient, typeRequest, amountRequest, phoneCall, city, date
            });
            alert('Заявка была зарегистрирована')
        } catch (error) {
            alert('Заявка не была обработана')
        }
    }


    return (
        <>
            <h2 className="pb-5 pt-2">Новая Заявка</h2>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <Container className="m-0">


                <Form onSubmit={handleSubmit}>
                    <Row className="grid align-items-end row-gap-lg-4">

                        <Form.Group className="col-md-6">
                            <Form.Label> Название заявки* </Form.Label>


                            <Form.Control name="fullName" value={fullName} placeholder="Напишите название заявки"
                                          onChange={handleChange}/>

                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Количество заявителей </Form.Label>

                            <ApplyInput type="numeric">
                                <Form.Control type="number" name="amountClient" value={amountClient} placeholder="Кол-во"
                                              onChange={handleChange}/>
                            </ApplyInput>


                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label>Номер телефона*</Form.Label>
                            <ApplyInput>
                                <MaskedInput
                                    mask="+7 (111) 111-1111"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    name="phone"
                                    placeholder="+7 (___) ___-____"
                                    className="form-control"
                                />
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3 ">
                            <Form.Label>Сумма заявки</Form.Label>
                            <Row>
                                <Col>
                                    <ApplyInput type="numeric">
                                        <Form.Control name="amountRequest" value={amountRequest}
                                                      placeholder="Сумма в тг"
                                                      onChange={handleChange}/>
                                    </ApplyInput>
                                </Col>
                                <Col className="align-self-center p-0 col-2"> ₸ </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Тип заявки* </Form.Label>

                            <ApplyInput>
                                <FormSelect value={typeRequest} name="typeRequest" onChange={handleChange}>
                                    <option value="Классический">Классический</option>
                                    <option value="Срочный">Срочный</option>
                                    <option value="Эпический">Эпический</option>
                                </FormSelect>
                            </ApplyInput>
                        </Form.Group>

                        <Form.Group className="col-md-3">
                            <Form.Label> Город* </Form.Label>
                            <ApplyInput>
                                <CityInput selectedCity={city} onChange={handleChange}/>
                            </ApplyInput>
                        </Form.Group>


                        <Form.Group className="col-md-3">
                            <Form.Label> Выберите дату </Form.Label>

                            <Col>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    dateFormat='dd/MM/yyyy'
                                    className="form-control"
                                />
                            </Col>

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
                            <label htmlFor="EmailMe"> Письма на почту </label>
                            <input type="checkbox" id="MsgMe" className="btn btn-secondary m-1"/>
                            <label htmlFor="MsgMe"> СМС на телефон </label>
                        </Form.Group>


                        <div className="col-md-12">
                            <h6><i>* это необходимые поля для заполнения</i></h6>
                        </div>

                        <Form.Group className="col-md-12">
                            <button type="submit" className="btn btn-primary btn-lg m-1"
                                    disabled={error !== null}>Отправить
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg m-1" onClick={clearForm}
                                    disabled={isFormEmpty()}>Очистить
                            </button>
                        </Form.Group>

                    </Row>
                </Form>


            </Container>

        </>
    )
}

export default NewRequestPage