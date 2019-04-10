import React from 'react';

import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  sideBar = () => {
    return (
      <div className="ui left vertical menu thin inverted sidebar">
        <Link
          to={{
            pathname: '/parcel',
            state: { requestCreate: true }
          }}
          className="item">
          Create Article
        </Link>
      </div>
    );
  };

  render() {
    return this.sideBar();
  }
}
export default SideBar;
