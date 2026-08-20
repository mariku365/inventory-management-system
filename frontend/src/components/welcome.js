import React from 'react';

const Welcome = ({ username }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Welcome back, {username}!</h2>
      <p>Here’s an overview of your inventory.</p>
    </div>
  );
};

export default Welcome;
