import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import { FaPlus, FaRupeeSign } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import Message from '../../Components/Message';
import Loading from '../../Components/Loading';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

function ProductListScreen() {
    
    const navigate = useNavigate();

  const { data:products, isLoading, error, refetch } = useGetProductsQuery({});

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        toast.success("Deleted successfully")
        refetch();
      } catch (err) {
        toast.error(err?.data || err.error);
      }
    }
  };


  const createProductHandler = async () => {
    navigate("/admin/createproduct")
  };

  return (
    <div className='heightofscreens'>
      <Row className='align-items-center my-4'>
        <Col>
          <h1>Products:</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus className='me-1 mb-1' /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loading />}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error.data}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th><strong>ID</strong></th>
                <th><strong>NAME</strong></th>
                <th><strong>PRICE</strong></th>
                <th><strong>CATEGORY</strong></th>
                <th><strong>BRAND</strong></th>
                <th className='text-center'><strong>EDIT</strong></th>
                <th className='text-center'><strong>DELETE</strong></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td><Link to={"/product/"+product._id}>{product.name}</Link></td>
                  <td><FaRupeeSign className="fs-6" />{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className='text-center'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2 text-primary'>
                        <AiFillEdit />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td className='text-center'>
                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                        >
                        <MdDeleteForever className='fs-6' style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;