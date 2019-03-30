import React from 'react';
import { styleInput } from '@script/util';

function Input(props) {
  const { label, value, onChange, type, placeholder, hasErrors } = props;
  return (
    <div className={styleInput(hasErrors)}>
      <label> {label} </label>
      <div className="ui fluid input">
        <input
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
export default Input;
