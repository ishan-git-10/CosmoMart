import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer(){
    let currTime = new Date().getFullYear();
    return(
        <footer className="bg-dark text-light pt-5 mt-5">
        <Container>
            <Row>
                <Col md={4}>
                    <h5>About Us</h5>
                    <p className="pt-2">An E-commerce platform for the greatest electronics deals with the latest technologies and products.</p>
                </Col>
                <Col md={4}>
                    <h5>Quick Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/" className="footer-link">Home</Link></li>
                        <li><Link to="/about" className="footer-link">About</Link></li>
                        <li><a href="mailto:info@cosmomart.com" target="/blank" className="footer-link">Contact</a></li>
                    </ul>
                </Col>
                <Col md={4}>
                    <h5>Contact Us</h5>
                    <address>
                        <p className="pt-2">Netaji Subhash Palace, New Delhi</p>
                        <p>Phone: +123 456 7890</p>
                    </address>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <hr className="border-light" />
                    <p className="text-center">CosmoMart ⓒ {currTime}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  
    );
}

export default Footer;