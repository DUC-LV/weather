import React, { useCallback, useEffect, useState } from "react";
import Header from "../src/Components/Header/Header";
import Menu from "../src/Components/Menu/Menu";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
interface CurrentWeatherData {
    main?: {
        temp?: string;

    },
    weather?: [
        {
            description?:string;
        }
    ],
    dt?:number,
}

const DailyWeather = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CurrentWeatherData | undefined>();
    const [city,setCity] = useState('');

    useEffect(() => {
        setLoading(true);
        getCurrentWeather(city)
             .then(res => {
                  console.log(res.data)
                  setCity(res.data.name)
                  setData(res.data);
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(err => {
                             console.log(err.data)
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   },[])
   const onChangeForm = useCallback((cityName:string) => {
        console.log(cityName);
        setCity(cityName);
   }, []); 
    if (loading) return <div>Loading...</div>;
    return (
        <>
               <div className = "container">
            <div className = "container_name">
                <p className="city-name">Thời Tiết Ngày -- Tại --</p>
            </div>
            <div className="container-state">
                {data?.main?.temp && <p className="temp">{data.main.temp}°C</p>}
                {data?.weather?.[0].description && <p className="status">{data.weather[0].description}</p>}
                <p className="temp-day">Ngày --°C</p>
                <p className="temp-night">Đêm --°C</p>
            </div>
        </div>
        </>
    );

    
}
export default DailyWeather;