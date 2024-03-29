import * as utils from '../utils/utils';

// Returns the first 10 tasks by default
export function getAllTasks() {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/tasks/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  }).then(res => res.json())
    .catch(error => console.error("Error:", error));
}

// task is an object
export function createTask(task) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/task/`, {
    method: "POST",
    body: JSON.stringify(task),
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}

// task is an object
export function updateTask(id, task) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/task/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}

export function deleteTask(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/api/calendar/task/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    },
  }).then(res => res.json())
    .catch(error => console.error("Error:", error))
}
