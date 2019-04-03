import React, { Fragment } from 'react';
import SideMenu from '@common/SideMenu';
import Header from '@common/Header';

class InternalPage extends React.Component {
  render() {
    return(
    <Fragment>
      <Header />
      <SideMenu />
    </Fragment>
    )
  }
}

export default InternalPage;
