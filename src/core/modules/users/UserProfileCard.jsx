import React, { useContext, useState, useEffect } from 'react';
import { Card, Avatar, Typography, Tag, Button, Skeleton, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'src/core/context/UserContext';
import { fetchUserProfile } from 'src/api/userApi';

const { Title, Text } = Typography;

const UserProfileCard = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [userId]);

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Card className="rounded-lg shadow-md p-4">
      <Avatar size={64} src={user.avatar} />
      <Title level={4} className="mt-2">{user.name}</Title>
      <Text>{user.email}</Text>
      <Tag color="blue" className="mt-2">{user.role}</Tag>
      <Button className="mt-4" onClick={() => history.push(`/cards/users/edit/${userId}`)}>Edit Profile</Button>
    </Card>
  );
};

export default UserProfileCard;


// UserProfileCard.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfileCard from './UserProfileCard';
import { UserContext } from 'src/core/context/UserContext';
import * as userApi from 'src/api/userApi';

jest.mock('src/api/userApi');

describe('UserProfileCard', () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'avatar_url' };

  beforeEach(() => {
    userApi.fetchUserProfile.mockResolvedValue(user);
  });

  test('renders user profile card', async () => {
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(user.name);
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(await screen.findByText(user.role)).toBeInTheDocument();
  });

  test('displays loading state', () => {
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles error', async () => {
    userApi.fetchUserProfile.mockRejectedValue(new Error('Failed to fetch user'));
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    await waitFor(() => expect(screen.getByText(/Failed to fetch user/i)).toBeInTheDocument());
  });
});