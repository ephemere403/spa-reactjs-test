import React from "react";
import Navbar from 'react-bootstrap/Navbar';

import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <Navbar>
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/requests/new"> Новая заявка </Link></li>
                <li><Link to="/requests/my/all"> Мои заявки </Link></li>
                <li><Link to="/requests/my/accepted"> Согласованные заявки </Link></li>
                <li><Link to="/requests/my/rejected"> Отклоненные заявки </Link></li>
            </ul>
        </Navbar>
    )
}

export default Sidebar