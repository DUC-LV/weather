import axios from "axios";
const DEAFAULT_CITY = "VietNam";

const getCurrentWeather = (city:string) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city || DEAFAULT_CITY}&appid=ef87e8c06e141f05d321688a370b1e8c&lang=vi`)
}
export default getCurrentWeather;