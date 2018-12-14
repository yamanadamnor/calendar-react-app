export function createAccount(account) {
  fetch("http://51.15.110.202/auth/register/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    credentials: 'include',
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}

export function loginAccount(account) {
  fetch("http://localhost:8000/auth/login/", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(account),
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}
