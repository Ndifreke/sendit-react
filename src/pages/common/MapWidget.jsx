import React from 'react';
import '@style/create.css';
import { LocationFinder } from '../../asset/script/GoogleMaps';

const loadscript = (src) => {
  const script = document.createElement('script');
  script.async = false;
  script.src = src;
  document.querySelector('body').appendChild(script);
};

class MapWidget extends React.Component {
  
  componentDidMount() {
    LocationFinder.captureLabelData = this.props.onClick;
    loadscript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVG4POFIVEKqFALXWDJKSF1o1HPaUI8zk&callback=mapCallback'
    );
  }

  render() {
    return (
      <div id="mapviewport">
        <div id="position-container" className="elevate">
          {/* <input
            ref="searchMap"
            type="search"
            className="ui input fit-width"
            id="search-map"
            placeholder="Search Place"
            onChange={this.searchMap}
          /> */}
          <div className="places">
            <div className="ui text position-label" id="map-tip">
              <p>Tip: USE ANY OF BELLOW METHOD</p>
              <hr />
              <p>
                Enter Address into Destination/Origin input field and click on
                Location Picker icon
              </p>
              <a href="#map-ui" className="place-picker" />
              to see result on this menu and Map.
              <hr />
              Click any location on the Map to get information displayed in this
              Menu
              <hr />
              Select the Place on this menu to Fill the input box field
            </div>
          </div>
        </div>
        <div id="map-ui">
          <span>Map here </span>
        </div>
      </div>
    );
  }
}

export default MapWidget;
