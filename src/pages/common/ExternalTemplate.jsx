import React from 'react';
import '@asset/style/header.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const styles = {
  buttonContainer: ['ui right aligned container auto'].join(' '),
  button: ['ui mini inverted standard button']
};

function Header() {
  return (
    <div className="ui topHeader">
      <div className={styles.buttonContainer}>
        <Link to="/login">
          <button className={styles.button}>Login</button>
        </Link>

        <Link to="/signup">
          <button className={"last " + styles.button}>Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
