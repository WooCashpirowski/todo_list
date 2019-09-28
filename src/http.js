/**
 * EasyHTTP Library
 * Library for making HTTP Requests
 *
 * @version 3.0.0
 * @author Woo Cashpirowski
 * @licence ISC
 *
 **/

///////////////////////// ==== Async Await ==== ///////////////////////

class EasyHTTP {
  // HTTP GET Request

  async get(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  // HTTP POST Request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  }

  // HTTP PUT Request
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  }

  // HTTP DELETE Request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    });
    const responseData = await "Resource deleted";
    return responseData;
  }
}

export const http = new EasyHTTP();
