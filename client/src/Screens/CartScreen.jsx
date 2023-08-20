import React from "react";
import {ListGroup, Row, Col, ListGroupItem, Image, Button, Card} from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import {Link, useNavigate} from "react-router-dom";
import {FaRupeeSign} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import Message from "../Components/Message";
import { toast } from 'react-toastify';

function CartScreen(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(state=>state.cart.cartItems);
    const itemsPrice = useSelector(state=>state.cart.itemsPrice);
    const discountPrice = useSelector(state=>state.cart.discountPrice);
    const shippingPrice = useSelector(state=>state.cart.shippingPrice);
    const totalPrice = useSelector(state=>state.cart.totalPrice);


    function handleAdd(item){
        dispatch(addToCart({...item, countInStock:item.countInStock-1, quantity:item.quantity+1}));
    };
    function handleMinus(item){
        dispatch(addToCart({...item, countInStock:item.countInStock+1,quantity:item.quantity-1}));
    };
    function handleDelete(item){
        dispatch(removeFromCart(item._id));
    };
    function checkoutHandler(){
        if(cartItems.length===0)
            toast.error("Please add some items to cart");
        else
            navigate('/login?redirect=/shipping');
    };

    return (
        <div className='heightofscreens'>
        <h2 className="my-4">Cart</h2>
        <Row>
            <Col lg={9}>
                <ListGroup variant="flush" className="mb-5">
                    {cartItems.length===0?
                        <Message>
                            <p>Cart is empty. Proceed to add items in the cart...</p>
                            <Link to="/">
                                <Button variant="secondary">Go to Home</Button>
                            </Link>
                        </Message>
                    :cartItems.map((item)=>(
                        <ListGroupItem key={item._id}>
                        <Row className="mb-2">
                            <Col md={2} className="mt-3">
                                <Image src={item.image} alt="image" fluid rounded></Image>
                            </Col>
                            <Col md={6} className="mt-4">
                                <div>
                                    <Link to={"/product/"+item._id} className="card-link-title">{item.name}</Link>
                                </div>
                                    <h5><FaRupeeSign className="fs-6 mb-1" />{item.price}</h5>
                            </Col>
                            <Col md={4} className="mt-4">
                                <div >
                                <Button variant="danger" className="mx-3" onClick={()=>handleDelete(item)}><MdDeleteForever className="fs-6 mb-1" /></Button>
                                <Button variant="secondary" disabled={item.quantity<2} onClick={()=>handleMinus(item)}>-</Button>
                                    <span className="mx-2"> {item.quantity} </span>
                                <Button variant="secondary" disabled={item.countInStock<=1} onClick={()=>handleAdd(item)}>+</Button>
                                </div>
                            </Col>
                        </Row>
                        </ListGroupItem>
                       
                    ))}
                    
                </ListGroup>
            </Col>
            <Col lg={3}>
                <Card bg="dark" text="white" className="mt-2">
                    <Card.Header className="fs-5">Price Details</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroupItem >
                            <Row className="mt-2">
                                <Col>Price:</Col>
                                <Col><FaRupeeSign className="fs-6 mb-1" />{itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Discount:</Col>
                                <Col><FaRupeeSign className="fs-6 mb-1" />{discountPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Delivery:</Col>
                                <Col><FaRupeeSign className="fs-6 mb-1" />{shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem variant="dark" className="fs-5">
                            <Row className="my-1 text-dark">
                                <Col>Total:</Col>
                                <Col><FaRupeeSign className="mb-1" />{totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem >
                            <Button variant="warning" className="my-2" onClick={checkoutHandler}>Checkout</Button>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </div>
    );
}

export default CartScreen;