import React, { Fragment } from 'react';
import '@style/forms.css';
import ExternalPage from '@common/ExternalPage';
import Input from '@common/Input';
import Loading from '@common/Loading';
import { validateEmail, validatePassword, style } from '@script/util';
import action from '@redux/action';
import connectStore from '@common/connectStore';
import { signin } from '@src/api';
// import UIBuilder from "@asset/script/UIBuilder"
// import login from "@asset/script/authLogin"

class SignIn extends React.Component {
  state = {
    password: 'mmm',
    email: 'make@email.com',
    isEmail: true,
    isPassword: true,
    noResponseError: true,
    errorMessages: {
      password: null,
      email: null,
      response: null
    },
    inFlight: false,
    loading: true
  };

  passwordChange = (event) => {
    const password = event.target.value;
    this.setState(({ errorMessages }) => {
      const isPassword = validatePassword(password);
      errorMessages.response = null;
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
      errorMessages.response = null;
      errorMessages.email = isEmail
        ? null
        : 'Email should be in inform of user@domain.com';
      return { email, isEmail, errorMessages };
    });
  };

  validateInput = () => {
    const { isPassword, isEmail, password, email } = this.state;
    return isPassword && isEmail && password && email;
  };

  /* Authenticate login on everytime the page is loaded */
  async componentDidMount() {
    this.props.dispatch(action.auth(this.props.history ));
  }

  signin = async (event) => {
    event.preventDefault();

    if (this.validateInput()) {
      this.setState({ inFlight: true });
      const { email, password } = this.state;
      let response = '';

      try {
        response = await signin({ email, password });
        if (response.status !== 200) {
          this.setState((state) => {
            state.errorMessages.response = response.message;
            return { inFlight: false, noResponseError: true };
          });
          return;
        }
      } catch (e) {}

      localStorage.setItem('token', response.token);
      this.setState((state) => {
        //reroute on successfull login
        setTimeout(() => {
          this.props.history.push('/signup');
        }, 3000);

        state.errorMessages.response = response.message;
        return { inFlight: false };
      });
    }
  };

  render() {
    const {
      isPassword,
      isEmail,
      password,
      email,
      inFlight,
      errorMessages,
      noResponseError
    } = this.state;
    console.log(errorMessages);

    const inputOk =
      isEmail && isPassword && noResponseError && errorMessages.response;

    const containMessage = isEmail || isPassword || noResponseError;
    console.log(isEmail, isPassword, noResponseError);

    return (
      <Fragment>
        <ExternalPage />

        <div className="ui container segment">
          <div className="ui header center aligned large">
            Sign into SendIt Account
          </div>

          <form className="ui form" onSubmit={this.signin}>
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

            {containMessage ? (
              <div className={style(inputOk).message}>
                <ul>
                  <li>{errorMessages.password}</li>
                  <li>{errorMessages.email}</li>
                  <li>{errorMessages.response}</li>
                </ul>
              </div>
            ) : (
              ''
            )}

            <div style={{ textAlign: 'center' }}>
              <Loading size={1} visible={inFlight} />
              <br />
              <button
                className={style(this.validateInput()).button}
                onClick={this.signin}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export const SignInApp = connectStore(SignIn);
export default SignIn;
