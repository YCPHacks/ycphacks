import axios from "axios";
import store from "../store/store.js";

const API_URL = `${store.state.apiBaseUrl}`;

export default{
    async getSponsors(eventId){
        const res = await axios.get(`${API_URL}/api/eventsponsors/by-event/${eventId}`);
        return res.data;
    },

    async getSponsorTiers(){
      const res = await axios.get(`${API_URL}/api/eventsponsors/tiers`);
      return res.data;
    }
}
