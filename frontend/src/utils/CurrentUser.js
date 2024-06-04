import axios from 'axios';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get('http://localhost:4000/api/auth/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
withCredentials: true   });
    return response.data; // Assuming the backend sends user data in response.data
  } catch (error) {
    console.error('Error fetching current user', error);
    return null;
  }
};