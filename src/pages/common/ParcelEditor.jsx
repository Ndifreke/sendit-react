import React, { Fragment } from 'react';
import connectStore from '@common/connectStore';
import Modal from 'react-modal';
import MapWidget from '@common/MapWidget';
import ParcelSummary from '@common/ParcelSummary';
import PropTypes from 'prop-types';

import { LocationFinder, initMap } from '@script/GoogleMaps';

window.LocationFinder = LocationFinder;
window.mapCallback = mapCallback;

/*
when Google map finishes loading, this function will be called
* and the map script will be contained in a global google object as maps
*/

function mapCallback() {
  document.querySelector('#position-container').style.display = 'block';
  initMap(google.maps);
}

const overrideOverlay = {
  top: '-23px',
  left: '-20px',
  right: '-23px',
  bottom: '-21px',
  opacity: 1,
  zIndex: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.85)'
};
Object.assign(Modal.defaultStyles.overlay, overrideOverlay);

const deleteModel = {
  content: {
    padding: '0px'
  }
};

class ParcelEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      ...this.props.parcel,
      focusedField: ParcelEditor.FIELD.destination
    };
  }

  static FIELD = {
    shortname: 0,
    description: 1,
    weight: 2,
    location: 3,
    origin: 4,
    destination: 5,
    location: 6
  };

  /**
   * this function is attached to LocationFinder as a static member
   * in MapWidget Component see MapWidget in this render() function
   * It is executed everytime the Label on the map is clicked,
   * an Object containing name, and cord propterty of the clicked location
   * is passed to this function which is used to set the parcel fields data
   *
   */
  captureLabelData = ({ name, cord }) => {
    const FIELDS = ParcelEditor.FIELD;
    const { lat, lng } = cord;
    switch (this.state.focusedField) {
      case FIELDS.destination:
        this.setState({
          destination: name,
          destination_lat: lat,
          destination_lng: lng
        });
        break;
      case FIELDS.location:
        this.setState({
          location: name,
          location_lat: lat,
          location_lng: lng
        });
        break;
      case FIELDS.origin:
        this.setState({
          origin: name,
          origin_lat: lat,
          origin_lng: lng
        });
        break;
    }
  };

  componentDidMount() {
    // LocationFinder.onLabelClick = this.onLabelClick;
  }

  searchMap = () => {
    const query = this.refs.searchMap.value;
    getLocation.useGeocode(query, getLabel.showOnMap);
  };

  setFocus = (field) => {
    const FIELDS = ParcelEditor.FIELD;
    return () => {
      switch (field) {
        case FIELDS.destination:
          this.setState({ focusedField: field });
          break;
        case FIELDS.origin:
          this.setState({ focusedField: field });
          break;
        case FIELDS.location:
          this.setState({ focusedField: field });
          break;
        default:
        //unasigned field is focused must be a bug
      }
    };
  };

  onChange = (field) => {
    return (event) => {
      const FIELDS = ParcelEditor.FIELD;
      const value = event.target.value;
      switch (field) {
        case FIELDS.origin:
          this.setState({ origin: value });
          break;
        case FIELDS.shortname:
          this.setState({ shortname: value });
          break;
        case FIELDS.weight:
          //will not change in the future for non admin
          this.setState({ weight: value });
          break;
        case FIELDS.description:
          this.setState({ description: value });
          break;
        case FIELDS.destination:
          this.setState({ destination: value });
          break;
        case FIELDS.location:
          //only admin will change this
          this.setState({ location: value });
      }
    };
  };

  static propTypes = {
    parcel: PropTypes.object.isRequired
  };
  // closeEditor = () => {
  //   this.setState({ isEditing: false });
  // };

  getAction = () => {
    return (
      <button className="ui orange button fluid" title="edit" onClick={''}>
        <i className="edit outline icon" /> Send
      </button>
    );
  };

  componentDidMount() {}
  render() {
    const { shortname, weight, destination, origin, description } = this.state;
    const { onChange } = this;
    const Fields = ParcelEditor.FIELD;

    return (
      <Modal isOpen={true} style={deleteModel}>
        <div ref="parcelContainer">
          <div className="ui equal width aligned padded grid stackable">
            <div className="column">
              <div className="ui small form">
                <div className="two fields">
                  <div className="field">
                    <label>Title *</label>
                    <input
                      onChange={onChange(Fields.shortname)}
                      placeholder="E.g Ripe Plantain"
                      type="text"
                      value={shortname}
                    />
                  </div>
                  <div className="field">
                    <label>Weight (kg)* </label>
                    <input
                      onChange={onChange(Fields.weight)}
                      placeholder="How much does it weigh"
                      type="number"
                      min={0}
                      value={weight}
                    />
                  </div>
                </div>

                <div className="two fields">
                  <div className="field">
                    <label>Destination * </label>
                    <input
                      onFocus={this.setFocus(Fields.destination)}
                      onChange={onChange(Fields.destination)}
                      placeholder="Destination of this Parcel"
                      type="text"
                      value={destination}
                    />
                  </div>
                  <div className="field">
                    <label>Origin *</label>
                    <input
                      onFocus={this.setFocus(Fields.origin)}
                      onChange={onChange(Fields.origin)}
                      placeholder="Where this Parcel was sent from"
                      type="text"
                      value={origin}
                    />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Description</label>
                    <textarea
                      onChange={onChange(Fields.description)}
                      rows={1}
                      value={description}
                    />
                  </div>
                  <div className="field">
                    <label>Done</label>
                    {this.getAction()}
                  </div>
                </div>
              </div>
            </div>
            <ParcelSummary
              parcel={{ ...this.state }}
              Action={{ ActionComponent: null }}
            />
          </div>
        </div>
        <div />
        <MapWidget onClick={this.captureLabelData} />
      </Modal>
    );
  }
}

export const ParcelEditorApp = connectStore(ParcelEditor);
export default ParcelEditor;
