import React, { Fragment } from 'react';
import SecureHeader from '@common/SecureHeader';
import '@asset/style/header.css';
import { Link } from 'react-router-dom';
import '@asset/style/internal.css';
import { withRouter } from 'react-router-dom';
import Sidebar from "@common/sidebar"
import connectStore from '@common/connectStore';

const styles = {
  buttonContainer: ['ui right aligned container auto'].join(' '),
  button: ['ui mini inverted standard button']
};

class InternalPage extends React.Component {
  showSideMenu = () => {
    $('.ui.sidebar').sidebar('toggle');
  };

  onSignout = () =>{
    localStorage.setItem('token', null);
    console.log('thanks')
  };

  render() {
    return (
      <Fragment>
        <Sidebar/>
        <div className="ui topHeader">
          <div className={styles.buttonContainer}>
            <Link to="/login">
              <button className={styles.button}>Login</button>
            </Link>

            <Link to="/signup" onClick={this.onSignout}>
              <button className={'last ' + styles.button}>Sign Out</button>
            </Link>
          </div>
        </div>
        <div
          className="ui mini black launch right attached fixed button"
          onClick={this.showSideMenu}>
          <i className="bars icon large" />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(InternalPage);
 