import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import {Button, Row, Col, Image, ListGroup, Card} from "react-bootstrap";
import Rating from "../Components/Rating";
import {FaRupeeSign} from "react-icons/fa";
import axios from "axios";

function ProductScreen(){

    const [product, setProduct] = useState({});

    const {id:productID} = useParams();

    useEffect(()=>{
        const fetchProduct= async()=>{
            const {data} = await axios.get("http://localhost:5000/api/products/"+productID);
            setProduct(data);
        }
        fetchProduct();
    },[productID])
    
    return(
        <div className="p-3">
            <Link to="/">
                <Button className="my-2" variant="secondary">Back</Button>
            </Link>
            <h2>Product Details</h2>
            <Row className="my-3">
                <Col lg={5} className="text-center mb-5">
                    <Image className="w-75" src={product.image} fluid />
                </Col>
                <Col lg={4} className="mb-5">
                <ListGroup variant="flush">
                    <ListGroup.Item as="h1">{product.name}</ListGroup.Item>
                    <ListGroup.Item><Rating value={product.rating} text={product.numReviews} /></ListGroup.Item>
                    <ListGroup.Item as="h4"><FaRupeeSign className="fs-6 mb-1" /> {product.price}</ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>              
                </Col>
                <Col lg={3}>
                    <Card>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>Rs. {product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{(product.countInStock>0)?"In stock":"Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button variant="secondary" disabled={!product.countInStock} className="my-3">
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;