import { createStore } from 'vuex';
import axios from 'axios';

// Optional: a small adapter for user objects
class UserAdapter {
  constructor({ id, email, firstName, lastName, token, role }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
    this.role = role;
  }
}

export default createStore({
  state: {
    user: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        const data = response.data;
        commit('setUser', data.data);
        localStorage.setItem('token', data.data.token);
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
      }
    },
    async validateWithToken({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.post('http://localhost:3000/user/auth', { token });
        commit('setUser', response.data.data);
      } catch (err) {
        console.error('Token validation failed:', err.message);
      }
    },

    logout({ commit }) {
      commit('clearUser');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
});
