import axios from "axios";
import Cookies from 'js-cookie';
import {useAuthStore} from "@/stores/auth.store";
import {refreshCurrentToken} from "@/utils/services/auth.service";

const isValidToken = (token) => {
  return !(token === undefined || token === 'undefined' || token === null || token === 'null');
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_HTTP + '/api/',
  responseType: 'json',
  transformRequest: [function (data, headers) {
    if (headers['Authorization']) {
      return data;
    }

    let accessToken = Cookies.get('accessToken');
    headers['Authorization'] = '';
    if (isValidToken(accessToken)) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return data;
  }, ...axios.defaults.transformRequest],
});

instance.interceptors.response.use(res => {
  return res;
}, async (error) => {
  const auth = useAuthStore();
  let accessToken = Cookies.get('accessToken');
  const user = auth.currentUser ? auth.currentUser : JSON.parse(localStorage.getItem('user'));

  if (error.response.status === 401) {
    if (isValidToken(user) && isValidToken(accessToken)) {
      const newToken = await refreshCurrentToken(accessToken, user?.id, user?.email);

      if (newToken) {
        Cookies.set('accessToken', newToken);
        window.location.reload();
      }
    } else {
      Cookies.remove('accessToken');
      window.location = '/';
    }
  }
});

export default instance;
