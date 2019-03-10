import * as utils from '../utils/utils';

export function getAllEvents() {
  return fetch("http://localhost:8000/api/calendar/events/", {
    method: "GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}
