import * as utils from '../utils/utils';

export async function getAll() {
  const response = await fetch("https://51.15.110.202.xip.io/api/calendar/events/", {
    method: "GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  });

  return await response.json();
}
