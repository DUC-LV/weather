import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Current from "../src/Components/Container/Current/Current";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";

const CurrentWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [dataCurrent, setDataCurrent] = useState({});
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
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   }, [city])
    if (loading) return <div>Loading...</div>;
    return (
        <>
            <Current
            dataCurrent={dataCurrent}
            />
        </>
    );
}
export default CurrentWeather;