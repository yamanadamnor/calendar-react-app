export function createAccount(account) {
  fetch("http://localhost:8000/auth/register/", {
    method: "POST",
    body: JSON.stringify(account),
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)))
    .catch(error => console.error("Error:", error));
}
