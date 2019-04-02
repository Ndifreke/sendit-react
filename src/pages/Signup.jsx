import React, { Fragment } from 'react';
import '@style/forms.css';
import ExternalPage from '@common/ExternalPage';
import Input from '@common/Input';
import Loading from '@common/Loading';
import action from '@redux/action';
import connectStore from '@common/connectStore';
import Form from "@common/Forms";
 
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMobile,
  style
} from '@script/util';
import { signup } from '@src/api';

class Signup extends React.Component {
  state = {
    password: 'mmm',
    confirmPassword: 'mmm',
    email: 'make@email.com',
    firstname: 'bddd',
    surname: 'eeee',
    mobile: '00000000000',
    isEmail: true,
    isPassword: true,
    isSamePassword: true,
    isFirstname: true,
    isSurname: true,
    isMobile: true,
    admin: true,
    noResponseError: true,
    errorMessages: {
      password: null,
      email: null,
      confirmPassword: null,
      mobile: null,
      response: null
    },
    inFlight: false
  };

  /* Authenticate login on everytime the page is loaded */
  static async getDerivedStateFromProps(props) {
    // props.dispatch(action.auth(props.history));
 }

  signup = async (event) => {
    event.preventDefault();
    const { firstname, mobile, surname, email, password, admin } = this.state;
    this.setState({ inFlight: true });
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
        state.errorMessages.response = response.message;
        return { inFlight: false, noResponseError: false };
      });
      return;
    }
    this.setState({ inFlight: false });
    setTimeout(() => {
      this.props.history.push('/login');
    }, 3000);
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
      errorMessages.response = '';
      return { email, isEmail, errorMessages, noResponseError: true };
    });
  };

  validateInputs = () => {
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
      isMobile
    } = this.state;
    return (
      isPassword &&
      isEmail &&
      isFirstname &&
      isSurname &&
      password &&
      confirmPassword &&
      isSamePassword &&
      firstname &&
      surname &&
      email &&
      mobile &&
      isMobile
    );
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
      errorMessages,
      inFlight,
      noResponseError
    } = this.state;

    const inputOk =
      isEmail &&
      isPassword &&
      isFirstname &&
      isSurname &&
      isSamePassword &&
      isMobile &&
      noResponseError;
    console.log(errorMessages);

    return (
      <Fragment>
        <ExternalPage />
        <div className="ui container segment">
          <div className="ui header center aligned large">
            Create SendIt Account
          </div>
          <Form
          inputList={[ 
              {
              hasErrors: isFirstname,
              label: 'First Name',
              onChange: this.lastNameChange,
              value: firstname,
              type: 'text',
              placeholder: 'John'
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
