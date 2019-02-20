import React from 'react';
import Field from '../components/Field';
import Background from '../components/Background';
import FormBody from '../components/FormBody';

const Register = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');

  // useEffect

  // const submitHandler = e => {
  //   e.preventDefault();
  // };

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

// Register.propTypes = {};

export default Register;
