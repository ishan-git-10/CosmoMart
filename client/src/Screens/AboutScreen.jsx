import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link} from "react-router-dom";

const About = () => {
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>About</h2>
                        <p>Welcome to CosmoMart, your ultimate destination for the latest and greatest electronic gadgets and accessories. With a passion for technology and a commitment to quality, we strive to bring you a curated collection of cutting-edge products that enhance your digital lifestyle.</p>
                        <p>At CosmoMart, we believe that every device should not only be functional but also beautifully designed. From smartphones to smart home devices, we handpick products that seamlessly blend innovation and aesthetics.</p>
                        <Link to="/">
                            <Button className="my-2" variant="secondary">Home</Button>
                        </Link>
                    </Col>
                    <Col md={6}>
                        <h1 className='about-brand text-center'>CosmoMart</h1>
                    </Col>
                </Row>
                
            </Container>
        </section>
    );
}

export default About;