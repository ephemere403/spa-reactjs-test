import React, {useEffect, useState} from "react"
import axios from "axios"
import {Container, Button, Table, InputGroup, Form} from "react-bootstrap"
import {ReactComponent as CheckIcon} from "../img/check-icon.svg"
import {ReactComponent as CrossIcon} from "../img/x-icon.svg"
import {ReactComponent as LeftArrow} from "../img/arrow-left.svg"
import {ReactComponent as RightArrow} from "../img/arrow-right.svg"
import {formatDateToRussian} from "../utilities/FormatDates";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GroupRequestPage = (props) => {
    const [applications, setApplications] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const [typedPage, setTypedPage] = useState(1)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/requests?status=${props.status}&page=${currentPage}&limit=${itemsPerPage}`)
                setApplications(response.data)

            } catch (error) {
                console.error("Error fetching applications:", error)
            }
        };

        fetchApplications()
    }, [currentPage, props.status])

    const handleApply = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/requests?id=${id}`, {status: "Applied"});
            if (response.data && response.data.message) {
                console.log(response.data.message);
            }

            const updatedApplications = await axios.get(`http://localhost:3000/requests?status=${props.status}&page=${currentPage}&limit=${itemsPerPage}`);
            setApplications(updatedApplications.data);

        } catch (error) {
            console.error("Error updating application status to Applied:", error)
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/requests?id=${id}`, {status: "Rejected"});
            if (response.data && response.data.message) {
                console.log(response.data.message);
            }

            const updatedApplications = await axios.get(`http://localhost:3000/requests?status=${props.status}&page=${currentPage}&limit=${itemsPerPage}`);
            setApplications(updatedApplications.data);

        } catch (error) {
            console.error("Error updating application status to Rejected:", error)
        }
    }


    return (<div>
        <h2 className="pb-5 pt-2">
            {props.status === "All" ? "Мои заявки" :
                props.status === "Rejected" ? "Отклоненные заявки" :
                    props.status === "Applied" ? "Согласованные заявки" : ""}
        </h2>
        <Container className="m-0 py-2 overflow-x-auto">
            <Table hover responsive>
                <thead>
                <tr className="pb-2">
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Тип заявки</th>
                    <th>Кол-во</th>
                    <th>Дата</th>
                    <th>Сумма заявки</th>
                    <th>Город</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {applications.map(app => (<tr key={app._id}>
                    <td>{app._id}</td>
                    <td>{app.fullName}</td>
                    <td>{app.phone}</td>
                    <td>{app.typeRequest}</td>
                    <td>{app.amountClient}</td>
                    <td>{formatDateToRussian(app.date)}</td>
                    <td>{app.amountRequest}</td>
                    <td>{app.city}</td>
                    <td>{app.status}</td>
                    <td>
                        <InputGroup>
                            <Button variant="outline-success" onClick={() => handleApply(app._id)}>
                                <span> Принять </span>
                                <CheckIcon/>
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleReject(app._id)}>
                                <span> Удалить </span>
                                <CrossIcon/>
                            </Button>
                        </InputGroup>
                    </td>
                </tr>))}
                </tbody>
            </Table>

            <Row className="pt-3 justify-content-end">
                <Col >
                    <Button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}>
                        <LeftArrow/>
                    </Button>

                    <span>  {currentPage}  </span>

                    <Button
                        disabled={applications.length < itemsPerPage}
                        onClick={() => setCurrentPage(prev => prev + 1)}>
                        <RightArrow/>
                    </Button>
                </Col>

                <Col className="">
                    <Form.Control
                        type="text"
                        placeholder="Enter page number"
                        onChange={(e) => setTypedPage(Number(e.target.value))}
                    />
                </Col>

                <Col className="">
                    <Button
                        onClick={() => {
                            if (typedPage && !isNaN(typedPage) && typedPage > 0 && typedPage <= currentPage + Math.ceil(applications.length / itemsPerPage)) {
                                setCurrentPage(typedPage)
                            } else {
                                alert('Недопустимая страница')

                            }
                        }}
                    >
                        Перейти
                    </Button>
                </Col>
            </Row>


        </Container>


    </div>)
}

export default GroupRequestPage