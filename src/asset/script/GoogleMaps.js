let getLabel;
import { request } from "@src/api";

class LocationFinder {
  constructor(maps, lat = 6.552723299999999, lng = 3.3664072) {
    LocationFinder.maps = maps;
    this.maps = maps;
    this.latitude = lat;
    this.longitude = lng;
    this.geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    this.reversecodingUrl =
      'https://maps.googleapis.com/maps/api/geocode/json?';
    LocationFinder.apiLocation = 'https://maps.googleapis.com/maps/api';
    LocationFinder.key = 'AIzaSyCVG4POFIVEKqFALXWDJKSF1o1HPaUI8zk';
    this.map = this.createMap(this.maps.Map, this.latitude, this.longitude);
  }

  /* initialize a new map centered at longitude and latitude */
  createMap(googleMap, latitude, longitude) {
    const location = {
      lat: latitude,
      lng: longitude
    };
    this.map = new googleMap(document.querySelector('#map-ui'), {
      center: location,
      zoom: 16
    });

    return this.map;
  }

  getLatandLong() {
    if (this.map === undefined) {
      this.createMap();
    }
  }

  static async requestDistance(origin = '0.0', destination = '0.0', callback) {
    // console.log(origin)
    const org = origin.split(',');
    const dest = destination.split(',');

    return new Promise(function(resolve) {
      try {
        const start = new google.maps.LatLng(org[0], org[1]);
        const end = new google.maps.LatLng(dest[0], dest[1]);
        const services = new google.maps.DistanceMatrixService();

        services.getDistanceMatrix(
          {
            origins: [start],
            destinations: [end],
            travelMode: 'DRIVING'
          },
          function(result) {
            const status = result.rows[0].elements[0].status;
            const distance =
              status === 'OK'
                ? result.rows[0].elements[0].distance.text
                : 'Distance Unavailable!';
            resolve(distance);
            callback(distance);
          }
        );
      } catch (e) {
        alertMessage('Unable to fetch distance information', 'fail');
      }
    });
  }

  setLatandLong(lat, lng) {
    this.latitude = lat;
    this.latitude = lng;
  }

  parseResults(json) {
    const result = [];

    JSON.parse(json).results.forEach((address) => {
      if (address.formatted_address.indexOf('Unnamed') === -1) {
        result.push({
          [address.formatted_address]: address.geometry.location
        });
      }
    });
    return result;
  }

  placeMarker(location, map = this.map) {
    // center map and place marker in result position
    map.setCenter(location);
    if (this.marker) {
      this.marker.setMap(null);
    }
    /* remove old marker before adding a new one can later
            which marker to use or not use choosen marker to determine */
    this.marker = new this.maps.Marker({
      map,
      position: location,
      label: 'P'
    });
  }

  useGeocode(addressName, cb) {
    const geocoder = new this.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode(
        {
          address: addressName
        },
        (results, status) => {
          if (status === 'OK') {
            const result = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lat()
            };
            resolve(result);
            // set the cordinate on this callback function
            if (cb) {
              cb(result);
            }
          }
        }
      );
    });
  }

/**
 * Add click event listener on the map body to retrive the
 * cordinates of any position when the map is clicked. This 
 * cordinates can later be used to reverse code the location namee
 *  */
  async positionsOnclick(cb) {
    const self = this;
    return new Promise((resolve) => {
      self.map.addListener('click', (event) => {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const location = {
          lat: latitude,
          lng: longitude
        };
        self.placeMarker(location, self.map);
        self.getPositionFromCordinate(location).then((locations) => {
          cb(locations);
          resolve(location);
        });
      });
    });
  }

  async getPositionFromCordinate(location, cb) {
    const latlng = `latlng=${location.lat},${location.lng}`;
    const url = this.reversecodingUrl + latlng + '&key=' + LocationFinder.key;
    const responseText = await request(url);
    const json = this.parseResults(responseText);
    if (cb) cb(json);
    return Promise.resolve(json);
  }

  promiseAddress(input, cb) {
    switch (typeof input) {
      case 'string':
        self = this;
        this.useGeocode(input).then((location) => {
          cb(location);
          self.placeOnMap(location, sefl.map);
        });
      case 'object':
        this.getPositionFromCordinate(input).then((positions) => {
          cb(positions);
        });
    }
  }
}

/** Label does the job of showing clicked posiition on map */
class Label {
  constructor(map) {
    Label.map = map;
  }

  static displayLabelOnclick(clickedCordinates) {
    const places = document.querySelector('.places');
    places.innerHTML = '';
    clickedCordinates.forEach((cordinate) => {
      places.appendChild(Label.positionOnTile(cordinate));
    });
  }

  static displayLabalFromCordinate(cordinate) {
    const places = document.querySelector('.places');
    places.appendChild(Label.positionOnTile(cordinate));
    Label.map.placeMarker(cordinate);
  }

  /* create mini label on map where clicked position will be displayed*/
  static positionOnTile(cordinate) {
    return createLabel(cordinate);
  }
  showOnMap(cordinate) {
    if (cordinate instanceof Array) {
      // It came from click event
      Label.displayLabelOnclick(cordinate);
    } else if (typeof cordinate === 'object') {
      Label.displayLabalFromCordinate(cordinate);
    }
  }
}

function initMap() {
  const getLocation = new LocationFinder(google.maps);
  getLabel = new Label(getLocation);
  getLocation.positionsOnclick(getLabel.showOnMap);
  window.getLabel = getLabel;
  window.getLocation = getLocation;
}

function createLabel(cordinate) {
  const positionLabel = document.createElement('div');
  positionLabel.setAttribute("class", 'position-label');
 
  let cord, locationName;
  if ('lat' in cordinate) {
    cord = cordinate;
  } else {
    //grab position names from google location search
    locationName = Object.keys(cordinate);
    cord = {
      lat: cordinate[locationName].lat,
      lng: cordinate[locationName].lng
    };
  }
  positionLabel.innerHTML = `<span> ${locationName}</span> <br/> 
    <span> ${cord.lat} , ${cord.lng} </span>`;

  positionLabel.onclick = function() {
    LocationFinder.captureLabelData({name:locationName[0], cord})
    Label.map.placeMarker(cord);
  };
  return positionLabel;
}

export { LocationFinder, initMap};
