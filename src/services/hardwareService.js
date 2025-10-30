import axios from "axios";

const API_URL = "http://localhost:3000/hardware";

export default {
    async getHardware(){
        const res = await axios.get(`${API_URL}/`);
        return res.data;
    },
}