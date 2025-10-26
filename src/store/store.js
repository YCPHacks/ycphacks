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
    activities: []
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getActivities: (state) => state.activities
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setActivities(state, activities) {
        state.activities = activities;
    },
    clearActivities(state) {
        state.activities = [];
    }
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
                document.cookie = `token=${data.data.token}; path=/;`;
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

    async getAllActivities({ commit }, eventId) {
        try{
            if (!eventId) return;
            const response = await axios.get(`http://localhost:3000/event/activity/${eventId}`);

            // Convert dates from UTC to local time (i.e., EST) and to a user-friendly format
            const activities = response.data.activities.map(activity => {
                activity.activityDate = (new Date(activity.activityDate)).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "America/New_York"
                });

                return activity;
            });

            commit("setActivities", activities);
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Error fetching activity" };
        }
    },

    logout({ commit }) {
        commit("clearUser");
        document.cookie = `token=; path=/;`;
    },
  }
});
