import React from "react";
import { useRouter } from "next/router";

const DailyWeather = () => {
    const router = useRouter()
    const {
        query:{lat,lon}
    } = router
    return (
        <div></div>
    );
}
export default DailyWeather;;