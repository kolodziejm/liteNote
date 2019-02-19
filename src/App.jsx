import React, { useState } from 'react';

// routing (hashrouter)
import Field from './components/Field';

const App = () => {
  const [count] = useState(0);

  return (
    <div>
      <Field 
        type="text"
        id="id"
        name="name"
        helper="Some helper text"
        label="Input"
        value="soemthing"
        changed={() => {}}
        required
      />
      <div>{count}</div>
    </div>
  );
};

export default App;
