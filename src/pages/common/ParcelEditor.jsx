import React, { Fragment } from 'react';
import connectStore from '@common/connectStore';
import Modal from 'react-modal';
import MapWidget from '@common/MapWidget';
import ParcelSummary from '@common/ParcelSummary';
import PropTypes from 'prop-types';
import { createParcel } from '@src/api';

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
  top: '-15px',
  left: '-2%',
  right: '-2%',
  bottom: '-15px',
  opacity: 1,
  zIndex: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.85)'
};
Object.assign(Modal.defaultStyles.overlay, overrideOverlay);

const deleteModel = {
  content: {
    left: '6%',
    right: '6%',
    padding: '1% 1%'
  }
};

class ParcelEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      parcel: {},
      focusedField: ParcelEditor.FIELD.destination,
      errorList: [],
      isAdmin: false
    };
  }

  validateSubmit = () => {
    const {
      shortname,
      origin,
      origin_lat,
      origin_lng,
      destination,
      destination_lat,
      destination_lng,
      description,
      weight,
      distance,
      isAdmin
    } = this.state.parcel;
    let errorList = [];
    if (!shortname || shortname.length < 5 || shortname.search(/.+/) === -1) {
      errorList.push(<li>Parcel must have a title</li>);
    }
    if (!origin || origin.search(/.+/) === -1 || origin.length < 5) {
      errorList.push(<li>Parcel must have an Origin</li>);
    }
    if (
      !destination ||
      destination.search(/.+/) === -1 ||
      destination.length < 5
    ) {
      errorList.push(<li>Parcel destination must be provided</li>);
    }
    if (
      !description ||
      description.search(/.+/) === -1 ||
      description.length < 10
    ) {
      errorList.push(
        <li>Ashort not less than 10 words that describes this parcel</li>
      );
    }
    this.setState({ errorList });
    const price = distance * 2;
    return this.state.parcel;
  };

  onsubmit = async () => {
    const payLoad = this.validateSubmit();
    const response = await createParcel(payLoad);
    if (response.status === 201) {
      this.props.closeEditor();
    } else {
      console.log('failed to create');
    }
    console.log(response);
  };

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
        this.setState(({ parcel }) => {
          return {
            parcel: {
              ...parcel,
              destination: name,
              destination_lat: lat,
              destination_lng: lng
            }
          };
        });
        break;
      case FIELDS.location:
        this.setState(({ parcel }) => {
          return {
            parcel: {
              ...parcel,
              location: name,
              location_lat: lat,
              location_lng: lng
            }
          };
        });
        break;
      case FIELDS.origin:
        this.setState(({ parcel }) => {
          return {
            parcel: {
              ...parcel,
              origin: name,
              origin_lat: lat,
              origin_lng: lng
            }
          };
        });
        break;
    }
    this.setDistance();
  };

  componentDidMount() {
    const defaultParcel = {
      shortname: '',
      origin: '',
      destination: '',
      description: '',
      weight: '',
      distance: '',
      location: 'UNCONFIRMED',
      status: 'UNCONFIRMED'
    };
    this.setState({ parcel: { ...defaultParcel, ...this.props.parcel } });
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
      event.preventDefault();
      event.stopPropagation();
      const FIELDS = ParcelEditor.FIELD;
      const value = event.target.value;
      switch (field) {
        case FIELDS.origin:
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, origin: value } };
          });
          break;
        case FIELDS.shortname:
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, shortname: value } };
          });
          break;
        case FIELDS.weight:
          //will not change in the future for non admin
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, weight: value } };
          });
          break;
        case FIELDS.description:
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, description: value } };
          });
          break;
        case FIELDS.destination:
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, destination: value } };
          });
          break;
        case FIELDS.location:
          //only admin will change this
          this.setState(({ parcel }) => {
            return { parcel: { ...parcel, location: value } };
          });
          break;
        default:
          console.log('unknown field', field);
      }
    };
  };

  static propTypes = {
    parcel: PropTypes.object.isRequired
  };

  setDistance = async () => {
    const {
      origin_lat,
      origin_lng,
      destination_lat,
      destination_lng
    } = this.state.parcel;

    if (origin_lat && origin_lng && destination_lat && destination_lng) {
      const originPosition = `${origin_lat},${origin_lng}`;
      const destinationPosition = `${destination_lat},${destination_lng}`;
      const distance = await LocationFinder.requestDistance(
        originPosition,
        destinationPosition
      );
      this.setState(({ parcel }) => {
        const price = this.computePrice(distance, parcel.price);
        return { parcel: { ...parcel, distance, price } };
      });
    }
  };

  computePrice = (distance, weight) => {
    let multiple = 10;
    if (/^(\d*\.)?\d+ km$/.test(distance)) {
      multiple = 20;
    }
    const number = Number(
      distance.substring(0, /[a-zA-Z]/.exec(distance).index)
    );
    return weight ? number * weight * multiple : number * multiple * 100;
  };

  parcelSubmitAction = () => {
    return (
      <button
        className="ui orange button fluid"
        title="edit"
        onClick={this.onsubmit}>
        <i className="edit outline icon" /> Send
      </button>
    );
  };

  render() {
    const {
      shortname,
      weight,
      destination,
      origin,
      description,
      isAdmin,
      location
    } = this.state.parcel;

    const { errorList } = this.state;
    const { onChange } = this;
    const Fields = ParcelEditor.FIELD;

    return (
      <Modal isOpen={true} style={deleteModel}>
        <div style={{ float: 'right' }} onClick={this.props.closeEditor}>
          <i className="close icon large red pointer" />
        </div>

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
                    <input
                      onChange={onChange(Fields.description)}
                      rows={1}
                      value={description}
                    />
                  </div>

                  <div className="field">
                    <label>Location</label>
                    <input
                      disabled={!isAdmin}
                      onChange={onChange(Fields.location)}
                      value={location}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui error message visible">
                    <i className="close icon" />
                    <div className="header">
                      There were some errors with your submission
                    </div>
                    <ul className="list">{errorList}</ul>
                  </div>
                </div>
                <div className="field">{this.parcelSubmitAction()}</div>
              </div>
            </div>

            <ParcelSummary
              parcel={{ ...this.state.parcel }}
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
