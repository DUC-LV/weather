import axios from "axios";

const getHourlyWeather = (lat:any,lon:any) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,alerts}&appid=ef87e8c06e141f05d321688a370b1e8c&lang=vi`)
}
export default getHourlyWeather;