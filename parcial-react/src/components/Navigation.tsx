import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation(): JSX.Element {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>PARCIAL 1</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Articulos</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
      </Navbar>
    );
}

export default Navigation;