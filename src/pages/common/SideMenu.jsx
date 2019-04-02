import React, { Fragment } from 'react';

class SideMenu extends React.Component {
  render() {
    return (
      <Fragment>
       <div className="ui menu vertical inverted sidebar">
          <a className="item one">1</a>
          <a className="item">2</a>
          <a className="item">3</a>
        </div>
      </Fragment>
    );
  }
}

export default SideMenu;
