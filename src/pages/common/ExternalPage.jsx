import React, { Fragment } from 'react';
import Header from '@common/Header';
import 'semantic-ui-css/semantic.min.css';
// import "@style/semantic.css";
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
