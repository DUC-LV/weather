import React from "react";
import Header from "../src/Components/Header/Header";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
import {useEffect,useState} from "react";
import Menu from "../src/Components/Menu/Menu";
import CurrentWeather from "./CurrentWeather";

const Home = () => {
     useEffect(() => {
          getCurrentWeather(city)
               .then(res => {
                    console.log(res.data)
                    setLat(res.data.coord.lat)
                    setLon(res.data.coord.lon)
                    setCity(res.data.name)
               })
               if(lat !== undefined || lon !== undefined){
                    getHourlyWeather(lat,lon)
                        .then(err => {
                              console.log(err.data)
                         })
                     }
     },)
     const [city,setCity] = useState('');
     const onChangeForm = (cityName:string) => {
          console.log(cityName);
          setCity(cityName);
     }
     const [lat,setLat] = useState();
     const [lon,setLon] = useState();
     return(
          <div>
               <Header city = {city} onChangeForm = {onChangeForm} />
               <Menu lat = {lat} lon = {lon} city = {city} />
               {/* <span className="deg">°</span>C */}
               <CurrentWeather />
          </div>
     );
}
export default Home;


