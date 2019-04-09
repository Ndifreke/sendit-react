import React, { Fragment } from 'react';
import '@style/forms.css';
// import ExternalPage from '@common/ExternalPage';
import connectStore from '@common/connectStore';
import Form from '@common/Forms';
import Header from '@common/Header';

import {
  validateEmail,
  validatePassword,
  validateName,
  validateMobile
} from '@script/util';
import { signup } from '@src/api';

class Signup extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    surname: '',
    mobile: '',
    isSamePassword: true,
    admin: true,
    inFlight: false
  };

  /* Authenticate login on everytime the page is loaded */
  static async componentDidMount(props) {
    // props.dispatch(action.auth(props.history));
  }

  signup = async (event) => {
    event.preventDefault();
    const { firstname, mobile, surname, email, password, admin } = this.state;
    this.setState({ inFlight: true });
    let message = null;
    try {
      const response = await signup({
        firstname,
        surname,
        email,
        password,
        mobile,
        admin
      });
      if (response.status !== 201) {
        this.setState((state) => {
          message = response.message;
          return { inFlight: false, message };
        });
        return;
      }
      message = response.message;
    } catch {}
    this.setState({ inFlight: false, message });
    setTimeout(() => {
      this.props.history.push('/login');
    }, 3000);
  };

  passwordChange = (password) => this.setState({ password });
  changeMobile = (mobile) => this.setState({ mobile });
  firstname = (firstname) => this.setState({ firstname });
  lastname = (surname) => this.setState({ surname });
  emailChange = (email) => this.setState({ email, message: null });

  onConfirmPassword = (confirmPassword) => {
    this.setState(({ password }) => {
      const isSamePassword = password === confirmPassword;
      return { confirmPassword, isSamePassword };
    });
  };

  formReady = () => {
    const {
      password,
      firstname,
      surname,
      email,
      mobile,
      isSamePassword
    } = this.state;
    return (
      validatePassword(password) &&
      validateEmail(email) &&
      validateName(firstname) &&
      validateName(surname) &&
      validateMobile(mobile) &&
      isSamePassword
    );
  };

  render() {
    const {
      password,
      confirmPassword,
      isSamePassword,
      firstname,
      surname,
      email,
      mobile,
      inFlight,
      message
    } = this.state;

    return (
      <Fragment>
      <Header/>
        <div className="ui container segment">
          <div className="ui header center aligned large">
            Create SendIt Account
          </div>
          <Form
            alert={message}
            onSubmit={this.signup}
            isReady={this.formReady()}
            inFlight={inFlight}
            inputList={[
              {
                validator: validateName,
                fieldName: 'firstname',
                message: 'firstname is invalid',
                label: 'First Name',
                onChange: this.firstname,
                value: firstname,
                type: 'text',
                placeholder: 'John'
              },
              {
                validator: validateName,
                fieldName: 'surname',
                message: 'surname is invalid',
                label: 'Last Name',
                onChange: this.lastname,
                value: surname,
                type: 'text',
                placeholder: 'John'
              },
              {
                validator: validateEmail,
                fieldName: 'email',
                message: 'email should be in form of user@email.com',
                label: 'Email',
                onChange: this.emailChange,
                value: email,
                type: 'email',
                placeholder: 'john@email.com'
              },
              {
                validator: validateMobile,
                fieldName: 'Mobile',
                message: 'phone number should not be greater than 11',
                label: 'Mobile',
                onChange: this.changeMobile,
                value: mobile,
                type: 'tel',
                placeholder: '00123456788'
              },
              {
                validator: validatePassword,
                fieldName: 'Password',
                message: 'invalid password entered',
                label: 'Password',
                onChange: this.passwordChange,
                value: password,
                type: 'password',
                placeholder: 'xxxxxxxxxx'
              },
              {
                validator: validatePassword,
                fieldName: 'confirm password',
                message: 'password did not match',
                label: 'Password',
                hasErrors: !isSamePassword,
                onChange: this.onConfirmPassword,
                value: confirmPassword,
                type: 'password',
                placeholder: 'xxxxxxxxxx'
              }
            ]}
          />
        </div>
 </Fragment>
    );
  }
}

export const SignupPage = connectStore(Signup);
export default Signup;
