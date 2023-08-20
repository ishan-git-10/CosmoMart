import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaRupeeSign } from 'react-icons/fa';
import Message from '../../Components/Message';
import Loading from '../../Components/Loading';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className='heightofscreens'>
      <h1 className='my-4'>Orders:</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>
          {error?.data || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th><strong>ID</strong></th>
              <th><strong>USER</strong></th>
              <th><strong>DATE</strong></th>
              <th><strong>TOTAL</strong></th>
              <th><strong>PAID</strong></th>
              <th><strong>DELIVERED</strong></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td><FaRupeeSign className="fs-6" />{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (<>
                        {order.paidAt.substring(0, 10)}
                        <FaCheck className='ms-2 mb-1' style={{ color: 'green' }} />
                      </>) : (
                    <FaTimes className='mb-1' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (<>
                    {order.deliveredAt.substring(0, 10)}
                    <FaCheck className='ms-2 mb-1' style={{ color: 'green' }} />
                  </>
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='outline-primary' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;