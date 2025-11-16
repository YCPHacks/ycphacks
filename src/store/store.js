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
    getActivities: (state) => state.activities,
    getEvent: (state) => state.event,
    getUserTeamId: (state) => state.userTeamId
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.userTeamId = null;
    },
    setActivities(state, activities) {
        state.activities = activities;
    },
    clearActivities(state) {
        state.activities = [];
    },
    setEvent(state, event) {
        state.event = event;
    },
    clearEvent(state) {
        state.event = null;
    },
    setUserTeamId(state, teamId){
      state.userTeamId = teamId;
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
    async loginUser({ commit, state, dispatch }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        const data = response.data;
        commit('setUser', new UserAdapter(data.data));
        document.cookie = `token=${data.data.token}; path=/;`;

        // await dispatch('getActiveEvent');
        await dispatch('fetchUserTeamStatus');
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
      }
    },
    async validateWithToken({ commit, state, dispatch }) {
        try {
          const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        
          // 2. Check for the cookie row first.
          if (!tokenCookie) return { success: false, message: "No token found" };
          
          const tokenString = tokenCookie.split('=')[1]; // ✅ This is the raw string now.

          // 3. Check if the string is empty/malformed.
          if (!tokenString) return { success: false, message: "No token string found" };
          
          // 4. Send the token string directly in the request body object.
          const response = await axios.post(`${state.apiBaseUrl}/user/auth`, { token: tokenString }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

            const data = await response.data;
            const user = new UserAdapter(data.data);
            commit("setUser", user);

            // await dispatch('getActiveEvent');
            await dispatch('fetchUserTeamStatus');

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

    async fetchUserTeamStatus({ commit, state, getters }){
      if(!getters.isLoggedIn || !getters.getUser){
        commit('setUserTeamId', null);
        return;
      }

      const userId = getters.getUser.id;
      const eventId = 1;  //getters.getEvent.id ||

      try{
        const response = await axios.get(`${state.apiBaseUrl}/teams/${userId}/team`, {
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
