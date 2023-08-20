import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loading from '../Components/Loading';
import { useGetOrderDetailsQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch,  isLoading, error } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverHandler = async () => {
    try{
      await deliverOrder(orderId);   
      refetch();
      toast.success("Order Delivered");
    }
    catch(err){
      toast.error(err.data);
    }
  };

  return (
    <div className='heightofscreens my-4'>
    { isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1 className='mb-3'>Order {order._id}:</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='mb-3'>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`} target="_blank" rel="noopener noreferrer">{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2  className='mb-3'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='mt-2 mb-3'>Order Items:</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                        <Link to={"/product/"+item.product} className="card-link-title">
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
                  <Col><FaRupeeSign className="fs-6" />{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col><FaRupeeSign className="fs-6" />{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Discount:</Col>
                  <Col><FaRupeeSign className="fs-6" />{order.discountPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant="dark" className="fs-5">
                <Row className="my-1 text-dark">
                  <Col>Total:</Col>
                  <Col><FaRupeeSign className="fs-6" />{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block my-2'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
          {loadingDeliver && <Loading />}
        </Col>
      </Row>
    </>
  )
  }
  </div>
  )
};

export default OrderScreen;