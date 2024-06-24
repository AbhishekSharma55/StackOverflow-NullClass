import axios from 'axios';
import React from 'react'

const TEST = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
    const TestingAPICall = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/testing`);
            console.log(response.data.msg);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <button onClick={()=>{
            TestingAPICall();
        }}>TEST</button>
    </div>
  )
}

export default TEST