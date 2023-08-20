import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import {BsCart3, BsFillPersonFill} from "react-icons/bs";
import {BiSearchAlt2} from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import "./Header.css";


function Header() {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const [search, setSearch] = useState('');

  function submitHandler(e){
    e.preventDefault();
    if(search.match(/^\s*$/)){
      navigate("/");
    }else{
      navigate('/search/'+search);
    }
  }

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand><h1 className='brand mt-2'>CosmoMart</h1></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Form className="ms-auto custom-search-form" onSubmit={submitHandler}>
                    <FormControl 
                      type="text" 
                      placeholder="Search" 
                      spellCheck="false"
                      className="mr-sm-2 custom-search-input" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value) }
                    />
                    {search && (
                      <Button
                          variant="outline-light"
                          className="custom-clear-button"
                          onClick={handleClearSearch}
                      >
                          &#x2715;
                      </Button>
                  )}
                    <Button type='submit' variant="outline-light" className="custom-search-button"><BiSearchAlt2 className='fs-5' /></Button>
        </Form>
          <Nav className='ms-auto nav-links'>
            <LinkContainer to='/cart'>
              <Nav.Link className="text-center"><BsCart3 className='fs-5 mb-2' /> Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
                <>
                  <NavDropdown className="text-center" title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item className="text-center">Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orders'>
                      <NavDropdown.Item className="text-center">My Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item className="text-center" onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>

                    {userInfo.isAdmin && <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item className="text-center text-white" disabled>
                          Admin Features
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item className="text-center">
                          Order List
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item className="text-center">
                          Product List
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item className="text-center">
                          User List
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                    }
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className="text-center"><BsFillPersonFill className='fs-5 mb-1' /> SignIn</Nav.Link>
                </LinkContainer>
              )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;