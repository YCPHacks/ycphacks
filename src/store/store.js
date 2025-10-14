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
    getUser: (state) => state.user
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
    async registerUser({ commit }, formData) {
        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                commit('setUser', new UserAdapter(data.data));
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message, errors: data.errors };
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return { success: false, message: 'An error occurred during registration. Please try again.' };
        }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        const data = response.data;
        commit('setUser', new UserAdapter(data.data));
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
  }
});
