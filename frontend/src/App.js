import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Используйте localhost вместо backend (для доступа из браузера)
    axios.get('http://localhost:5000/api')
          .then(response => setMessage(response.data.message))
          .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;

