import React, {useEffect, useState} from "react"
import axios from "axios"
import {Container, Button, Table, InputGroup} from "react-bootstrap"
import {ReactComponent as CheckIcon} from "../img/check-icon.svg"
import {ReactComponent as CrossIcon} from "../img/x-icon.svg"
import {formatDateToRussian} from "../utilities/FormatDates";

const GroupRequestPage = (props) => {
    const [applications, setApplications] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

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
            const response = await axios.patch(`http://localhost:3000/requests?id=${id}`, { status: "Applied" });
            if (response.data && response.data.message) {
                console.log(response.data.message);
            }

            // Refetch applications to update the UI
            const updatedApplications = await axios.get(`http://localhost:3000/requests?status=${props.status}&page=${currentPage}&limit=${itemsPerPage}`);
            setApplications(updatedApplications.data);

        } catch (error) {
            console.error("Error updating application status to Applied:", error)
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/requests?id=${id}`, { status: "Rejected" });
            if (response.data && response.data.message) {
                console.log(response.data.message);
            }

            // Refetch applications to update the UI
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
                        {props.status === "All" ? (<InputGroup>
                            <Button variant="outline-success" onClick={() => handleApply(app._id)}>
                                <span> Принять </span>
                                <CheckIcon/>
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleReject(app._id)}>
                                <span> Удалить </span>
                                <CrossIcon/>
                            </Button>
                        </InputGroup>) : null}
                    </td>
                </tr>))}
                </tbody>
            </Table>
        </Container>
        <div className="pagination-container">
            <Button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
            >
                Prev
            </Button>
            <span>{currentPage}</span>

            <Button
                onClick={() => setCurrentPage(prev => prev + 1)}
            >
                Next
            </Button>


            <input
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
            />
        </div>
    </div>)
}

export default GroupRequestPage