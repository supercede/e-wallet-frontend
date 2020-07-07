import { observable, action } from 'mobx';

export default class UserStore {
  @observable user = null;

  constructor(authService) {
    this.authService = authService;
  }

  @action
  async signin(email, password) {
    this.user = await this.authService.signin(email, password);
  }

  @action
  async signup(name, email, password, passwordConfirm) {
    return this.authService.signup(name, email, password, passwordConfirm);
  }

  @action
  async logout() {
    this.authService.logout();
  }

  @action
  signout() {
    this.user = null;
    this.authService.removeToken();
    this.authService.removeUser();
    this.logout();
  }
}
