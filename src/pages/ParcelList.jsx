import React, { Fragment } from 'react';
import InternalPages from '@common/InternalPages';
import connectStore from '@common/connectStore';
import action from '@redux/action';
import EditableParcel from '@common/EditableParcel';

class ParcelList extends React.Component {
  state = {
    parcels: [],
    status: null
  };

  async componentDidMount() {
    await this.props.dispatch(action.parcels);
  }
  static getDerivedStateFromProps(props) {
    return { parcels: props.parcels };
  }

  onEditorOpen = () => {
    this.setState({ editorOpen: true });
  };

  listParcels = () => {
    const { parcels } = this.state;
    return parcels.list.map((parcel, i) => {
      return <Parcel onEdit={this.onEditorOpen} parcel={parcel} key={i} />;
    });
  };

  openEditor = (parcelId) => {
    return (
      <ParcelEditor
        parcel={this.state}
        parcel={parcelId}
        closeEditor={this.closeEditor}
      />
    );
  };

  render() {
    const { editorOpen } = this.state;
    return (
      <Fragment>
        <InternalPages />
        <div className="ui container">
          <EditableParcel />
        </div>
      </Fragment>
    );
  }
}

export const ParcelListApp = connectStore(ParcelList);
export default ParcelList;
