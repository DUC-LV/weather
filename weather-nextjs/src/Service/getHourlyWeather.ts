import axios from "axios";

const getHourlyWeather = (lat:any,lon:any) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,alerts}&appid=233b49fa1f8430020d576988f454b62c`)
}
export default getHourlyWeather;