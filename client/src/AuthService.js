const login = (route, email, password) => {
  return requestAPI(`/user/${route}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  }).then(res => {
    setStorage(res.token, email);
    return Promise.resolve(res);
  });
};

const loggedIn = () => {
  return !!getToken();
};

const setStorage = (token, email) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
};

const requestAPI = (url, options) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // Setting Authorization header
  if (loggedIn()) {
    headers["Authorization"] = "Bearer " + getToken();
  }

  return fetch(url, {
    headers,
    ...options
  })
    .then(_checkStatus)
    .then(response => response.json());
};

const _checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

module.exports = { login, loggedIn, logout };
