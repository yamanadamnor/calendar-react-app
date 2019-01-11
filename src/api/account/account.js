import * as utils from 'api/utils/utils';

export function createAccount(account) {
  fetch("http://localhost:8000/auth/register/", {
    method: "POST",
    // mode: "cors",
    body: JSON.stringify(account),
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}

export function loginAccount(account) {
  fetch("http://localhost:8000/auth/login/", {
    method: "POST",
    // mode: "cors",
    body: JSON.stringify(account),
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}

export async function validateLoggedIn() {
  const response = await fetch("http://localhost:8000/api/account/validate/", {
    method: "GET",
    // mode: "cors",
    // credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  });

  const data = await response.json();

  return (("error" in data) ? false : true);
}
