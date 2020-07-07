import { post } from 'axios';
import BaseService from './base.service';

export default class AuthService extends BaseService {
  async signin(email, password) {
    const result = await post(`${this.BASE_URL}/auth/login`, {
      email,
      password,
    });
    const accessToken = result.data.token;
    const user = result.data.data.user;

    this.saveToken(accessToken);
    this.saveUser(user);
    return user;
  }

  async signup(name, email, password, passwordConfirm) {
    await post(`${this.BASE_URL}/auth/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    });
  }

  async logout() {
    await post(`${this.BASE_URL}/auth/logout`);
  }

  async signout() {
    this.removeToken();
    this.removeUser();
  }
}
