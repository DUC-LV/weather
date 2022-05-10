import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
import Current from "../src/Components/Container/Current/Current";
import CurrentTime from "../src/Components/Container/Current/CurrentTime";
import { DEAFAULT_CITY } from "../src/Service/config";
const CurrentWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [current, setCurrent] = useState<any>([]);
    const [hourly, setHourly] = useState<any[]>([]);
    const [daily, setDaily] = useState<any[]>([]);
    useEffect(() => {
        if (router.query['city']) {
            setCity(String(router.query['city']));
        } else {
            setCity(DEAFAULT_CITY)
        }
    }, [router.query]);

    useEffect(() => {
        setLoading(true);
        if (!city) return;
        getCurrentWeather(city)
             .then(res => {
                 console.log(res.data)
                 setCurrent(res.data);
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(res => {
                           console.log(res.data)
                           setHourly(res.data.hourly.slice(0,5))
                           setDaily(res.data.daily.slice(0,5))
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   }, [city])
    if (loading) return <div>Loading...</div>;
    return (
        <>
            <Current
                dataCurrent = {[
                    {
                        time:current.dt,
                        name:current.name,
                        temp:current.main?.temp,
                        status:current.weather?.[0].main,
                        temp_day:current.main?.temp_max,
                        temp_night:current.main?.temp_min,
                        iconUrl:current.weather?.[0].icon,
                        humidity:current.main?.humidity, // độ ẩm
                        pressure:current.main?.pressure, // áp suất
                        wind_speed:current.wind?.speed, // tốc độ gió
                        visibility:current.visibility, // tầm nhìn
                        sunrise:current.sys?.sunrise, 
                        sunset:current.sys?.sunset
                    }
                ]}
            />
            <CurrentTime
                title="Thời tiết hằng giờ"
                dataHourly={hourly?.map((item: any) => {
                    return { 
                        temp: item.temp,
                        time: item.dt, 
                        status: item.weather[0].main,
                        iconUrl: item.weather?.[0].icon
                     }
                })}
                seeMore = {
                    {
                        title:"48 giờ tiếp",
                        link:"/HourlyWeather"
                    }
                } 
            />
            <CurrentTime
                title="Thời tiết hằng ngày"
                dataHourly={daily?.map((item: any) => {
                    return {
                        temp: item.temp.day,
                        time: item.dt, 
                        status: item.weather[0].main,
                        iconUrl: item.weather?.[0].icon
                    }
                })}
                seeMore = {
                    {
                        title:"7 ngày tiếp",
                        link:"/DailyWeather"
                    }
                } 
            />
        </>
    );
}
export default CurrentWeather;
