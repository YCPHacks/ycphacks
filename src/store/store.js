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
    async registerUser({ commit, state, dispatch }, formData) {
        const eventResult = await dispatch('getActiveEvent');

        const eventId = eventResult.event?.id;

        if(!eventId){
          console.error("Critical: Could not determine active event ID for registration.");
          return { success: false, message: 'Registration failed: No active event found.' };
        }
        try {
          const finalFormData = { ...formData, eventId: eventId };
            const response = await fetch(`${state.apiBaseUrl}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalFormData)
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
    async createParticipantEntry({ state }, { userId, eventId }) {
      // This assumes you have a new backend endpoint: POST /participant/create
      const response = await fetch(`${state.apiBaseUrl}/participant/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventId })
      });
      
      // Handle response and errors here (e.g., logging)
      if (!response.ok) {
        console.error("Failed to create EventParticipant entry.");
      }
      return response.ok;
    },
    async loginUser({ commit, state, dispatch }, { email, password }) {
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

    async getAllActivities({ commit,state }, eventId) {
        try{
            if (!eventId) return;
            const response = await axios.get(`${state.apiBaseUrl}/event/activity/${eventId}`);

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
              const response = await axios.get(`http://localhost:3000/event/active`);

              // Convert dates from UTC to local time (i.e., EST) and to a user-friendly format
              const event = response.data.event
              event.startDate = new Date(formatDateToEST(event.startDate));
              event.endDate = new Date (formatDateToEST(event.endDate));

              commit("setEvent", event);
              return {success: true, message: response.data.message, event: event};
          } catch (error) {
              return {success: false, message: error.response?.data?.message || "Error fetching active event"};
          }
      },

    async fetchUserTeamStatus({ commit, state, getters }){
      if(!getters.isLoggedIn || !getters.getUser){
        commit('setUserTeamId', null);
        return;
      }

      const userId = getters.getUser.id;
      const eventId = 1;  //getters.getEvent.id ||

      try{
        const response = await axios.get(`http://localhost:3000/teams/${userId}/team`, {
          params: { eventId }
        });

        const teamId = response.data.teamId || null;

        commit('setUserTeamId', teamId);
        return { success: true }
      }catch(err){
        console.error("Error fetching user team status: ", err);
        commit('setUserTeamId', null)
        return { success: false, message: "Failed to fetch team status" };
      }
    },

    logout({ commit }) {
        commit("clearUser");
        document.cookie = `token=; path=/;`;
    },
  }
});
