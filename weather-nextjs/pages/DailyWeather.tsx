import React, { useCallback, useEffect, useState } from "react";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
import { useRouter } from "next/router";
import DailyTime from "../src/Components/Container/Daily/DailyTime";
import { DEAFAULT_CITY } from "../src/Service/config";

const DailyWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [city,setCity] = useState('');
    const [dayData, setDayData] = useState<any[]>([]);
    useEffect(() => {
        if (router.query['city']) {
            setCity(String(router.query['city']));
        } else {
            setCity(DEAFAULT_CITY)
        }
    }, [router.query]);
    useEffect(() => {
        setLoading(true);
        getCurrentWeather(city)
             .then(res => {
                  console.log(res.data)
                  setCity(res.data.name)
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(res => {
                              setDayData(res.data.daily)
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   },[city])
    if (loading) return <div>Loading...</div>;
    return (
        <>
            <DailyTime 
                title="Thời tiết 7 ngày"
                dataDaily={dayData?.map((item:any) => {
                    return {
                        time:item?.dt,
                        temp_day:item?.temp?.day,
                        temp_night:item.temp.night,
                        iconUrl:item.weather[0].icon,
                        status:item.weather[0].main,
                        wind_speed:item.wind_speed,
                        humidity:item.humidity,
                        cloud:item.clouds,
                        uvi:item.uvi,
                        pressure:item.pressure,
                        sunrise:item.sunrise,
                        sunset:item.sunset,
                        moonrise:item.moonrise,
                        moonset:item.moonset,
                    }
                })}
            />
        </>
    );

    
}
export default DailyWeather;