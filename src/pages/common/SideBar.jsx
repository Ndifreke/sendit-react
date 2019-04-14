import React, { Fragment } from 'react';
import action from '@redux/action';
import connectStore from '@common/connectStore';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  toggleSideBar = () => {
    $('.ui.sidebar').sidebar('toggle');
  };

  sideBar = () => {
    return (
      <Fragment>
        <div
          className="ui mini black launch right attached fixed button"
          onClick={this.toggleSideBar}>
          <i className="bars icon large" />
        </div>

        <div className="ui left vertical menu thin inverted sidebar">
          <Link
            to={'/parcel'}
            className="item"
            onClick={(e) => {
              this.props.dispatch(action.openEditor);
              this.toggleSideBar()
            }}>
            Create Article
          </Link>
        </div>

      </Fragment>
    );
  };

  render() {
    return this.sideBar();
  }
}
export default connectStore(SideBar);
