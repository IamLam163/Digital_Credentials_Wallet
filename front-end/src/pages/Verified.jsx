import React, { useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Youverified = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/login'); // Redirect to the login page after 5 seconds
    }, 5000);

    return () => clearTimeout(redirectTimer); // Cleanup the timer when the component unmounts
  }, [navigate]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <AiOutlineCheckCircle style={{ fontSize: '48px', color: '#4285f4', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Email verification successful!</h1>
      <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', backgroundColor: '#8B4513', color: '#ffffff', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>CONTINUE</button>
    </div>
  );
};

export default Youverified;
