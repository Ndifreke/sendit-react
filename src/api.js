class SendIt {
  static async request(url, data, override) {
    let urlEncoded = '';
    for (const k in data) {
      urlEncoded += `${k}=${data[k]}&`;
    }
    console.log(urlEncoded)
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

  static async get(url) {
    return SendIt.request(url, null, {
      method: 'GET'
    });
  }

  static async put(url, data) {
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
    const response = await SendIt.get('http://localhost:8080/api/v1/auth');
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
    const response = await SendIt.post(
      'http://localhost:8080/api/v1/auth/signup',
      data
    );
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
    const response = await SendIt.post(
      'http://localhost:8080/api/v1/auth/login',
      data
    );
    const json = await response.json();
    json.status = response.status;
    return Promise.resolve(json);
  } catch (err) {
    console.log('Error Occurred during signup', err.message);
  }
  return Promise.reject('error rejectas');
};
