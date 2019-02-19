import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';

import Input from './Input';
import Label from './typography/Label';
import Helper from './typography/Helper';

const Container = styled.div`
  margin-bottom: ${props => props.marginBottom};
`;

const Field = ({ id, type, label, required, name, changed, value, placeholder, error, helper, marginBottom }) => (
  <Container marginBottom={marginBottom}>
    <Label 
      htmlFor={id}
      margin={`0 0 ${theme.spaces.xxs}px ${theme.spaces.xxs}px`}
    >
      { label }
    </Label>
    <Input 
      type={type}
      id={id}
      required={required}
      name={name}
      onChange={changed}
      value={value}
      placeholder={placeholder}
      error={error}
      margin={`0 0 ${theme.spacingUnit}px 0`}
    />
    { !error && !helper ? null : 
    (
      <Helper 
        data-testid="helper"
        margin={`0 0 0 ${theme.spaces.xxs}px`} 
        error={error}
      >
        { error || helper }
      </Helper>)}
  </Container>
);

Field.propTypes = {
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helper: PropTypes.string,
  changed: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  placeholder: PropTypes.string,
  marginBottom: PropTypes.number
}

Field.defaultProps = {
  error: '',
  helper: '',
  placeholder: '',
  value: '',
  required: false,
  marginBottom: `${theme.spaces.md}px`
}

export default Field;