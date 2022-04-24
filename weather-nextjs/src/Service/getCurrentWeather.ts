import axios from "axios";
const DEAFAULT_CITY = "VietNam";

const getCurrentWeather = (city:string) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city || DEAFAULT_CITY}&appid=233b49fa1f8430020d576988f454b62c`)
}
export default getCurrentWeather;