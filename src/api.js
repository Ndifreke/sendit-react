const getURL = (url, local) => {
  return local
    ? `http://localhost:8080${url}`
    : `https://send-app.herokuapp.com${url}`;
};
const devMode = true;

export const request = function (url, callback) {
  const req = new XMLHttpRequest();
  req.open('GET', url);

  return new Promise((resolve) => {
    req.onreadystatechange = function () {
      if (req.status === 200 && req.readyState === 4) {
        if (callback) {
          callback(req.responseText);
        }
        resolve(req.responseText);
      }
    };
    req.send();
  });
};

class SendIt {
  static async request(url, data, override) {
    let urlEncoded = '';
    for (const k in data) {
      urlEncoded += `${k}=${data[k]}&`;
    }
    let payload = {
      method: 'POST',
      body: urlEncoded || null,
      headers: {
        authorization: window.localStorage.getItem('token'),
        'Content-type': 'application/x-www-form-urlencoded'
      }
    };
    const init = override ? Object.assign(payload, override) : payload;
    return await fetch(url, init);
  }

  static async get(url, callback) {
    return SendIt.request(url, null, {
      method: 'GET'
    });
  }

  static async put(url, data) {
    url = getURL(url, devMode);
    return await SendIt.request(url, data, {
      method: 'PUT'
    });
  }

  static async post(url, data) {
    return await SendIt.request(url, data, {
      method: 'post'
    });
  }
}

export default SendIt;

export const authenticate = async () => {
  try {
    const url = getURL('/api/v1/auth', devMode);
    const response = await SendIt.get(url);
    const json = await response.json();
    if (response.status === 200) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log('could not logg in');
    return Promise.reject(false);
  }
  return Promise.resolve(false);
};

export const signup = async (data) => {
  try {
    const url = getURL('/api/v1/auth/signup', devMode);
    const response = await SendIt.post(url, data);
    const json = await response.json();
    json.status = response.status;
    return Promise.resolve(json);
  } catch (err) {
    console.log('Error Occurred during signup', err.message);
  }
  return Promise.reject('error rejectas');
};

export const signin = async (data) => {
  try {
    const url = getURL('/api/v1/auth/login', devMode);
    const response = await SendIt.post(url, data);
    const json = await response.json();
    json.status = response.status;
    return Promise.resolve(json);
  } catch (err) {
    console.log('Error Occurred during signup', err.message);
  }
  return Promise.reject('error rejectas');
};

export const createParcel = async (data) => {
  try {
    const url = getURL('/api/v1/parcels', devMode);
    const response = await SendIt.post(url, data);
    const json = await response.json();
    json.status = response.status;
    return Promise.resolve(json);
  } catch (err) {
  }
  return Promise.reject('error rejectas');
};

export const fetchParcels = async () => {
  try {
    const url = getURL(`/api/v1/users/null/parcels`, devMode);
    const response = await SendIt.get(url);
    const body = await response.json();
    const status = response.status;
    return Promise.resolve({ parcels: body.response, status });
  } catch (error) {
    return { parcels: [], status };
  }
};
