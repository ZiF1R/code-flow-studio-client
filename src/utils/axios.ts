import axios from "axios";
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_HTTP + '/api/',
  responseType: 'json',
  transformRequest: [function (data, headers) {
    if (headers['Authorization']) {
      return data;
    }

    let accessToken = Cookies.get('accessToken');
    headers['Authorization'] = accessToken && accessToken.length > 0 && accessToken !== 'undefined' ? 'Bearer ' + accessToken : '';
    return data;
  }, ...axios.defaults.transformRequest],
});
