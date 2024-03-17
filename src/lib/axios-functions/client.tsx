import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.DOMAIN + "/api";

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
//@ts-ignore
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      //@ts-ignore
      Cookie: `token=${config.cookie}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    // console.log(err);

    throw err.response?.data;
  }
);

export default axiosClient;
