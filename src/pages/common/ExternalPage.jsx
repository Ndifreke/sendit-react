import React, { Fragment } from 'react';
import Header from '@common/Header';
class ExternalPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
      </Fragment>
    );
  }
}

export default ExternalPage;
