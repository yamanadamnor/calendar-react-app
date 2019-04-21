import * as utils from '../utils/utils';

export function createAccount(account) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/register/`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login/`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/api/account/logout/`, {
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
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/account/validate/`, {
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
  return fetch(`${process.env.REACT_APP_API_URL}/api/account/settings/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

export function updateAllSettings(answers) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/account/settings/`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(answers),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

// setting is an object with the word "setting" as the key
// and the option as the value.
// key is the setting itself, e.g. "preferred_time" or "preferred_length"
export function updateSetting(key, setting) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/account/setting/${key}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(setting),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}