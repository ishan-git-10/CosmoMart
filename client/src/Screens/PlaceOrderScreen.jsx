import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import CheckoutSteps from '../Components/CheckoutSteps';
import Loading from '../Components/Loading';
import { useCreateOrderMutation, usePayOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
  }, [cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: "Paytm",
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        discountPrice: cart.discountPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      confirmPayment(res._id);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const confirmPayment = async(orderId)=>{
    try {
      await payOrder(orderId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='heightofscreens my-4'>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='mb-3'>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='pb-4'>
              <h2 className='my-2'>Payment Method</h2>
              <strong>Method: </strong>
              Paytm
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='mt-2 mb-3'>Order Items:</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt="image"
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={6} className="mt-4">
                          <Link to={"/product/"+item._id} className="card-link-title">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="mt-4">
                          {item.quantity} x <FaRupeeSign />{item.price} = <FaRupeeSign />{item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card  bg="dark" text="white" className="mt-3">
            <Card.Header className="fs-5">Order Summary</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row className="mt-2">
                  <Col>Items:</Col>
                  <Col><FaRupeeSign className="fs-6" />{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col><FaRupeeSign className="fs-6" />{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Discount:</Col>
                  <Col><FaRupeeSign className="fs-6" />{cart.discountPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant="dark" className="fs-5">
                <Row className="my-1 text-dark">
                  <Col>Total:</Col>
                  <Col><FaRupeeSign className="fs-6" />{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
                {error && (<>
                  <ListGroup.Item className="pt-3">
                    <Message className="mt-5" variant='danger'>{error.data}</Message>
                  </ListGroup.Item>
                </>
                )}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block my-2'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
              
            </ListGroup>
          </Card>
          {isLoading &&<Loading />}
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;