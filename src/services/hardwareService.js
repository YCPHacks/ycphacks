import axios from "axios";

const API_URL = "http://localhost:3000";

export default {
    async getHardware(){
        const res = await axios.get(`${API_URL}/hardware/`);
        return res.data;
    },

    async getHardwareAvailability(){
        const res = await axios.get(`${API_URL}/hardwareAvailability/`);
        return res.data;
    }
}