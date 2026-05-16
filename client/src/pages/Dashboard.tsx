import { useEffect, useState } from 'react';
import http from '../features/api/api';

type User = {
  username: string;
  email: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await http.get('/user/me');
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <div>Username: {user?.username}</div>
      <div>Email: {user?.email}</div>
    </div>
  );
};

export default Dashboard;
