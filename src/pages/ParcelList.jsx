import React, { Fragment } from 'react';
import InternalPages from '@common/InternalPages';
import connectStore from '@common/connectStore';
import ParcelComponent from '@common/ParcelComponent';
import action from '@redux/action';

class ParcelList extends React.Component {
  state = {
    parcels: [],
    status: null
  };

  side = () => {
    $('.ui.sidebar').sidebar('toggle');
  };

  async componentDidMount() {
    await this.props.dispatch(action.parcels);
  }

  static getDerivedStateFromProps(props) {
    return { parcels: props.parcels };
  }

  render() {

    const { parcels } = this.state;
    const ParcelComponentList = parcels.list.map((parcel, i) => {
      return <ParcelComponent parcel={parcel} key={i} />;
    });
    return (
      <Fragment>
        <InternalPages />
        <div className="pusher">
          <i className="icon menu" onClick={this.side}>
            kj
          </i>
          <div className="ui container">{ParcelComponentList}</div>
        </div>
      </Fragment>
    );
  }
}

export const ParcelListApp = connectStore(ParcelList);
export default ParcelList;
