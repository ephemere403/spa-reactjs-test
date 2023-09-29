import React from "react";
import Navbar from 'react-bootstrap/Navbar';

import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <Navbar>
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/new"> Новая заявка </Link></li>
            </ul>
        </Navbar>
    )
}

export default Sidebar