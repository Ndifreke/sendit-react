import ParcelEditor from '@common/ParcelEditor';
import Parcel from '@common/Parcel';
import React, { Fragment } from 'react';
// import InternalPages from '@common/InternalPages';
import connectStore from '@common/connectStore';
import action from '@redux/action';
import Header from '@common/Header';

class EditableParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: false, // props.editorOpen,
      parcels: [], //list of parcels received from server
      parcel: {} //the current parcel to be edited
    };
  }

  openEditor = (parcel) => {
    this.setState({ editorOpen: true, parcel });
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
    console.log(props, '>>>>>>props.list');
    return { parcels: props.parcels.list };
  }

  render() {
    const { editorOpen, parcel } = this.state;
    return (
      <Fragment>
        <Header />
        <div className="ui container">
          {editorOpen ? <ParcelEditor parcel={parcel} /> : null}
          {this.listParcels()}
        </div>
      </Fragment>
    );
  }
}

export const EditableParcelApp = connectStore(EditableParcel);
export default EditableParcel;
