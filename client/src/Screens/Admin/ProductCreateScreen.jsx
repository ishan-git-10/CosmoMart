import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';

const ProductCreateScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Others');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');


    const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

    const [createProduct, {isLoading: loadingCreate}] =
    useCreateProductMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        await createProduct({
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }).unwrap();
        toast.success('Product created successfully');
        navigate('/admin/productlist');
        } catch (err) {
        toast.error(err?.data || err.error);
        }
    };

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
      {loadingCreate && <Loading />}
      <Row className="d-flex justify-content-center px-4">
        <Col lg={7}>
        <h1>Create Product:</h1>
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
                required
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
              Create
            </Button>
          </Form>
      </Col>
      </Row>
    </>
  );
};

export default ProductCreateScreen;