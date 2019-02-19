import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';

import Input from './Input';
import Label from './typography/Label';
import Helper from './typography/Helper';

const Field = ({ id, type, label, required, name, changed, value, placeholder, error, helper }) => (
  <div>
    <Label 
      htmlFor={id}
      margin={`0 0 ${theme.spacingUnit}px 0`}
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
    <Helper data-testid="helper" error={error}>{ error || helper }</Helper>}
  </div>
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
  placeholder: PropTypes.string
}

Field.defaultProps = {
  error: '',
  helper: '',
  placeholder: '',
  value: '',
  required: false,
}

export default Field;