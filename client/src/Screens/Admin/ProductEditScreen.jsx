import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../Components/Message';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist'>
        <Button className="my-4" variant="secondary">
            Go Back
        </Button>
      </Link>
      <Row className="d-flex justify-content-center px-4">
        <Col lg={7}>
        <h1>Edit Product:</h1>
        {loadingUpdate && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error?.data}</Message>
        ) : (
          <Form className="my-3" onSubmit={submitHandler} autoComplete="off" spellCheck="false">
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label><strong>Name:</strong></Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label><strong>Price:</strong></Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='image'>
              <Form.Label><strong>Image:</strong></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loading />}
            </Form.Group>

            <Form.Group className='mb-3' controlId='brand'>
              <Form.Label><strong>Brand:</strong></Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='countInStock'>
              <Form.Label><strong>Count In Stock:</strong></Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='category'>
              <Form.Label><strong>Category:</strong></Form.Label>
              <Form.Select onChange={(e) => setCategory(e.target.value)}>
                <option value={category}>{category}</option>
                {category!=="Phone" && <option value="Phone">Phone</option>}
                {category!=="Accessories" && <option value="Accessories">Accessories</option>}
                {category!=="Camera" && <option value="Camera">Camera</option>}
                {category!=="Others" && <option value="Others">Others</option>}
            </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label><strong>Description:</strong></Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </Col>
      </Row>
    </>
  );
};

export default ProductEditScreen;