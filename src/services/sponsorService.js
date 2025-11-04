import axios from "axios";

const API_URL = "http://localhost:3000";

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
