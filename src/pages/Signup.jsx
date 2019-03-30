import React, { Fragment } from 'react';
import '@style/forms.css';
import ExternalPage from '@common/ExternalPage';
import Input from '@common/Input';
import Loading from '@common/Loading';
import {
  validateEmail,
  validatePassword,
  styleMessage,
  validateName,
  validateMobile
} from '@script/util';

class Signup extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    surname: '',
    mobile: '',
    isEmail: true,
    isPassword: true,
    isSamePassword: true,
    isFirstname: true,
    isSurname: true,
    isMobile: true,
    errorMessages: {
      password: null,
      email: null,
      confirmPassword: null,
      mobile: null
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

  onConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    this.setState(({ password, errorMessages }) => {
      const isSamePassword = password === confirmPassword;
      errorMessages.confirmPassword = isSamePassword
        ? null
        : 'Password do not match';
      return { confirmPassword, isSamePassword };
    });
  };

  changeMobile = (event) => {
    const mobile = event.target.value;
    this.setState(({ errorMessages }) => {
      const isMobile = validateMobile(mobile);
      errorMessages.mobile = isMobile ? null : 'Mobile Number is invalid';
      return { mobile, isMobile };
    });
  };

  lastNameChange = (event) => {
    const firstname = event.target.value;
    this.setState(({ errorMessages }) => {
      const isFirstname = validateName(firstname);
      errorMessages.firstname = isFirstname ? null : 'First name is invalid';
      return { firstname, isFirstname, errorMessages };
    });
  };

  surnameChange = (event) => {
    const surname = event.target.value;
    this.setState(({ errorMessages }) => {
      const isSurname = validateName(surname);
      errorMessages.surname = isSurname ? null : 'Surname name is invalid';
      return { surname, isSurname, errorMessages };
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
    const {
      isPassword,
      isEmail,
      isFirstname,
      isSurname,
      password,
      confirmPassword,
      isSamePassword,
      firstname,
      surname,
      email,
      mobile,
      isMobile,
      errorMessages
    } = this.state;
    return (
      <Fragment>
        <ExternalPage />

        <div className="ui container segment">
          <div className="ui header center aligned large">
            Create SendIt Account
          </div>

          <form className="ui form">
            {Input({
              hasErrors: isFirstname,
              label: 'First Name',
              onChange: this.lastNameChange,
              value: firstname,
              type: 'text',
              placeholder: 'John'
            })}

            {Input({
              hasErrors: isSurname,
              label: 'Surname',
              onChange: this.surnameChange,
              value: surname,
              type: 'text',
              placeholder: 'Alberto'
            })}

            {Input({
              hasErrors: isEmail,
              label: 'Email',
              value: email,
              onChange: this.emailChange,
              type: 'email',
              placeholder: 'user@email.com'
            })}

            {Input({
              hasErrors: isMobile,
              label: 'Mobile',
              value: mobile,
              onChange: this.changeMobile,
              type: 'tel',
              placeholder: '01234567890'
            })}

            {Input({
              hasErrors: isPassword,
              label: 'Password',
              onChange: this.passwordChange,
              value: password,
              type: 'password',
              placeholder: 'xxxxxxxxxxxx'
            })}

            {Input({
              hasErrors: isSamePassword,
              label: 'Confirm Password',
              onChange: this.onConfirmPassword,
              value: confirmPassword,
              type: 'password',
              placeholder: 'xxxxxxxxxxxx'
            })}

            <div
              className={styleMessage(
                isEmail &&
                  isPassword &&
                  isFirstname &&
                  isSurname &&
                  isSamePassword &&
                  isMobile
              )}>
              <ul>
                <li>{errorMessages.firstname}</li>
                <li>{errorMessages.surname}</li>
                <li>{errorMessages.email}</li>
                <li>{errorMessages.mobile}</li>
                <li>{errorMessages.password}</li>
                <li>{errorMessages.confirmPassword}</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center' }} className="show">
              <Loading size={1} />
              <br />
              <button className="ui orange fluid button aligned center">
                sign up
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default Signup;
