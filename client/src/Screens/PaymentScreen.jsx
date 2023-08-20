import { useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../Components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);


  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/placeorder');
  };

  return (
    <div className='heightofscreens'>
    <Row className="mt-4 d-flex justify-content-center px-4">
      <Col lg={7}>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method:</h2>
      <Form className='my-4' onSubmit={submitHandler}>
        <Form.Group className='mb-4'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='Paytm'
              id='Paytm'
              name='paymentMethod'
              value='Paytm'
              checked
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Confirm
        </Button>
      </Form>
      </Col>
      </Row>
      </div>
  );
};

export default PaymentScreen;