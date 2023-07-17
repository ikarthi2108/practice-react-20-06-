import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarMain() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">TITAN</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/contact">Content</Nav.Link>
          <Nav.Link as={Link} to="/Reports">Reports</Nav.Link>
          <Nav.Link as={Link} to="/todo">Assign Task</Nav.Link>
          <Nav.Link as={Link} to="/Viewtask">View Your Task</Nav.Link>
        </Nav>
        <Nav className="me-5-end">
         
          <Nav.Link as={Link} to="/Register">Register</Nav.Link>
          <Nav.Link as={Link} to="/SignIn">Signin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
