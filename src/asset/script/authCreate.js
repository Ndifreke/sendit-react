
function validateFormData() {
  return `shortname=${shortname}&destination=${destination}&destination_lat=${destinationLat}\
&destination_lng=${destinationLng}&description=${description}&origin=${origin}\
&origin_lat=${originLat}&origin_lng=${originLng}&weight=${weight}&price=${price}&distance=${distance}`;
}

/**
 * Refresh All Form fields and display them on the summary Label
 * @returns Promise resolved once distance value is returned from google
 */
function refreshSummary() {
  const form = document.forms['createParcel'];
  document.querySelector('#origin-summary').textContent = form.origin.value || 'Unkown!';
  document.querySelector('#destination-summary').textContent = form.destination.value || 'Unkown!';
  document.querySelector('#weight-summary').textContent = form.weight.value || '0 kg';
  return updateDistanceAndPrice();
}

function updateDistanceAndPrice() {
  const form = document.forms['createParcel'];
  const origin = form['origin-lat'].value + ',' + form['origin-lng'].value;
  const destination = form['destination-lat'].value + ',' + form['destination-lng'].value;
  const weight = form.weight.value;

  function setDistanceAndPrice(distanceText) {
    document.querySelector('#distance-summary').textContent = distanceText;
    if (/km/gi.test(distanceText)) {
      distance = distanceText.slice(0, -3);
      price = parseFloat(distance * weight); //distance in kilometers
    } else if (/m/.test(distanceText)) {
      distance = distanceText.slice(0, -2);
      price = parseFloat(distance * weight); //distance in meters
    }
    document.querySelector('#price-summary').textContent = '$' + price;
  }
  return LocationFinder.requestDistance(origin, destination, setDistanceAndPrice);
}

function loadMap() {
  document.querySelector('#position-container').style.display = 'block';
  initMap(google.maps);
}

function removeTips() {
  const mapTips = document.querySelector('#map-tip');
  if (mapTips)
    mapTips.remove();
}

export { loadMap };
