import * as utils from '../utils/utils';

export function createAccount(account) {
  return fetch("http://localhost:8000/auth/register/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

export function loginAccount(account) {
  return fetch("http://localhost:8000/auth/login/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

export function logoutAccount() {
  return fetch("http://localhost:8000/api/account/logout/", {
    method: "DELETE",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

export async function validateLoggedIn() {
  const response = await fetch("http://localhost:8000/api/account/validate/", {
    method: "GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  });

  const data = await response.json();

  return !("error" in data);
}

export function getAllSettings() {
  return fetch("http://localhost:8000/api/account/settings/", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}
