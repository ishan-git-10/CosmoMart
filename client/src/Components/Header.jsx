import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from "react-router-bootstrap";
import {BsCart3, BsFillPersonFill} from "react-icons/bs";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand><h1 className='brand'>CosmoMart</h1></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link><BsCart3 className='fs-5 mb-2' /> Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link><BsFillPersonFill className='fs-5 mb-1' /> SignIn</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;