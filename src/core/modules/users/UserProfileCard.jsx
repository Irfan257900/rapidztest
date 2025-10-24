import React, { useContext, useState, useEffect } from 'react';
import { Card, Avatar, Typography, Tag, Button, Skeleton, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'src/core/context/UserContext';
import { getUser } from 'src/api/userService';

const { Title, Text } = Typography;

const UserProfileCard = ({ userId }) => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUserData(userData);
        setUser(userData); // Update context
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, setUser]);

  if (loading) return <Skeleton active />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <Card className="rounded-lg shadow-md p-4">
      <Avatar size={64} src={user.avatar} />
      <Title level={4} className="mt-2">
        {user.name}
      </Title>
      <Text>{user.email}</Text>
      <Tag className="mt-2" color="blue">
        {user.role}
      </Tag>
      <Button className="mt-4" type="primary" onClick={() => history.push(`/profile/edit/${userId}`)}>Edit</Button>
    </Card>
  );
};

export default UserProfileCard;
