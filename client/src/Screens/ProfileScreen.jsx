import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { saveShippingAddress } from '../slices/cartSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
  useProfileMutation();

    useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const dispatch = useDispatch();
    const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
    } else {
        try {
        const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        } catch (err) {
        toast.error(err?.data || err.error);
        }
    }
    };

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    toast.success('Address updated successfully');
  };

  return (
    <Row className="d-flex justify-content-center px-4 mb-5">
      <Col lg={3}>
        <h2 className='mt-5'>
            <Image src={require("./images/profile.png")} roundedCircle style={{width:"3rem"}}/>
            &nbsp;
            User Profile
        </h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='mt-3' type='submit' variant='primary'>
            Update
          </Button>
          {loadingUpdateProfile && <Loading />}
        </Form>
      </Col>
      <Col lg={2}>
      </Col>
      <Col lg={6}>
        <h2 className='mt-5'>
            <Image src={require("./images/address.png")} style={{width:"3rem"}}/>
            &nbsp;
            Shipping
        </h2>
        <Form onSubmit={submitAddressHandler}>
            <Form.Group className='my-2' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='postalCode'>
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button className="mt-3" type='submit' variant='primary'>
            {shippingAddress.address? "Update":"Add"}
            </Button>
      </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;