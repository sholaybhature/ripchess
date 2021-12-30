import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";
import {BiSearchAlt} from 'react-icons/bi';
import { Link } from "react-router-dom";
import React from "react";
import Heatmap from "./heatmap";

function Navbar_rip() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/homepage">
            <Navbar.Brand>Rip Chess</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav-">
            <Nav className="me-auto">
              <Nav.Link href="/heatmap">Heatmap</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light"><BiSearchAlt/></Button>
              
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar_rip;
