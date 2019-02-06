import React, { useState } from 'react';

// routing + themeProvider

const App = () => {
  const [count] = useState(0);

  return (
    <div>
      <p>Hello</p>
      <div>{count}</div>
    </div>
  );
};

export default App;
