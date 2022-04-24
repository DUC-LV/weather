import React from "react";
import { useRouter } from "next/router";


const HourlyWeather = () => {
    const router = useRouter()
    const {
        query:{lat,lon,city}
    } = router
    return (
        <div></div>
    );
}
export default HourlyWeather;;