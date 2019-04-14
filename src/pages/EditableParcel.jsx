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

  //Opens the editor window and pass the parcel argument in for editing
  openForEdit = (parcel) => {
    this.props.dispatch(action.openEditor);
    this.setState({ parcel });
  };

  closeEditor = async () => {
    this.props.dispatch(action.closeEditor);
    await this.props.dispatch(action.parcels);

    //reset the previous parcel in memory so that opening the
    //editor to create a new parcel we wont have previous parcel filling
    // in the form
    this.setState({ parcel: {} });
  };

  listParcels = () => {
    const { parcels } = this.state;
    return parcels.map((parcel, i) => {
      return <Parcel openForEdit={this.openForEdit} parcel={parcel} key={i} />;
    });
  };

  async componentDidMount() {
    await this.props.dispatch(action.parcels);
  }

  searchParcel = async () => {
    console.log('searching parcels');
  };

  static getDerivedStateFromProps(props) {
    return { parcels: props.parcels.list, requestEdit: props.editorOpen };
  }

  render() {
    const { requestEdit: requestEdit, parcel, requestCreate } = this.state;
    return (
      <Fragment>
        <Header />

        <div className="ui container">
<div className="ui right action left input">
  <input type="text" placeholder="Search"/>
  <div className="ui basic floating dropdown button" style={{lineHeight:"0em"}}>
    <div className="text">This Page</div>
    <i className="dropdown icon"></i>
    <div className="menu">
      <div className="item">Email</div>
      <div className="item">Parcel ID</div>
    </div>
  </div>
</div>



          {requestEdit || requestCreate ? (
            <ParcelEditor closeEditor={this.closeEditor} parcel={parcel} />
          ) : null}
          {this.listParcels()}
        </div>
      </Fragment>
    );
  }
}

export const EditableParcelApp = connectStore(EditableParcel);
export default EditableParcel;
