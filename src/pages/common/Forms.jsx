import React from 'react';
import Input from '@common/Input';
import '@style/forms.css';

import {
  validateEmail,
  validatePassword,
  validateName,
  validateMobile,
  style
} from '@script/util';

const FormMessage = (hasError, messageList) => {
  const message = (positive) => {
    return (
      <div className={style(positive).message}>
        <ul>
          <li>{messageList.firstname}</li>
          <li>{messageList.surname}</li>
          <li>{messageList.email}</li>
          <li>{messageList.mobile}</li>
          <li>{messageList.password}</li>
          <li>{messageList.confirmPassword}</li>
          <li>{messageList.response}</li>
        </ul>
      </div>
    );
  };
  const formMessage = hasError
    ? message(hasError)
    : messageList.response
    ? message(false)
    : null;
  return formMessage;
};

class Form extends React.Component {
  state = {
    isEmail: true,
    isPassword: true,
    isSamePassword: true,
    isFirstname: true,
    isSurname: true,
    isMobile: true,
    response: null,
    hasErrors: false,
    errorMessages: {
      password: null,
      email: null,
      confirmPassword: null,
      mobile: null
    }
  };

  static getDerivedStateFromProps(props) {
    const Inputs = props.inputList.map((params, i) => {
      Input(params);
      return (
        <Input
          label={params.label}
          hasError={params.hasErrors}
          onChange={params.onChange}
          value={params.value}
          placeholder={params.placeholder}
          type={params.type}
          key={i}
        />
      );
    });
    return { inputs: Inputs };
  }

  render() {
    const { inputs } = this.state;
    return (
      <form className="ui form" onSubmit={this.signup}>
        {inputs}
        {this.props.inputList.map((input) => {
          return Input(input);
        })}
      </form>
    );
  }
}

//   render() {
//     return (
//       <form className="ui form" onSubmit={this.signup}>
//         {Input({
//           hasErrors: isFirstname,
//           label: 'First Name',
//           onChange: this.lastNameChange,
//           value: firstname,
//           type: 'text',
//           placeholder: 'John'
//         })}

//         {Input({
//           hasErrors: isSurname,
//           label: 'Surname',
//           onChange: this.surnameChange,
//           value: surname,
//           type: 'text',
//           placeholder: 'Alberto'
//         })}

//         {Input({
//           hasErrors: isEmail,
//           label: 'Email',
//           value: email,
//           onChange: this.emailChange,
//           type: 'email',
//           placeholder: 'user@email.com'
//         })}

//         {Input({
//           hasErrors: isMobile,
//           label: 'Mobile',
//           value: mobile,
//           onChange: this.changeMobile,
//           type: 'tel',
//           placeholder: '01234567890'
//         })}

//         {Input({
//           hasErrors: isPassword,
//           label: 'Password',
//           onChange: this.passwordChange,
//           value: password,
//           type: 'password',
//           placeholder: 'xxxxxxxxxxxx'
//         })}

//         {Input({
//           hasErrors: isSamePassword,
//           label: 'Confirm Password',
//           onChange: this.onConfirmPassword,
//           value: confirmPassword,
//           type: 'password',
//           placeholder: 'xxxxxxxxxxxx'
//         })}

//         <div style={{ textAlign: 'center' }}>
//           <Loading size={1} visible={inFlight} />
//           <br />
//           <button className={style(this.validateInputs()).button}>
//             sign up
//           </button>
//         </div>

//       </form>
//     );
//   }
// }
export default Form;
