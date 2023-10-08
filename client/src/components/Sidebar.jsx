import React from "react"
import Navbar from 'react-bootstrap/Navbar'

import {Link, useLocation} from "react-router-dom"
import {Nav, NavbarCollapse, NavbarToggle} from "react-bootstrap"

const Sidebar = () => {
    const location = useLocation()

    return (
        <div className="sidebar">
            <Navbar collapseOnSelect expand="lg" className="sticky-top mt-4">
                <NavbarToggle aria-controls="responsive-navbar-nav" className="d-lg-none"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="me-auto flex-column">

                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/requests/new"
                            className={`nav-link ${location.pathname === "/requests/new" ? "active" : ""}`}
                        >
                            Новая заявка
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/requests/all"
                            className={`nav-link ${location.pathname === "/requests/all" ? "active" : ""}`}
                        >
                            Мои заявки
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/requests/accepted"
                            className={`nav-link ${location.pathname === "/requests/accepted" ? "active" : ""}`}
                        >
                            Согласованные заявки
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/requests/rejected"
                            className={`nav-link ${location.pathname === "/requests/rejected" ? "active" : ""}`}
                        >
                            Отклоненные заявки
                        </Nav.Link>

                    </Nav>
                </NavbarCollapse>
            </Navbar>
        </div>

    )
}

export default Sidebar