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
        document.cookie = `token=${data.data.token}; path=/;`;
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
      }
    },
    async validateWithToken({ commit }) {
        try {
            const token = {
                token: document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
            }

            if (!token) return { success: false, message: "No token found"};

            const response = await axios.post("http://localhost:3000/user/auth", {token}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.data;
            const user = new UserAdapter(data.data);
            commit("setUser", user);

            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Authentication failed" };
        }
    },

    logout({ commit }) {
        commit("clearUser");
        document.cookie = `token=; path=/;`;
    },
  }
});
