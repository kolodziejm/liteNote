import React from 'react';

// routing (hashrouter)
import Field from './components/Field';
import Background from './components/Background';
import FormBody from './components/FormBody';

const App = () => {

  return (
    <Background>
      <FormBody>
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
      </FormBody>
    </Background>
  );
};

export default App;
