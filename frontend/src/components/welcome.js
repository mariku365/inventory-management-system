import React from 'react';

const Welcome = ({ username }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Welcome back, {username}!</h2>
    </div>
  );
};

export default Welcome;
