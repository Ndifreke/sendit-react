import ParcelEditor from '@common/ParcelEditor';
import Parcel from '@common/Parcel';
import React, { Fragment } from 'react';
import connectStore from '@common/connectStore';
import action from '@redux/action';
import Header from '@common/Header';

class EditableParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestEdit: false,
      parcels: [], //list of parcels received from server
      parcel: {} //the current parcel to be edited
    };
  }

  openEditor = (parcel) => {
    this.setState({ requestEdit: true, parcel });
  };

  listParcels = () => {
    const { parcels } = this.state;
    return parcels.map((parcel, i) => {
      return <Parcel openEditor={this.openEditor} parcel={parcel} key={i} />;
    });
  };

  async componentDidMount() {
    await this.props.dispatch(action.parcels);
  }

  static getDerivedStateFromProps(props) {
    return { parcels: props.parcels.list };
  }

  render() {
    const { requestEdit: requestEdit, parcel } = this.state;
    let requestCreate = false;
    const { state } = this.props.location;
    if (state) {
      requestCreate = state.requestCreate;
    }
    return (
      <Fragment>
        <Header />
        <div className="ui container">
          {requestCreate || requestEdit ? <ParcelEditor parcel={parcel} /> : null}
          {this.listParcels()}
        </div>
      </Fragment>
    );
  }
}

export const EditableParcelApp = connectStore(EditableParcel);
export default EditableParcel;
