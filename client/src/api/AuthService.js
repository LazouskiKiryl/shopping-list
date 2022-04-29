import { $host, $authHost } from './hosts';

class AuthService {
  static async check() {
    const response = await $authHost.get('/auth/check');
    return response.data;
  }

  static async registration(username, password) {
    const response = await $host.post('/auth/registration', { username, password });
    return response.data;
  }

  static async login(username, password) {
    const response = await $host.post('/auth/login', { username, password });
    return response.data;
  }
}

export default AuthService;
