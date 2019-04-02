import React, { Fragment } from 'react';
import '@style/forms.css';
import ExternalPage from '@common/ExternalPage';
import Input from '@common/Input';
import Loading from '@common/Loading';
import { validateEmail, validatePassword, style } from '@script/util';
import action from '@redux/action';
import connectStore from '@common/connectStore';
import { signin } from '@src/api';
import Form from '@common/Forms';

class SignIn extends React.Component {
  state = {
    password: '',
    email: '',
    inFlight: false
  };

  passwordChange = (password) => this.setState({ password });
  emailChange = (email) => this.setState({ email, message: null });

  validateInput = () => {
    const { password, email } = this.state;
    return validatePassword(password) && validateEmail(email);
  };

  /* Authenticate login on everytime the page is loaded */
  static async componentDidMount() {
    this.props.dispatch(action.auth(this.props.history));
  }

  signin = async (event) => {
    event.preventDefault();

    if (this.validateInput()) {
      this.setState({ inFlight: true });
      const { email, password } = this.state;
      let message = null, response;
      try {
        response = await signin({ email, password });
        if (response.status !== 200) {
          this.setState((state) => {
            return { inFlight: false, message: response.message };
          });
          return;
        }
      } catch (e) { }
      localStorage.setItem('token', response.token);
      this.setState((state) => {
        setTimeout(() => {
          this.props.history.push('/parcel');
        }, 3000);
        return { inFlight: false, message: response.message};
      });
    }
  };

  render() {
    const { password, email } = this.state;

    return (
      <Fragment>
        <ExternalPage />
        <div className="ui container segment">
          <div className="ui header center aligned large">
            Sign into SendIt Account
          </div>

          <Form
            alert={this.state.message}
            onSubmit={this.signin}
            isReady={this.validateInput()}
            inFlight={this.state.inFlight}
            inputList={[
              {
                value: email,
                onChange: this.emailChange,
                type: 'email',
                validator: validateEmail,
                fieldName: 'email',
                message: 'email should be in form of user@email.com',
                label: 'Email',
                value: email,
                placeholder: 'john@email.com'
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
              }
            ]}
          />
        </div>
      </Fragment>
    );
  }
}
export const SignInApp = connectStore(SignIn);
export default SignIn;
