import React, { Fragment } from 'react';
import '@style/forms.css';
import ExternalPage from '@common/ExternalPage';
import Input from '@common/Input';
import Loading from '@common/Loading';
import {
  validateEmail,
  validatePassword,
  styleInput,
  styleMessage
} from '@script/util';
// import UIBuilder from "@asset/script/UIBuilder"
// import login from "@asset/script/authLogin"

class SignIn extends React.Component {
  state = {
    password: '',
    email: '',
    isEmail: true,
    isPassword: true,
    errorMessages: {
      password: null,
      email: null
    }
  };

  passwordChange = (event) => {
    const password = event.target.value;
    this.setState(({ errorMessages }) => {
      const isPassword = validatePassword(password);
      errorMessages.password = isPassword
        ? null
        : 'Password length is not valid';
      return { password, isPassword, errorMessages };
    });
  };

  emailChange = (event) => {
    const email = event.target.value;
    this.setState(({ errorMessages }) => {
      const isEmail = validateEmail(email);
      errorMessages.email = isEmail
        ? null
        : 'Email should be in inform of user@domain.com';
      return { email, isEmail, errorMessages };
    });
  };

  render() {
    const { isPassword, isEmail, password, email, errorMessages } = this.state;
    return (
      <Fragment>
        <ExternalPage />

        <div className="ui container segment">
          <div className="ui header center aligned large">
            Sign into SendIt Account
          </div>

          <form className="ui form">
            {Input({
              hasErrors: isEmail,
              label: 'Email',
              value: email,
              onChange: this.emailChange,
              type: 'email',
              placeholder: 'user@email.com'
            })}

            {Input({
              hasErrors: isPassword,
              label: 'Password',
              onChange: this.passwordChange,
              value: password,
              type: 'password',
              placeholder: 'xxxxxxxxxxxx'
            })}

            <div className={styleMessage(isEmail && isPassword)}>
              <ul>
                <li>{errorMessages.password}</li>
                <li>{errorMessages.email}</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }} className="show">
              {/* <Loader size={1} /> */}
              <br />
              <button className="ui orange fluid button aligned center">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default SignIn;
