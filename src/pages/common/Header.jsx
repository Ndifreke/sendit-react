import React, { Fragment } from 'react';
import '@asset/style/header.css';
import InternalTemplate from '@common/InternalTemplate';
import ExternalTemplate from '@common/ExternalTemplate';
import connectStore from '@common/connectStore';
import { Link } from 'react-router-dom';
const styles = {
  buttonContainer: ['ui right aligned container auto'].join(' '),
  button: ['ui mini inverted standard button']
};
import action from '@redux/action';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  async componentDidMount() {
    this.props.dispatch(action.auth(this.props.history));
  }

  render() {
    const { isLogin, location, history } = this.props;
    const securePath = ['/parcel'];
    if (!isLogin && securePath.indexOf(location.pathname) != -1) {
      // history.push('/login');
    }
    return (
      <Fragment>
        {isLogin ? <InternalTemplate /> : <ExternalTemplate />}
      </Fragment>
    );
  }
}

export default connectStore(withRouter(Header));
