import React from 'react';
import Input from '@common/Input';
import '@style/forms.css';
import Loading from '@common/Loading';

import {
  style
} from '@script/util';
import { validate } from '@babel/types';

const FormMessage = (withError, messageList) => {
  const message = (hasError) => {
    return (
      <div className={style(hasError).message}>
        <ul>{messageList}</ul>
      </div>
    );
  };

  if (withError) {
    messageList.alert = null;
    return message(withError);
  }
  if (messageList.alert) {
    messageList.push(messageList.alert);
    return message(withError);
  }
  return null;
};

class Form extends React.Component {
  state = {
    messageList: {}
  };

  componentDidMount() {
    const { alert, inputList } = this.props;
    const messageList = {};
    const inputName = {};
    inputList.forEach((input) => {
      if (input.message && input.fieldName) {
        inputName[input.fieldName] = true;
        const { message, fieldName } = input;
        messageList[fieldName] = message;
      }
    });
    this.setState({ ...inputName, messageList: { ...messageList, alert } });
  }

  /*validate this input field and use it 
      returned valid state to render message */
  validateField = ({ fieldName, onChange, validator }) => {
    const onFieldChange = (event) => {
      const value = event.target.value;
      onChange(value);

      if (fieldName && validator) {
        this.setState((state) => {
          const passed = validator(value);
          return { [fieldName]: passed };
        });
      }
    };
    return onFieldChange;
  };

  buildInput = () => {
    return this.props.inputList.map((params, key) => {
      const { fieldName, onChange, validator } = params;
      return (
        <Input
          label={params.label}
          hasErrors={this.state[fieldName]}
          onChange={this.validateField({ fieldName, onChange, validator })}
          value={params.value}
          placeholder={params.placeholder}
          type={params.type}
          key={key}
        />
      );
    });
  };

  //check that all fieds are valid and return appropriate errorlist
  fieldsHasError = () => {
    const { messageList, ...fields } = this.state;
    const messages = [];
    Object.keys(fields).forEach(function(fieldname, k) {
      /**
       * A fieldname with false value indicate the field has error, check for
       ** and get it default message to be displayed
       **/
      if (!fields[fieldname] && fieldname in messageList) {
        messages.push(<li key={k + 1}>{messageList[fieldname]}</li>);
      }
    });
    messages.alert = this.props.alert;
    return messages;
  };

  render() {
    const messages = this.fieldsHasError();
    return (
      <form className="ui form" onSubmit={this.props.onSubmit}>
        {this.buildInput()}
        {FormMessage(messages.length, messages)}

        <div style={{ textAlign: 'center' }}>
          <Loading size={1} visible={this.props.inFlight} />
          <br />
          <button
            className={style(this.props.isReady).button}
            onClick={this.props.onSubmit}>
            Sign in
          </button>
        </div>
      </form>
    );
  }
}
export default Form;
