const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const login = (route, email, password) => {
  return fetch(`/user/${route}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(_checkStatus)
    .then(res => {
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
  localStorage.clear();
  window.location.href = "/signin";
};

const authFetch = (url, options) => {
  headers["Authorization"] = "Bearer " + getToken();
  return fetch(url, {
    headers,
    ...options
  }).then(_checkStatus);
};

const _checkStatus = response => {
  return response.json().then(res => {
    if (!response.ok) {
      if (response.status === 403) {
        logout();
      }

      const error = (res && res.error) || response.statusText;
      return Promise.reject(error);
    }

    return res;
  });
};

const requireAuth = (nextState, replace) => {
  if (!loggedIn) {
    replace({ pathname: "/login" });
  }
};

export { login, loggedIn, logout, authFetch, requireAuth };
