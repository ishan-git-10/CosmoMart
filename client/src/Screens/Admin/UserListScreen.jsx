import React from 'react';
import { Table } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../Components/Message';
import Loading from '../../Components/Loading';
import {
  useGetUsersQuery,
} from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <div className='heightofscreens'>
      <h1 className='my-4'>Users:</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>
          {error?.data || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm' >
          <thead>
            <tr>
              <th><strong>ID</strong></th>
              <th><strong>NAME</strong></th>
              <th><strong>EMAIL</strong></th>
              <th className='text-center'><strong>ADMIN</strong></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">{user.email}</a>
                </td>
                <td className='text-center'>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;