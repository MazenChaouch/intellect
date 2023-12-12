import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button } from "react-bootstrap"

const NavBar = () =>{
    return (
        <Navbar className="sticky" collapseOnSelect expand="sm" style={{backgroundColor: "#110e66"}}>
            <Container>
                <Navbar.Brand className="text-white fw-bold" >
                    <Link to="/" className="text-white text-decoration-none">Intellect Academy</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link>
                            <Link to={'/formations'} className="text-white text-decoration-none">Formations</Link>
                        </Nav.Link>*/}
                    </Nav>
                    <Nav>
                        <Link to={'/formations'}><Button variant="outline-light" className="fw-bold">Formations</Button></Link>
                    </Nav>
                    <Nav className="mx-1">
                        <Link to={'/registration'}><Button variant="outline-light" className="fw-bold">S'inscrire</Button></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar