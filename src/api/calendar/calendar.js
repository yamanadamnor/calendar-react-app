import * as utils from '../utils/utils';

// getAllEventsInInterval takes a from Date object
// and a to Date object
export function getAllEventsInInterval(from, to) {
  const f = Math.floor(from / 1000);
  const t = Math.floor(to / 1000);
  const url = `http://localhost:8000/api/calendar/events_interval/${f}/${t}`

  return fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

// Returns the first 10 events by default
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
