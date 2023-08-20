import React, {useState} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {Button, Row, Col, Image, ListGroup, Card, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Rating from "../Components/Rating";
import {FaRupeeSign} from "react-icons/fa";
import { toast } from 'react-toastify';
import {
  useGetProductDetailQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Loading from "../Components/Loading";
import Message from "../Components/Message";
import { addToCart } from "../slices/cartSlice";
import "./ProductScreen.css";

function ProductScreen(){

    const {id:productID} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAdded,setIsAdded]=useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {data:product,refetch, isLoading, error} = useGetProductDetailQuery(productID);
    const cartItems = useSelector(state=>state.cart.cartItems);
    const isInCart = cartItems.find((x)=>x._id===productID);

    function handleAddToCart() {
        dispatch(addToCart({...product, quantity:1}));
        setIsAdded(true);
    }

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
      useCreateReviewMutation();
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        await createReview({
          productId:productID,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success('Review created successfully');
      } catch (err) {
        toast.error(err?.data || err.error);
      }
    };
    
    return(
        <div className="p-3">
            <Link to="/">
                <Button className="my-2" variant="secondary">Home</Button>
            </Link>
            {isLoading?(<Loading />):error?(
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>)
                :(
                <>
                    <h2>Product Details</h2>
            <Row className="my-3">
                <Col lg={5} className="text-center mb-5">
                    <Image className="w-75 productscreen-image" src={product.image} fluid />
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
                                {(isInCart||isAdded)?
                                <Button variant="success" className="my-3" onClick={()=>navigate("/cart")}>Go to Cart</Button>
                                :<Button variant="secondary" disabled={!product.countInStock} className="my-3" onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>}
                                 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row className='review'>
            <Col md={6}>
              <h2 className="mt-2">Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                  <h2 className="mt-2">Write a Review:</h2>

                  {loadingProductReview && <Loading />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please &nbsp; <Link style={{textDecoration:"none"}} to='/login'> <Button size="sm" variant="info">Sign In</Button> </Link> &nbsp; to write a review
                    </Message>
                  )}
              </ListGroup>
            </Col>
          </Row>
                </>
            )}
            
        </div>
    );
}

export default ProductScreen;