import React from 'react';
import { styleInput, style } from '@script/util';

function Input(props) {
  const { label, value, onChange, type, placeholder, hasErrors } = props;
  return (
    <div className={style(hasErrors).field}>
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
