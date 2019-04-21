import * as utils from '../utils/utils';

// getAllEventsInInterval takes a from Date object
// and a to Date object
export function getAllEventsInInterval(from, to) {
  const f = Math.floor(from / 1000);
  const t = Math.floor(to / 1000);
  const url = `${process.env.REACT_APP_API_URL}/api/calendar/events_interval/${f}/${t}`

  return fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

// Returns the first 10 events by default
export function getAllEvents() {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/events/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

export function getAllEventsByTaskId(taskId) {
  const url = `${process.env.REACT_APP_API_URL}/api/calendar/events/task_id/${taskId}`

  return fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

// event is an object
export function createEvent(event) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/event/`, {
    method: "POST",
    body: JSON.stringify(event),
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}

// event is an object
export function updateEvent(id, event) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/event/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}

export function deleteEvent(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/event/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}
