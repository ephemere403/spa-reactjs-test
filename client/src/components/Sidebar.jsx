import React from "react";
import Navbar from 'react-bootstrap/Navbar';

import { Link } from "react-router-dom";
import {Nav, NavbarCollapse, NavbarToggle, NavLink} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Sidebar = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <NavbarToggle aria-controls="responsive-navbar-nav" className="d-lg-none"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="me-auto flex-column">

                        <NavLink><Link to="/"> Dashboard </Link></NavLink>
                        <NavLink><Link to="/requests/new"> Новая заявка </Link></NavLink>
                        <NavLink><Link to="/requests/my/all"> Мои заявки </Link></NavLink>
                        <NavLink><Link to="/requests/my/accepted"> Согласованные заявки </Link></NavLink>
                        <NavLink><Link to="/requests/my/rejected"> Отклоненные заявки </Link></NavLink>

                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default Sidebar