import React, { Fragment } from 'react';
import SecureHeader from '@common/SecureHeader';

class InternalPage extends React.Component {
  showSideMenu = () => {
    $('.ui.sidebar').sidebar('toggle');
  };

  render() {
    return (
      <Fragment>
        <SecureHeader />
        <div className="ui mini black launch right attached fixed button" onClick={this.showSideMenu} >
        <i className="bars icon large" />
        </div>
      </Fragment>
    );
  }
}

export default InternalPage;
