import Cookies from "js-cookie";

const axios = require("axios");

export async function fetchData(
  url,
  method = "GET",
  data = null,
  headers = {}
) {
  try {
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // throw error;
  }
}
export async function refreshAccessToken() {
  try {
    const refreshToken = Cookies.get("refreshToken");
    console.log(refreshToken);
    const response = await axios.post(
      "http://52.74.248.97/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data.accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
