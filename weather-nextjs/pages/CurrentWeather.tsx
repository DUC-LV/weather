import { LinkProps } from "next-routes";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Current from "../src/Components/Container/Current/Current";
import CurrentTime from "../src/Components/Container/Current/CurrentTime";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
interface dataHourlys {
            time: string;
            tempMax?: string;
            tempMin?: string;
            temp?: string;
            iconUrl?: string;
            status?: string;
}
const CurrentWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [dataCurrent, setDataCurrent] = useState({});
    const [dataHourly, setDataHourly] = useState<dataHourlys[]>([]);
    const [dataDaily, setDataDaily] = useState<dataHourlys[]>([]);
    useEffect(() => {
        if (router.query['city']) {
            setCity(String(router.query['city']));
        } else {
            setCity('Vietnam') // TODO: get default city from config
        }
    }, [router.query]);

    useEffect(() => {
        setLoading(true);
        if (!city) return;
        getCurrentWeather(city)
             .then(res => {
                 console.log(res.data)
                 setDataCurrent(res.data);
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(res => {
                           console.log(res.data)
                           setDataHourly(res.data.hourly.slice(0,5))
                           setDataDaily(res.data.daily.slice(0,5))
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   }, [city])
    if (loading) return <div>Loading...</div>;
    return (
        <>
            <Current
            // dataCurrent={dataCurrent}
            />
            <br></br>
            <br></br>
            <CurrentTime
                title="Thời tiết hằng giờ"
                dataTime={dataHourly?.map((item:dataHourlys) => {
                    let  {time,temp,tempMax,iconUrl,status,tempMin} = item;
                    return {time,temp,tempMax,iconUrl,status,tempMin}
                })}
                seeMore = {
                    {
                        title:"48 giờ tiếp",
                        link:"/HourlyWeather"
                    }
                }  
            />
            <br></br>
            <br></br>
            <CurrentTime
                title="Thời tiết hằng ngày"
                dataTime={dataDaily?.map((item:dataHourlys) => {
                    let  {time,temp,tempMax,iconUrl,status,tempMin} = item;
                    return {time,temp,tempMax,iconUrl,status,tempMin}
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
