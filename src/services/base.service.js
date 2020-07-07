import { config } from 'dotenv';
import axios from 'axios';

config();
export default class BaseService {
  BASE_URL = process.env.REACT_APP_BASE_URL;
  _token = null;

  constructor(routerStore) {
    this.routerStore = routerStore;
  }

  async get(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error));
  }

  async post(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  _handleHttpError(error) {
    const { statusCode } = error.response.data;

    const errMsg = error.response.data.error.message;
    console.log(errMsg);

    if (statusCode !== 401 && errMsg !== 'jwt malformed') {
      throw error;
    } else {
      return this._handleUnauthorized();
    }
  }

  _handleUnauthorized() {
    this.routerStore.push('/signin');
  }

  _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get token() {
    return this._token ? this._token : this.loadToken();
  }

  saveToken(token) {
    this._token = token;
    return localStorage.setItem('accessToken', token);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._token = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  saveUser(user) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
