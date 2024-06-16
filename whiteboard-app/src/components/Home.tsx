// components/Home.tsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const history = useHistory();

  const handleCreateSession = () => {
    const newRoomId = Date.now().toString(); // Simple way to create a unique room ID
    history.push(`/whiteboard/${newRoomId}`);
  };

  const handleJoinSession = () => {
    if (roomId.trim()) {
      history.push(`/whiteboard/${roomId}`);
    }
  };

  return (
    <div>
      <h1>Welcome to the Whiteboard App</h1>
      <button onClick={handleCreateSession}>Create New Session</button>
      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinSession}>Join Session</button>
      </div>
    </div>
  );
};

export default Home;
