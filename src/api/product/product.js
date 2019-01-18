import * as utils from '../utils/utils';

export async function getAll() {
  const response = await fetch("http://localhost:8000/api/products/", {
    method: "GET",
    // mode: "cors",
    // credentials: 'include',
    headers: {
      'X-CSRF-Token': utils.getCookie("X-CSRF-Token"),
    }
  });

  return await response.json();
}
