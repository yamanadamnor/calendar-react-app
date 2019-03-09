import * as utils from '../utils/utils';

export function createAccount(account) {
  return fetch("https://51.15.110.202.xip.io/auth/register/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => { return response })
    .catch(error => console.error("Error:", error));
}

export function loginAccount(account) {
  fetch("https://51.15.110.202.xip.io/auth/login/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}

export async function validateLoggedIn() {
  const response = await fetch("https://51.15.110.202.xip.io/api/account/validate/", {
    method: "GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  });

  const data = await response.json();

  return (("error" in data) ? false : true);
}
