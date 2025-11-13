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
    activities: [],
    event: {},
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getActivities: (state) => state.activities,
    getEvent: (state) => state.event
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
    },
    setEvent(state, event) {
        state.events = event;
    },
    clearEvent(state) {
        state.event = null;
    },
  },
  actions: {
    async registerUser({ commit, state }, formData) {
        try {
            const response = await fetch(`${state.apiBaseUrl}/user/register`, {
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
    async loginUser({ commit,state }, { email, password }) {
      try {
        const response = await axios.post(`${state.apiBaseUrl}/user/login`, { email, password });
        const data = response.data;
        commit('setUser', new UserAdapter(data.data));
        document.cookie = `token=${data.data.token}; path=/;`;
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
      }
    },
    async validateWithToken({ commit, state }) {
        try {
            const token = {
                token: document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
            }

            if (!token) return { success: false, message: "No token found"};

            const response = await axios.post(`${state.apiBaseUrl}/user/register/user/auth`, {token}, {
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

    async getAllActivities({ commit,state }, eventId) {
        try{
            if (!eventId) return;
            const response = await axios.get(`${state.apiBaseUrl}/user/register/event/activity/${eventId}`);

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

      async getActiveEvent({ commit, state }) {
          try {
              const response = await axios.get(`${state.apiBaseUrl}/user/register/event/active`);

              // Convert dates from UTC to local time (i.e., EST) and to a user-friendly format
              const event = response.data
              event.startDate = formatDateToEST(event.startDate);
              event.endDate = formatDateToEST(event.endDate);

              commit("setEvent", event);
              return {success: true, message: response.data.message};
          } catch (error) {
              return {success: false, message: error.response?.data?.message || "Error fetching active event"};
          }
      },
    logout({ commit }) {
        commit("clearUser");
        document.cookie = `token=; path=/;`;
    },
  }
});
